import { TStateBurgerIngredients } from "../../services/reducers/burger-ingredients";
import { TFeedState } from "../../services/reducers/feed";
import { TUserState } from "../../services/reducers/user";

export interface IOrders {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export type TStore = {
  burgerIngredients:TStateBurgerIngredients;
  user: TUserState;
  feed: TFeedState ;
}