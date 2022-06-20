import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";

export const authUser = async (token: string) => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then(checkResponse)
    .then((res) => res)
    .catch((e) => console.log(e));
};

export const refreshTokenFunc = async (refreshToken: string) => {
  return await fetch(`${baseUrl}auth/token`, {
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

export const updateAuthorization = async (email: string, name: string, token: string) => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify({
      email: email,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then(checkResponse)
    .then((res) => res)
    .catch((e) => console.log(e));
};

export const logout = async (refreshToken: string) => {
  return await fetch(`${baseUrl}auth/logout`, {
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
