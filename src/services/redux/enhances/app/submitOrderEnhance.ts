//URL
import { BASE_URL } from '../../../Api';
// Redux
import { Dispatch } from 'redux';
import { 
  orderRequest,
  orderRequestSuccess,
  orderRequestFailed,
  ingredientsReset
} from '../../slicers/appSlice';

// Helpers
import checkApiResponse from '../../../utils/checkApiResponse';
import handleApiErrors from '../../../utils/handleApiErrors';




const apiUrl : string = BASE_URL + "/orders"!;

export const submitOrderEnhance = ( objForServer : {ingredients : string[]} ) => {
  return ( dispatch : Dispatch ) => {
    return new Promise ((resolve) => {
      dispatch(orderRequest());

      fetch( apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objForServer)
      })
        .then(response => {
          checkApiResponse(response)
            .then( (result : {success: boolean, name?: string, order?: {number: number} }) => {
              if(!result.success || !result.order || !result.name) return Promise.reject(result);

              dispatch(orderRequestSuccess({orderId: result.order.number, name: result.name}));
              dispatch(ingredientsReset()); 

              resolve(result)
            })
            .catch( (error: Error) => {
              handleApiErrors(error);

              dispatch(orderRequestFailed());
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);

          dispatch(orderRequestFailed());
        })
    })
  }
}