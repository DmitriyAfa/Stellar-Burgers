import { baseUrl } from "./baseUrl";
import { checkResponse } from "./checkResponse";


export const request = async (addUrl: string) => {
    const url = `${baseUrl}${addUrl}`;
    return await fetch(url).then(checkResponse);
  },
  post = async (addUrl: string, body: any) => {
    const url = `${baseUrl}${addUrl}`;

    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json',
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
        Accept: 'application/json', 
      'Content-Type': 'application/json',
        authorization: accessToken,
      },
    }).then(checkResponse);
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
