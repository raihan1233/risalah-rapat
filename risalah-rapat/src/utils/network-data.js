const BASE_URL = 'http://127.0.0.1:3000';

function getAccessToken() {
  return localStorage.getItem('token');
}

function putAccessToken(token) {
  localStorage.setItem('token', token);
}

function removeAccessToken() {
  localStorage.removeItem('token');
}

function getUserId() {
  return localStorage.getItem('id_user');
}

function putUserId(id_user) {
  localStorage.setItem('id_user', id_user);
}

function removeUserId() {
  localStorage.removeItem('id_user');
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

// const headers = new Headers({
//   'Authorization': `Bearer ${getAccessToken()}`, // Add JWT token
//   'Access-Control-Request-Method': 'GET', // Set the HTTP method you're using
//   'Origin': origin, // Specify the origin (your frontend URL)
// });

// async function fetchWithToken(url, options = {}) {
//   return fetch(url, {
//     method: 'GET', // Default method is GET
//     headers: {
//       Authorization: `Bearer ${getAccessToken()}`, // Add JWT token
//       Origin: origin,
//       ...options.headers,
//     },
//     mode: 'cors', // Default mode is CORS
//     ...options, // Merge with provided options
//   },
//   );
// }

// async function fetchWithToken(url, {
//   method: 'OPTIONS',
//   headers: headers,
//   mode: 'cors', // Use CORS mode
// });

export {
  BASE_URL,
  putAccessToken,
  getAccessToken,
  removeAccessToken,
  fetchWithToken,
  getUserId,
  putUserId,
  removeUserId
};
