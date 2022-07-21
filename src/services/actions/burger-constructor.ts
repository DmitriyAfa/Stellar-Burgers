
import { IIngredient, IIngr } from "../../utils/types/ingredient.types";
import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";
import { TDispatch } from "../store";


export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const DELETE_INGREDIENT_ACTION: "DELETE_INGREDIENT_ACTION" = "DELETE_INGREDIENT_ACTION";
export const MAKE_BUN_QTY_ZERO: "MAKE_BUN_QTY_ZERO" = "MAKE_BUN_QTY_ZERO";

export const GET_ID: "GET_ID" = "GET_ID";
export const GET_BUN_ID: "GET_BUN_ID" = "GET_BUN_ID";

export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER_SUCCESS" = "GET_ORDER_NUMBER_SUCCESS";


export const GET_PRICE: "GET_PRICE" = "GET_PRICE";

export const CLOSE_MODAL_OF_ORDER_DETAILS: "CLOSE_MODAL_OF_ORDER_DETAILS" = "CLOSE_MODAL_OF_ORDER_DETAILS";
export const OPEN_MODAL_OF_ORDER_DETAILS: "OPEN_MODAL_OF_ORDER_DETAILS" = "OPEN_MODAL_OF_ORDER_DETAILS";

export const SORT_CARD: "SORT_CARD" = "SORT_CARD";
export const CLEAR_ORDER_DETAILS: "CLEAR_ORDER_DETAILS" = "CLEAR_ORDER_DETAILS";

interface IAddBun{
  readonly type: typeof ADD_BUN;
  readonly ingredient: IIngredient;
}
interface IAddIngredient{
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
  readonly payload: string;
}
interface IDeleteIngredient{
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
}
interface IDeleteIngredientAction{
  readonly type: typeof DELETE_INGREDIENT_ACTION;
}
interface IMakeBunQTYZero{
  readonly type: typeof MAKE_BUN_QTY_ZERO;
}
interface IGetId{
  readonly type: typeof GET_ID;
}
interface IGetBunId{
  readonly type: typeof GET_BUN_ID;
}
interface IGetOrderNumberSuccess{
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly number: {order: {
    ingredients: [] | Array<IIngr> ;
    number: null | number | string;
  }};
}
interface IGetPrice{
  readonly type: typeof GET_PRICE;
}
interface ICloseModalOfOrderDetails{
  readonly type: typeof CLOSE_MODAL_OF_ORDER_DETAILS;
}
interface IOpenModalOfOrderDetails{
  readonly type: typeof OPEN_MODAL_OF_ORDER_DETAILS;
}
interface ISortCard{
  readonly type: typeof SORT_CARD;
  readonly payload: Array<IIngr>;
}
interface IClearOrderDetails{
  readonly type: typeof CLEAR_ORDER_DETAILS;
}

export type TBurgerConstructor = IAddBun 
| IAddIngredient 
| IDeleteIngredient 
| IDeleteIngredientAction
| IMakeBunQTYZero
| IGetId
| IGetBunId
| IGetOrderNumberSuccess
| IGetPrice
| ICloseModalOfOrderDetails
| IOpenModalOfOrderDetails
| ISortCard
| IClearOrderDetails;


export const BurgerConstructorActionCreator = {
   getOrderNumber: (bodyPOST: string) => {
    return function (dispatch: TDispatch) {
      const accessToken: any = localStorage.getItem("accessToken");
      fetch(`${baseUrl}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: accessToken,
        },
        body: JSON.stringify({
          ingredients: bodyPOST,
        }),
      })
        .then(checkResponse)
        .then((data) => 
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            number: data,
          })
        )
        .catch((e) => console.log(e));
    };
  },
  addBun: (ingredient: IIngr) => (dispatch: TDispatch) => {
    dispatch({
      ...ingredient,
      type: ADD_BUN,
    })
  },
  addIngredient: (ingredient: IIngr, uui: string) => (dispatch: TDispatch) => {
    dispatch({
      ...ingredient,
      payload: uui,
      type: ADD_INGREDIENT,
    })
  },
  makeBunQtyZero: () => (dispatch: TDispatch) => {
    dispatch({
      type: MAKE_BUN_QTY_ZERO,
    })
  },
  getBunId: () => (dispatch: TDispatch) => {
    dispatch({
      type: GET_BUN_ID,
    })
  },
  getId: () => (dispatch: TDispatch) => {
    dispatch({
      type: GET_ID,
    })
  },
  getPrice: () => (dispatch: TDispatch) => {
    dispatch({
      type: GET_PRICE,
    })
  },
  openModalOfOrderDetails: () => (dispatch: TDispatch) => {
    dispatch({
      type: OPEN_MODAL_OF_ORDER_DETAILS,
    })
  },
  closeModalOfOrderDetails: () => (dispatch: TDispatch) => {
    dispatch({
      type: CLOSE_MODAL_OF_ORDER_DETAILS,
    })
  },
  clearOrderDetails: () => (dispatch: TDispatch) => {
    dispatch({
      type: CLEAR_ORDER_DETAILS,
    })
  },
  deleteIngredient: (id: string) => (dispatch: TDispatch) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: id
    })
  }, 
  deleteIngredientAction: () => (dispatch: TDispatch) => {
    dispatch({
      type: DELETE_INGREDIENT_ACTION
    })
  },
  sortCard: (newCards: IIngr[]) => (dispatch: TDispatch) => {
    dispatch({
      type: SORT_CARD,
      payload: newCards
    })
  },

  // TEST
  getOrderNumberSuccess: (data: {order: {ingredients: [] | Array<IIngr>; number: null | number | string;}}): IGetOrderNumberSuccess => ({
    type: GET_ORDER_NUMBER_SUCCESS,
    number: data,
  }),
};
