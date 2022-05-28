import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

export const registration = (bodyPOST) => {
  return function (dispatch) {
    fetch(`${baseUrl}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: bodyPOST.email,
        password: bodyPOST.password,
        name: bodyPOST.name,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        if (data.success) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch({
            type: REGISTRATION_SUCCESS,
            payload: data,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};
