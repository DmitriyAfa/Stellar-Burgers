export interface IIngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid: string;
}


export type TFormDataType = IInputDataType[];

export interface IInputDataType {
  type: "text" | "email" | "password",
  name: string,
  placeholder: string,
  value: string,
}


export interface ILocationType {
  pathname: string;
  state: {
    from: Location;
  };
};

export interface IOrder {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updateAt: string,
  _id: string
}

export type TOrders = IOrder[]




// REDUX STORE
export type { IReduxStore, IReduxStore__App, IReduxStore__User, IReduxStore__Adaptive, IReduxStore__Feed } from './redux';

