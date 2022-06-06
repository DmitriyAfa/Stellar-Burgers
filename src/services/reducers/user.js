import { RESET_FORGOT_PASSWORD } from "../actions/user";
import { RESET_PASSWORD } from "../actions/user";
import { GET_USER } from "../actions/user";

const initialState = {
  passwordReset: { success: false },
  user: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_FORGOT_PASSWORD:
      return { ...state, passwordReset: action.payload };
    case RESET_PASSWORD:
      return { ...state, passwordReset: action.payload };
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
