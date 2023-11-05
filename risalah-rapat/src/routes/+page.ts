// import { BASE_URL_API_PRESTD, putAccessToken, putUserId } from '../utils/network-data';

// export async function loginUser(inputData) {
//     try {
//         const response = await fetch(`${BASE_URL_API_PRESTD}/auth`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(inputData)
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return { success: true, token: data.token, userId: data.user_info.id };
//         } else {
//             return { success: false };
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         return { success: false };
//     }
// }
