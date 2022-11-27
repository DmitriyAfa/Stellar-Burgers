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



const apiUrl : string = BASE_URL + "/auth/logout"!;

export const logoutEnhance = () => {
  return async ( dispatch : Dispatch ) => {
    let refreshToken = getLocalStorageWithExpiry('refreshToken');
    
    if(!refreshToken) return false;

    dispatch(logoutRequest());

    fetch( apiUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({token: refreshToken})
    })
      .then(response => {
        checkApiResponse(response)
          .then( (result : {
            "success": boolean,
            "message": string,
          }) => {
            if(!result.success) return Promise.reject(result);
              
            dispatch( logoutRequestSuccess() );
             

            deleteLocalStorageWithExpiry("refreshToken");
            deleteLocalStorageWithExpiry("accessToken");
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(logoutRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(logoutRequestFailed());
      })
  }
}