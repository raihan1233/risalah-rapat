import { BASE_URL_PRESTD } from '../../../../utils/network-data.js';

export async function load({ cookies }) {
  const token = cookies.get('token');

  const fetchWithToken = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/templates/get_templates?_page=1&_page_size=50`);
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
  }

  return {
    templates: fetchTemplates()
  }
}
