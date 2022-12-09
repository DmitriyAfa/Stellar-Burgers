// API
import { BASE_URL } from '../../../Api';
// Redux
import { Dispatch } from 'redux';

import { 
  registerRequest,
  registerRequestSuccess,
  registerRequestFailed
} from '../../slicers/userSlice';

// Helpers
import checkApiResponse from '../../../utils/checkApiResponse';
import handleApiErrors from '../../../utils/handleApiErrors';

import { setLocalStorageWithExpiry } from '../../../utils/helpers/workWithLocalStorage';



const apiUrl : string = BASE_URL + "/auth/register"!;

export const registerEnhance = (formData: {name: string, email: string, password: string}) => {
  return ( dispatch : Dispatch ) => {
    return new Promise((resolve, reject) => {

      dispatch(registerRequest());

      fetch( apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify( formData )
      })
        .then(response => {
          checkApiResponse(response)
            .then( (result : {
              "success": boolean,
              "accessToken": string,
              "refreshToken": string,
              "user": {
                "email": string,
                "name": string
              }
            }) => {
              if(!result.success) return Promise.reject(result);
              
              const accessToken = result.accessToken.split("Bearer ")[1];

              
              setLocalStorageWithExpiry('refreshToken', result.refreshToken, (1440 * 7));
              setLocalStorageWithExpiry('accessToken', accessToken, 20);


              dispatch(
                registerRequestSuccess({ 
                  accessToken: accessToken,
                  refreshToken: result.refreshToken,
                  email: result.user.email,
                  name: result.user.name,
                })
              );
            })
            .catch( (error: Error) => {
              console.log("fafa ", error)
              handleApiErrors(error);

              dispatch(registerRequestFailed());
              reject( error );
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);

          dispatch(registerRequestFailed());
          console.log("fafa ", error)
          reject( error );
        })
    });
  }
}