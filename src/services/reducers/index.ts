import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { userReducer } from "./user";

export const rootReducers = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  user: userReducer,
});
