import { ILoginForm } from "../../pages";
import {
  RESET_FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_USER,
  RESET_USER,
  RESET_ISLOGGEDIN
} from "../actions/user";
import { TUserActions } from "../actions/user";

export type TUserState = {
  passwordReset: {success: boolean} | Readonly<{ success: boolean, message: string}>;
  user: null | {email: string, name: string} | Readonly<{
    success: boolean,
    user: {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
  }> | any;
  isLoggedIn: boolean;
}

export const initialState: TUserState = {
  passwordReset: { success: false },
  user: null,
  isLoggedIn: false,
};

export function userReducer(state = initialState, action: TUserActions): TUserState {
  switch (action.type) {
    case RESET_FORGOT_PASSWORD:
      return { ...state, passwordReset: action.payload };
    case RESET_PASSWORD:
      return { ...state, passwordReset: action.payload };
    case GET_USER:
      return { ...state, user: action.payload };
    case RESET_USER:
      return { ...state, user: null };
    case RESET_ISLOGGEDIN:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
}
