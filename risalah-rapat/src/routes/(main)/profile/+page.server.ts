import { BASE_URL_PRESTD } from '../../../utils/network-data.js';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

const passwordSchema = z
	.object({
		oldPassword: z
			.string()
			.refine((data) => data.trim() !== '', { message: 'Password lama wajib diisi' }),
		newPassword: z
			.string()
			.refine((data) => data.trim() !== '', { message: 'Password baru wajib diisi' }),
		confirmNewPassword: z
			.string()
			.refine((data) => data.trim() !== '', { message: 'Konfirmasi password baru wajib diisi' })
	})
	.superRefine(({ confirmNewPassword, oldPassword, newPassword }, ctx) => {
		if (confirmNewPassword !== newPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password baru dan konfirmasi password baru harus sesuai',
				path: ['newPassword']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password baru dan konfirmasi password baru harus sesuai',
				path: ['confirmNewPassword']
			});
		}
	});

const handleApiError = (response) => {
	if (response.ok) {
		return response.json();
	} else {
		console.error('Failed to fetch data from the API', response.status, response.statusText);
		throw new Error(`Failed to fetch data from the API: ${response.status} ${response.statusText}`);
	}
};

export const actions: Actions = {
	updatePassword: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { oldPassword, newPassword, confirmNewPassword } = passwordSchema.parse(formData);

			// const id_user = formData.get('id_user');
			const token = cookies.get('token');
			const user = cookies.get('id_user');

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
				`${BASE_URL_PRESTD}/_QUERIES/users/patch_password?id=${user}&old_password=${oldPassword}&new_password=${newPassword}&modified_by=${user}`,
				{
					method: 'PATCH'
				}
			);
			const responseJson = await handleApiError(response);
			console.log(responseJson);
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			const { oldPassword, newPassword, confirmNewPassword, ...rest } = formData;
			return {
				data: rest,
				errors
			};
			// console.error('Error parsing or fetching data:', err);
			// return { errors: { status: err.status, message: err.message } };
		}
	}
};
