import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { userReducer } from "./user";
import {FeedReducer} from "./feed";

export const rootReducers = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  user: userReducer,
  feed: FeedReducer,
});

export type rootStateTypes = ReturnType<typeof rootReducers>;