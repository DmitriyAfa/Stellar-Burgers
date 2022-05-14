import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";
export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const DELETE_INGREDIENT_ACTION = "DELETE_INGREDIENT_ACTION";
export const MAKE_BUN_QTY_ZERO = "MAKE_BUN_QTY_ZERO";

export const GET_ID = "GET_ID";
export const GET_BUN_ID = "GET_BUN_ID";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export const GET_PRICE = "GET_PRICE";

export const CLOSE_MODAL_OF_ORDER_DETAILS = "CLOSE_MODAL_OF_ORDER_DETAILS";
export const OPEN_MODAL_OF_ORDER_DETAILS = "OPEN_MODAL_OF_ORDER_DETAILS";

export const SORT_CARD = "SORT_CARD";
export const CLEAR_ORDER_DETAILS = "CLEAR_ORDER_DETAILS";

export const getOrderNumber = (bodyPOST) => {
  return function (dispatch) {
    fetch(`${baseUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: bodyPOST,
      }),
    })
      .then(checkResponse)
      .then((data) =>
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          number: data,
        })
      )
      .catch((e) => console.log(e));
  };
};
