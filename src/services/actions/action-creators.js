import { userActionsCreator } from "./user";
import { IngredientsActionCreator } from "./burger-ingredients";

export const actionCreators = {
  ...userActionsCreator,
  ...IngredientsActionCreator,
};
