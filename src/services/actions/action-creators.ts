import { userActionsCreator } from "./user";
import { IngredientsActionCreator } from "./burger-ingredients";
import { BurgerConstructorActionCreator } from "./burger-constructor";
import { ModalActionCreator } from "./modal";
import { FeedActionCreator } from "./feed";

export const actionCreators = {
  ...userActionsCreator,
  ...IngredientsActionCreator,
  ...BurgerConstructorActionCreator,
  ...ModalActionCreator,
  ...FeedActionCreator
};
