import { BASE_URL_PRESTD } from '../utils/network-data';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const authSchema = z.object({
	username: z.string().refine((data) => data.trim() !== '', { message: 'Username wajib diisi' }),
	password: z.string().refine((data) => data.trim() !== '', { message: 'Password wajib diisi' })
});

const handleApiError = (response) => {
	if (response.ok) {
		return response.json();
	}
	if (response.status === 401) {
		console.error('Invalid username or password');
		return { errors: { status: 401, incorrect: true } };
	} else {
		console.error('Failed to fetch data from the API', response.status, response.statusText);
		throw new Error(`Failed to fetch data from the API: ${response.status} ${response.statusText}`);
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/home');
	}
	console.log(locals.user);
};

export const actions: Actions = {
	auth: async ({ fetch, cookies, request }) => {
		try {
			const formData = await request.formData();
			const data = Object.fromEntries(formData);
			authSchema.parse(data);

			const response = await fetch(`${BASE_URL_PRESTD}/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const responseHandler = await handleApiError(response);

			const token = responseHandler.token;
			// const id_user = data.user_info.id;

			const username = formData.get('username');

			const addToken = await fetch(
				`${BASE_URL_PRESTD}/_QUERIES/users/patch_token?username=${username}&token=${token}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			cookies.set('session', token, {
				path: '/',
				httpOnly: false,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30
			});

			// throw redirect(302, '/home');
		} catch (err) {
			// if (err === 'Unauthorized') {
			// 	console.error('Invalid username or password');
			// 	return fail(400, { incorrect: true });
			// }

			const { fieldErrors: errors } = err.flatten();
			console.error('Error parsing or fetching data:', errors);
			return fail(400, {
				success: false,
				errors
			});
			// return { errors };

			// console.error('Error parsing or fetching data:', err);

			// return { errors: { status: err.status, message: err.message } };
		}
	}
};
