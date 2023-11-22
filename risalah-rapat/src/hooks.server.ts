import type { Handle } from '@sveltejs/kit';
import { BASE_URL_PRESTD, BASE_URL_EXPRESS } from './utils/network-data';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	let user;

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	async function fetchWithToken(url, options = {}) {
		return fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${session}`
			}
		});
	}

	// find the user based on the session
	// const user = await fetchWithToken(
	// 	`${BASE_URL_PRESTD}/_QUERIES/users/get_user_by_session?token=${session}`
	// );
	const response = await fetch(`${BASE_URL_EXPRESS}/_QUERIES/users/get_user_by_session/${session}`);
	if (response.ok) {
		user = await response.json();
	} else {
		console.error('Failed to fetch data from the API', response.status, response.statusText);
		throw new Error(`Failed to fetch data from the API: ${response.status} ${response.statusText}`);
	}

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			id: user.id,
			name: user.username,
			role: user.role
		};
	}

	// load page as normal
	return await resolve(event);
};
