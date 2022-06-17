import { baseUrl } from "./baseUrl";

const checkResponse = (res: any) => {
  return res.json();
};

const checkResGET = (res: any) => {
  return res.json();
};

export const request = async (addUrl: string) => {
    const url = `${baseUrl}${addUrl}`;
    return await fetch(url).then(checkResponse);
  },
  post = async (addUrl: string, body: any) => {
    const url = `${baseUrl}${addUrl}`;

    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify(body),
    }).then(checkResponse);
  },
  get = async (addUrl: string) => {
    const url = `${baseUrl}${addUrl}`;
    const accessToken: any = localStorage.getItem("accessToken");
    return await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    }).then(checkResGET);
  },
  patch = async (addUrl: string, body: any) => {
    const url = `${baseUrl}${addUrl}`;
    const accessToken: any = localStorage.getItem("accessToken");

    return await fetch(url, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(body),
    }).then(checkResponse);
  };
