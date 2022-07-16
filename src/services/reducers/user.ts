import {
  RESET_FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_USER,
  RESET_USER,
  RESET_ISLOGGEDIN
} from "../actions/user";
import { TUserActions } from "../actions/user";

export type TUserState = {
  passwordReset: {success: boolean};
  user: null | {email: string, name: string};
  isLoggedIn: boolean;
}

const initialState: TUserState = {
  passwordReset: { success: false },
  user: null,
  isLoggedIn: false,
};

export function userReducer(state: TUserState = initialState, action: TUserActions) {
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
