import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";

export const rootReducers = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
});
