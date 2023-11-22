import { BASE_URL_PRESTD, BASE_URL_EXPRESS } from '../../../../utils/network-data.js';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_DOC_TYPES = [
	'application/msword',
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const templateSchema = z
	.object({
		attachmentTitle: z
			.string()
			.refine((data) => data.trim() !== '', { message: 'Nama wajib diisi' }),
		attachment: z.instanceof(File).refine((file) => file, 'File is required'),
		status: z.string({ required_error: 'Status wajib diisi' })
	})
	.superRefine(({ attachment }, ctx) => {
		if (!ACCEPTED_DOC_TYPES.includes(attachment.type)) {
			ctx.addIssue({
				code: 'custom',
				message: 'Only .doc, .dox, and .pdf files are accepted',
				path: ['attachment']
			});
			return false;
		}

		if (attachment.size > MAX_FILE_SIZE) {
			ctx.addIssue({
				code: 'custom',
				message: 'File must be less than 2MB',
				path: ['attachment']
			});
			return false;
		}

		return true;
	});

const handleApiError = (response) => {
	if (response.ok) {
		return response.json();
	} else {
		console.error('Failed to fetch data from the API', response.status, response.statusText);
		throw new Error(`Failed to fetch data from the API: ${response.status} ${response.statusText}`);
	}
};

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');

	const fetchWithToken = async (url, options = {}) => {
		return fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`
			}
		});
	};

	const fetchTemplates = async () => {
		try {
			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/templates/get_templates?_page=1&_page_size=50`
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				console.error('Failed to fetch data from the API', response.status, response.statusText);
				return {
					error: `Failed to fetch data from the API: ${response.status} ${response.statusText}`
				};
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			return {
				error: 'Error fetching data'
			};
		}
	};

	return {
		templates: fetchTemplates()
	};
};

export const actions: Actions = {
	createTemplate: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		try {
			const user = locals.user.id;
			const token = cookies.get('session');
			templateSchema.parse(Object.fromEntries(data));

			data.append('created_by', parseInt(user, 10));
			data.append('modified_by', parseInt(user, 10));

			const response = await fetch(`${BASE_URL_EXPRESS}/_QUERIES/templates/add_template`, {
				method: 'POST',
				body: data
			});

			const responseJson = await handleApiError(response);
			console.log(responseJson);
		} catch (err) {
			// console.error('Error parsing or fetching data:', err);

			// return { errors: { status: err.status, message: err.message } };
			const { fieldErrors: errors } = err.flatten();
			console.error('Error parsing or fetching data:', errors);
			return { errors };
			// const { fieldErrors: errors } = err.flatten();
			// const { attachment, ...rest } = data;
			// return {
			// 	data: rest,
			// 	errors
			// };
		}
	},

	updateTemplate: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		try {
			templateSchema.parse(Object.fromEntries(data));
			const id_template = data.get('id_template');
			const user = locals.user.id;

			data.append('modified_by', parseInt(user, 10));

			// const token = cookies.get('token');

			// const fetchWithToken = async (url, options = {}) => {
			// 	return fetch(url, {
			// 		...options,
			// 		headers: {
			// 			...options.headers,
			// 			Authorization: `Bearer ${token}`
			// 		}
			// 	});
			// };

			const response = await fetch(
				`${BASE_URL_EXPRESS}/_QUERIES/templates/patch_template/${id_template}`,
				{
					method: 'PATCH',
					body: data
				}
			);

			const responseJson = await handleApiError(response);
			console.log(responseJson);
		} catch (err) {
			console.error('Error parsing or fetching data:', err);

			return { errors: { status: err.status, message: err.message } };
			// const { fieldErrors: errors } = err.flatten();
			// console.error('Error parsing or fetching data:', errors);
			// return { errors };
		}
	}
};
