import { BASE_URL_PRESTD } from '../../../../../utils/network-data';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params, locals }) => {
	const token = cookies.get('session');
	const user = locals.user.id;
	const id_risalah_header = params.id;

	const fetchWithToken = async (url, options = {}) => {
		return fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`
			}
		});
	};

	const fetchMeetingDetail = async (id_risalah_header) => {
		try {
			const response = await fetchWithToken(
				`${BASE_URL_PRESTD}/_QUERIES/risalah/get_meeting?id_user=${user}&id_risalah_header=${id_risalah_header}`
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
		meetingDetail: fetchMeetingDetail(id_risalah_header)
	};
};
