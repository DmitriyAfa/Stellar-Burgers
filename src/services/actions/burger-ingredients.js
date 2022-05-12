import { baseUrl } from "../baseUrl";
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
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(`${baseUrl}ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data.data,
        })
      );
  };
};

// dispatch({
//   type: GET_INGREDIENTS_SUCCESS,
//   ingredients: res,
// });
