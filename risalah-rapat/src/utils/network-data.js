import { env } from '$env/dynamic/public';
import Cookies from 'js-cookie';

const BASE_URL_PRESTD = env.PUBLIC_BASE_URL_PRESTD;
const BASE_URL_EXPRESS = env.PUBLIC_BASE_URL_EXPRESS;

function getAccessToken() {
  return Cookies.get('token');
}

function putAccessToken(token) {
  Cookies.set('token', token, {
    path: '/',
    httpOnly: false,
    sameSite: 'strict',
    // secure: !dev,
    expires: 7, // one week in days
  });
}

function getUserId() {
  return Cookies.get('id_user');
}

function putUserId(id_user) {
  Cookies.set('id_user', id_user, {
    path: '/',
    httpOnly: false,
    sameSite: 'strict',
    // secure: !dev,
    expires: 7, // one week in days
  });
}

function removeDataFromCookies() {
  Cookies.remove('token', { path: '/' });
  Cookies.remove('id_user', { path: '/' });
}

// function getAccessToken() {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('token');
//   }
//   else {
//     return null;
//   }
// }

// function putAccessToken(token) {
//   localStorage.setItem('token', token);
// }

// function removeDataFromLocalStorage() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('id_user');
// }

// function getUserId() {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('id_user');
//   }
//   else {
//     return null;
//   }
// }

// function putUserId(id_user) {
//   localStorage.setItem('id_user', id_user);
// }

// let user = getUserId();

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function getPlaces() {
  try {
    const response = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/places/get_places?_page=1&_page_size=50`);
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

export {
  BASE_URL_PRESTD,
  BASE_URL_EXPRESS,
  putAccessToken,
  getAccessToken,
  fetchWithToken,
  getUserId,
  putUserId,
  removeDataFromCookies,
  // removeDataFromLocalStorage,
  // user,
  getPlaces
};
