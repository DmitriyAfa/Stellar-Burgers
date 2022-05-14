import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_INGREDIENT = "GET_INGREDIENT";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";

export const getIngredients = () => {
  return function (dispatch) {
    fetch(`${baseUrl}ingredients`)
      .then(checkResponse)
      .then((data) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data.data,
        })
      )
      .catch((e) => console.log(e));
  };
};
