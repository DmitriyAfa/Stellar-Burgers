import { post, get, patch } from "../api";

export const RESET_FORGOT_PASSWORD = "RESET_FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const GET_USER = "GET_USER";
export const RESET_USER = "RESET_USER";

export const userActionsCreator = {
  forgotPassword: (form: any) => (dispatch: any) => {
    return post("password-reset", form).then((data) => {
      if (data.success) {
        dispatch({ type: RESET_FORGOT_PASSWORD, payload: data });
        return true;
      }
    });
  },
  resetPassword: (form: any) => (dispatch: any) => {
    return post("password-reset/reset", form).then((data) => {
      if (data.success) {
        dispatch({ type: RESET_PASSWORD, payload: data });
        return true;
      }
    });
  },
  registration: (form: any) => (dispatch: any) => {
    return post("auth/register", form).then((data) => {
      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({ type: GET_USER, payload: data.user });
        return true;
      }
      return false;
    });
  },
  login: (form: any) => (dispatch: any) => {
    return post("auth/login", form).then((data) => {
      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({ type: GET_USER, payload: data.user });
        return true;
      }
      return false;
    });
  },
  logout: () => (dispatch: any) => {
    const refreshToken = {
      token: localStorage.getItem("refreshToken"),
    };
    return post("auth/logout", refreshToken).then((data) => {
      if (data.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: RESET_USER });
        return true;
      }
      return false;
    });
  },
  authUser: async () => {
    return await get("auth/user")
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  },
  getUser: () => async (dispatch: any) => {
    return await userActionsCreator
      .authUser()
      .then(async (data) => {
        if (data.success) {
          dispatch({ type: GET_USER, payload: data.user });
          return data;
        } else if (data.message === "jwt expired") {
          const res = await userActionsCreator.refreshTokenFunc();
          if (res) {
            return true;
          }
        }
      })
      .catch(async (err) => {
        return await console.log("ERROR ", err);
      });
  },
  refreshTokenFunc: async () => {
    const refreshToken = {
      token: localStorage.getItem("refreshToken"),
    };

    return await post("auth/token", refreshToken)
      .then((data) => {
        if (data.success) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          return true;
        }
        return false;
      })
      .catch(async (err) => {
        return await console.log("ERROR ", err);
      });
  },
  changeAuthUser: (form: any) => async (dispatch: any) => {
    const res = await userActionsCreator.refreshTokenFunc();
    if (res) {
      return await patch("auth/user", form)
        .then((data) => {
          if (data.success) {
            dispatch({ type: GET_USER, payload: data.user });
            return true;
          }
          return false;
        })
        .catch((err) => {
          return console.log("ERROR ", err);
        });
    }
    return false;
  },
};
