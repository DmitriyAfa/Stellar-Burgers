import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";

export const GET_NEW_PASSWORD_SUCCESS = "GET_NEW_PASSWORD_SUCCESS";

export const savePassword = (bodyPOST) => {
  return function (dispatch) {
    fetch(`${baseUrl}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        password: bodyPOST.password,
        token: bodyPOST.token,
      }),
    })
      .then(checkResponse)
      .then((data) =>
        dispatch({
          type: GET_NEW_PASSWORD_SUCCESS,
          payload: data,
        })
      )
      .catch((e) => console.log(e));
  };
};
