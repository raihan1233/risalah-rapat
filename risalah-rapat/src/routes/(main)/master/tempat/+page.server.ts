import { BASE_URL_PRESTD } from '../../../../utils/network-data.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

const placeSchema = z.object({
	nama: z.string().refine((data) => data.trim() !== '', { message: 'Nama wajib diisi' }),
	status: z.string({ required_error: 'Status wajib diisi' })
});

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

	const fetchPlaces = async () => {
		try {
			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/places/get_places?_page=1&_page_size=150`
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
		places: fetchPlaces()
	};
};

export const actions: Actions = {
	createPlace: async ({ cookies, request, locals }) => {
		try {
			const data = Object.fromEntries(await request.formData());
			const { nama, status } = placeSchema.parse(data);
			// const formData = await request.formData();
			// console.log('FormData:', formData);

			// const data = Object.fromEntries(formData);
			// console.log('Data from FormData:', data);

			// const { nama, status } = placeSchema.parse(data);
			// console.log('Parsed Data:', { nama, status });

			const user = locals.user.id;
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

			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/places/add_place?nama=${nama}&status=${status}&created_by=${user}&modified_by=${user}`,
				{
					method: 'POST'
				}
			);

			const responseJson = await handleApiError(response);
			console.log(responseJson);

			return { success: true };
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			console.error('Error parsing or fetching data:', errors);
			return { errors };
		}
	},

	updatePlace: async ({ cookies, request, locals }) => {
		try {
			const data = await request.formData();
			const { nama, status } = placeSchema.parse(Object.fromEntries(data));
			const id_place = data.get('id_place');
			const user = locals.user.id;
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

			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/places/patch_place?id_place=${id_place}&nama=${nama}&status=${status}&modified_by=${user}`,
				{
					method: 'PATCH'
				}
			);

			const responseJson = await handleApiError(response);
			console.log(responseJson);
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			console.error('Error parsing or fetching data:', errors);
			return { errors };
		}
	}
};
