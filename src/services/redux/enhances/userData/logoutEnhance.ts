// API
import { BASE_URL } from '../../../Api';

// Redux
import { Dispatch } from 'redux';
import {
  logoutRequest,
  logoutRequestSuccess,
  logoutRequestFailed
} from '../../slicers/userSlice';


// Helpers
import checkApiResponse from '../../../utils/checkApiResponse';
import handleApiErrors from '../../../utils/handleApiErrors';

import { getLocalStorageWithExpiry, deleteLocalStorageWithExpiry } from '../../../utils/helpers/workWithLocalStorage';



const apiUrl: string = BASE_URL + "/auth/logout"!;

export const logoutEnhance = () => {
  return async (dispatch: Dispatch) => {
    let refreshToken = getLocalStorageWithExpiry('refreshToken');

    if (!refreshToken) return false;

    dispatch(logoutRequest());

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify({ token: refreshToken })
    })
      .then(response => {
        checkApiResponse(response)
          .then((result: {
            "success": boolean,
            "message": string,
          }) => {
            if (!result.success) return Promise.reject(result);

            dispatch(logoutRequestSuccess());


            deleteLocalStorageWithExpiry("refreshToken");
            deleteLocalStorageWithExpiry("accessToken");
          })
          .catch((error: Error) => {
            handleApiErrors(error);

            dispatch(logoutRequestFailed());
          })
      })
      .catch((error: Error) => {
        handleApiErrors(error);

        dispatch(logoutRequestFailed());
      })
  }
}