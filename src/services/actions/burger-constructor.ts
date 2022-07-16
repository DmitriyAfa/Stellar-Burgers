import { Store } from "redux";
import { IIngredient } from "../../utils/types/ingredient.types";
import { baseUrl } from "../baseUrl";
import { checkResponse } from "../checkResponse";


export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const DELETE_INGREDIENT_ACTION: "DELETE_INGREDIENT_ACTION" = "DELETE_INGREDIENT_ACTION";
export const MAKE_BUN_QTY_ZERO: "MAKE_BUN_QTY_ZERO" = "MAKE_BUN_QTY_ZERO";

export const GET_ID: "GET_ID" = "GET_ID";
export const GET_BUN_ID: "GET_BUN_ID" = "GET_BUN_ID";

// export const GET_ORDER_NUMBER_REQUEST: "GET_ORDER_NUMBER_REQUEST" = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER_SUCCESS" = "GET_ORDER_NUMBER_SUCCESS";
// export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

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
  readonly number: any;
}
interface IGetPrice{
  readonly type: typeof GET_PRICE;
}
interface ICloseModalOfOrderDetails{
  readonly type: typeof CLOSE_MODAL_OF_ORDER_DETAILS;
  readonly orderDetailsIsActive: boolean;
}
interface IOpenModalOfOrderDetails{
  readonly type: typeof OPEN_MODAL_OF_ORDER_DETAILS;
  readonly orderDetailsIsActive: boolean;
}
interface ISortCard{
  readonly type: typeof SORT_CARD;
  readonly payload: Array<IIngredient>;
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
   getOrderNumber: (bodyPOST: any) => {
    return function (dispatch: Store['dispatch']) {
      fetch(`${baseUrl}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
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
  addBun: (ingredient: any) => (dispatch: Store['dispatch']) => {
    dispatch({
      ...ingredient,
      type: ADD_BUN,
    })
  },
  addIngredient: (ingredient: any, uui: string) => (dispatch: Store['dispatch']) => {
    dispatch({
      ...ingredient,
      payload: uui,
      type: ADD_INGREDIENT,
    })
  },
  makeBunQtyZero: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: MAKE_BUN_QTY_ZERO,
    })
  },
  getBunId: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: GET_BUN_ID,
    })
  },
  getId: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: GET_ID,
    })
  },
  getPrice: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: GET_PRICE,
    })
  },
  openModalOfOrderDetails: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: OPEN_MODAL_OF_ORDER_DETAILS,
    })
  },
  closeModalOfOrderDetails: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: CLOSE_MODAL_OF_ORDER_DETAILS,
    })
  },
  clearOrderDetails: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: CLEAR_ORDER_DETAILS,
    })
  },
  deleteIngredient: (id: string) => (dispatch: Store['dispatch']) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: id
    })
  }, 
  deleteIngredientAction: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: DELETE_INGREDIENT_ACTION
    })
  },
  sortCard: (newCards: any) => (dispatch: Store['dispatch']) => {
    dispatch({
      type: SORT_CARD,
      payload: newCards
    })
  }
};
