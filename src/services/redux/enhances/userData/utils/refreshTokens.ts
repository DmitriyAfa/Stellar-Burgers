// Helpers
import { BASE_URL } from "../../../../Api";
import { setLocalStorageWithExpiry } from "../../../../utils/helpers/workWithLocalStorage";

const apiUrl : string = BASE_URL + "/auth/token"!;

export async function refreshTokens( token : string ){
  const response = await fetch( apiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token})
  });

  const result = await response.json();
  console.log('result ', result)
  result.accessToken = result.accessToken.split("Bearer ")[1];

  setLocalStorageWithExpiry('refreshToken', result.refreshToken, (1440 * 7));
  setLocalStorageWithExpiry('accessToken', result.accessToken, 20);

  return result;
}