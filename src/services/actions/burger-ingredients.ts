import { request } from "../api";
import { IIngredient, IIngr } from "../../utils/types/ingredient.types";
import { TDispatch } from "../store";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const GET_INGREDIENT: "GET_INGREDIENT" = "GET_INGREDIENT";

export const INCREASE: "INCREASE" = "INCREASE";
export const DECREASE: "DECREASE" = "DECREASE";

// !!!!
interface IGetIngredientsRequest{
  readonly type: typeof GET_INGREDIENTS_REQUEST;
  readonly ingredientsFailed?: boolean;
  readonly ingredientsRequest?: boolean,
}
interface IGetIngredientsSuccess{
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<IIngredient>;
}
// !!!!
interface IGetIngredientsFailed{
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
interface IGetIngredient{
  readonly type: typeof GET_INGREDIENT;
  readonly payload: IIngredient;
}
interface IIncrease{
  readonly type: typeof INCREASE;
  readonly payload: string;
}
interface Decrease{
  readonly type: typeof DECREASE;
  readonly payload: string;
}

// !!!!
export type TBurgerIngredientsActions = IGetIngredientsSuccess
 | IGetIngredientsRequest 
| IGetIngredientsFailed 
| IGetIngredient
| IIncrease
| Decrease;

export const IngredientsActionCreator = {
  getIngredientsRequest: () => (dispatch: TDispatch) => {
    request("ingredients")
      .then((data) => {
        if (data.success) {
          dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: data.data });
          dispatch({ type: GET_INGREDIENTS_REQUEST });
          return true;
        }
        dispatch({ type: GET_INGREDIENTS_FAILED });
        return false;
      })
      .catch((e) => console.log(e));
  },
  getIngredient: (ingredient: IIngredient) => (dispatch: TDispatch) => {
    dispatch({
      type: GET_INGREDIENT,
      payload: ingredient,
    });
  },
  increase: (id: string) => (dispatch: TDispatch) => {
    dispatch({
      type: INCREASE,
      payload: id,
    })
  },
  decrease: (id: string) => (dispatch: TDispatch) => {
    dispatch({
      type: DECREASE,
      payload: id,
    })
  },

  // TEST
  getIngredientsSuccess: (ingredients: IIngredient[]): IGetIngredientsSuccess => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients,
  }),

};
