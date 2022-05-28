import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const resetPassword = (bodyPOST) => {
  return function (dispatch) {
    fetch(`${baseUrl}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: bodyPOST,
      }),
    })
      .then(checkResponse)
      .then((data) =>
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data,
        })
      )
      .catch((e) => console.log(e));
  };
};
