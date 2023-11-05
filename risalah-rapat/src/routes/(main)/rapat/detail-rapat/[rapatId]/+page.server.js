import { fetchWithToken, BASE_URL_PRESTD } from '../../../../../utils/network-data';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { id_risalah_header } = params
  const data = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/risalah/get_meeting?id_risalah_header=${id_risalah_header}`).then(res => res.json());
  return data
}