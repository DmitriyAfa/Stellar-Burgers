import { request } from "../api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_INGREDIENT = "GET_INGREDIENT";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";

export const IngredientsActionCreator = {
  getIngredientsRequest: () => (dispatch) => {
    request("ingredients")
      .then((data) => {
        if (data.success) {
          dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: data.data });
          dispatch({ type: GET_INGREDIENTS_REQUEST });
          return true;
        }
        dispatch({ type: GET_INGREDIENTS_FAILED });
        return false;
      })
      .catch((e) => console.log(e));
  },
};
