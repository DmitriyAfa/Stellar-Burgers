// API
import { BASE_URL } from '../../../Api';
// Redux
import { Dispatch } from 'redux';
import { 
  loginRequest,
  loginRequestSuccess,
  loginRequestFailed
} from '../../slicers/userSlice';

import { refreshTokens } from './utils/refreshTokens';

// Helpers
import checkApiResponse from '../../../utils/checkApiResponse';
import handleApiErrors from '../../../utils/handleApiErrors';
  
import { setLocalStorageWithExpiry, getLocalStorageWithExpiry } from '../../../utils/helpers/workWithLocalStorage';



const apiUrl : string = BASE_URL + "/auth/user"!;

export const reLoginEnhance = () => {
  return async ( dispatch : Dispatch ) => {
    
    let refreshToken = getLocalStorageWithExpiry('refreshToken'),
        accessToken = getLocalStorageWithExpiry('accessToken');

    
    if(!refreshToken) return false;


    if(!accessToken){
      const data = await refreshTokens( refreshToken );

      if(!data.success) return false;
      
      refreshToken = data.refreshToken;
      accessToken = data.accessToken;
    }


    dispatch(loginRequest());

    fetch( apiUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(response => {
        checkApiResponse(response)
          .then( (result : {
            "success": boolean,
            "user": {
              "email": string,
              "name": string
            }
          }) => {
            if(!result.success) return Promise.reject(result);
            
            dispatch(
              loginRequestSuccess({
                accessToken: accessToken,
                refreshToken: refreshToken,
                email: result.user.email,
                name: result.user.name,
              })
            );
                 
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(loginRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(loginRequestFailed());
      })
  }
}