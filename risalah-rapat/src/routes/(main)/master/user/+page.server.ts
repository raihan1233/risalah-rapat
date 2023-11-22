import { BASE_URL_PRESTD } from '../../../../utils/network-data.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { z } from 'zod';

const userSchema = z
	.object({
		name: z.string().refine((data) => data.trim() !== '', { message: 'Nama wajib diisi' }),
		username: z.string().refine((data) => data.trim() !== '', { message: 'Username wajib diisi' }),
		jabatan: z.string().refine((data) => data.trim() !== '', { message: 'Jabatan wajib diisi' }),
		role: z.string({ required_error: 'Role wajib diisi' }),
		tipe: z.string({ required_error: 'Tipe wajib diisi' }),
		password: z.string().refine((data) => data.trim() !== '', { message: 'Password wajib diisi' }),
		confirmpassword: z
			.string()
			.refine((data) => data.trim() !== '', { message: 'Konfirmasi password wajib diisi' }),
		status: z.string({ required_error: 'Status wajib diisi' })
	})
	.superRefine(({ confirmpassword, password }, ctx) => {
		if (confirmpassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password dan konfirmasi password harus sesuai',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password dan konfirmasi password harus sesuai',
				path: ['confirmpassword']
			});
		}
	});

// .refine((data) => data.password === data.confirmpassword, {
// 	message: 'Password dan konfirmasi password harus sama',
// 	path: ['confirmpassword']
// });

const handleApiError = (response) => {
	if (response.ok) {
		return response.json();
	} else {
		console.error('Failed to fetch data from the API', response.status, response.statusText);
		throw new Error(`Failed to fetch data from the API: ${response.status} ${response.statusText}`);
	}
};

export const load: PageServerLoad = async ({ cookies, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

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

	const fetchUsers = async () => {
		try {
			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/users/get_users?_page=1&_page_size=100`
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
		users: fetchUsers()
	};
};

export const actions: Actions = {
	createUser: async ({ cookies, request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			const { name, username, jabatan, role, tipe, password, confirmpassword, status } =
				userSchema.parse(formData);

			const token = cookies.get('session');
			const user = locals.user.id;

			const fetchWithToken = async (url, options = {}) => {
				return fetch(url, {
					...options,
					headers: {
						...options.headers,
						Authorization: `Bearer ${token}`
					}
				});
			};

			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/users/add_user?name=${name}&username=${username}&password=${password}&jabatan=${jabatan}&role=${role}&tipe=${tipe}&status=${status}&created_by=${user}&modified_by=${user}`,
				{
					method: 'POST'
				}
			);

			const responseJson = await handleApiError(response);
			console.log(responseJson);
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			const { password, confirmpassword, ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}
	},
	updateUser: async ({ cookies, request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { name, username, jabatan, role, tipe, password, confirmpassword, status } =
				userSchema.parse(formData);
			const id = formData.get('id_user');
			const token = cookies.get('session');
			const user = locals.user.id;

			const fetchWithToken = async (url, options = {}) => {
				return fetch(url, {
					...options,
					headers: {
						...options.headers,
						Authorization: `Bearer ${token}`
					}
				});
			};

			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/users/patch_user?id=${id}&name=${name}&username=${username}&password=${password}&jabatan=${jabatan}&role=${role}&tipe=${tipe}&status=${status}&modified_by=${user}`,
				{
					method: 'PATCH'
				}
			);
			const responseJson = await handleApiError(response);
			console.log(responseJson);
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			const { password, confirmpassword, ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}
	}
};
