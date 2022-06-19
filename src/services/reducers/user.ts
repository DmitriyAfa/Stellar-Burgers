import {
  RESET_FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_USER,
  RESET_USER,
  RESET_ISLOGGEDIN
} from "../actions/user";

const initialState = {
  passwordReset: { success: false },
  user: null,
  isLoggedIn: false,
};

export function userReducer(state = initialState, action: any) {
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
