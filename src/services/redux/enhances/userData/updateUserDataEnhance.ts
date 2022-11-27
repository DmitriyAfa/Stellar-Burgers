// API
import { BASE_URL } from '../../../Api';
// Redux
import { Dispatch } from 'redux';
import { 
  changeUserDataRequest,
  changeUserDataRequestSuccess,
  changeUserDataRequestFailed
} from '../../slicers/userSlice';

import { reLoginEnhance } from './reLoginEnhance';
import { refreshTokens } from './utils/refreshTokens';

// Helpers
import checkApiResponse from '../../../utils/checkApiResponse';
import handleApiErrors from '../../../utils/handleApiErrors';

import { setLocalStorageWithExpiry, getLocalStorageWithExpiry } from '../../../utils/helpers/workWithLocalStorage';



const apiUrl : string = BASE_URL + "/auth/user"!;

export const updateUserDataEnhance = (formData: {name?: string, email?: string, password?: string}) => {
  return async ( dispatch : Dispatch ) => {

    let refreshToken = getLocalStorageWithExpiry('refreshToken'),
        accessToken = getLocalStorageWithExpiry('accessToken');


    if(!refreshToken) return;

    if(!accessToken) {
      const data = await refreshTokens( refreshToken );

      if(!data.success) return false;
      
      refreshToken = data.refreshToken; 
      accessToken = data.accessToken;
    }

    dispatch(changeUserDataRequest());

    fetch( apiUrl, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData)
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
              changeUserDataRequestSuccess({ 
                email: result.user.email,
                name: result.user.name,
              })
            );
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(changeUserDataRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(changeUserDataRequestFailed());
      })

  };
}