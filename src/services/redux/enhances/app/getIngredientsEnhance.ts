import { v4 as uuidv4 } from 'uuid';
//URL
import { BASE_URL } from '../../../Api';

// Redux
import { Dispatch } from 'redux';
import { 
  ingredientsRequest,
  ingredientsRequestSuccess,
  ingredientsRequestFailed
} from '../../slicers/appSlice';

// Types
import { IIngredientType } from '../../../types/';

// Helpers
import checkApiResponse from '../../../utils/checkApiResponse';
import handleApiErrors from '../../../utils/handleApiErrors';




const apiUrl : string = BASE_URL + "/ingredients"!;

export const getIngredientsEnhance = () => {
  return ( dispatch: Dispatch ) => {

    dispatch(ingredientsRequest());

    fetch( apiUrl )
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IIngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            result.data = result.data.map( (ingredient: IIngredientType) => {return {...ingredient, uuid: uuidv4()} });
            
            dispatch(ingredientsRequestSuccess(result.data));
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(ingredientsRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(ingredientsRequestFailed());
      })
  }
}