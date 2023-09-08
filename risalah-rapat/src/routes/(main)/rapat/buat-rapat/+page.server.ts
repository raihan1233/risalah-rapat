import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { profileFormSchema } from './form-rapat.svelte';
export const load: PageServerLoad = () => {
	return {
		form: superValidate(profileFormSchema)
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, profileFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
