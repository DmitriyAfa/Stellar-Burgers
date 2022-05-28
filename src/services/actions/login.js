import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const GET_TOKENS = "GET_TOKENS";

export const loginRequest = async (form) => {
  return await fetch(`${baseUrl}auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  })
    .then(checkResponse)
    .then((data) => data)
    .catch((e) => console.log(e));
};

// export const getAuthRequest = (authToken) => {
//   fetch(`${baseUrl}auth/user`, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       // Отправляем токен и схему авторизации в заголовке при запросе данных
//       Authorization: authToken,
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   })
//     .then(checkResponse)
//     .then((data) => console.log(data))
//     .catch((e) => console.log(e));
// };

export const logout = (refreshToken) => {
  fetch(`${baseUrl}auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then(checkResponse)
    .then((data) => data)
    .catch((e) => console.log(e));
};

// export const loginRequest = (form) => {
//   return function (dispatch) {
//     fetch(`${baseUrl}auth/login`, {
//       method: "POST",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       redirect: "follow",
//       referrerPolicy: "no-referrer",
//       body: JSON.stringify({
//         email: form.email,
//         password: form.password,
//       }),
//     })
//       .then(checkResponse)
//       .then((data) => data)
//       .then((data) =>
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: data,
//         })
//       )
//       .catch((e) => console.log(e));
//   };
// };
