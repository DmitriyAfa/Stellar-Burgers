import { IIngredientType, TOrders } from "."


export interface IReduxStore {
  app: IReduxStore__App,
  user: IReduxStore__User,
  adaptive: IReduxStore__Adaptive,
  feed: any
}
export interface IReduxStore__App {
  ingredients: {
    data: IIngredientType[],
    request: {
      pending: boolean,
      success: boolean,
      failed: boolean
    }
  },
  clickedIngredient: {
    isShow: boolean,
    data?: IIngredientType
  },
  order: {
    totalAmount: number,
    orderId: number | null,
    burger: {
      name: string | null,
      ingredients: IIngredientType[]
    },
    request: {
      pending: boolean,
      success: boolean,
      failed: boolean
    }
  }
}
export interface IReduxStore__User {
  data: {
    id?: string,
    name?: string,
    email?: string,
    accessToken?: string,
    refreshToken?: string,
  }
  request: {
    pending: boolean,
    success: boolean,
    failed: boolean
  }
}

export interface IReduxStore__Adaptive {
  currentComponent: 'nonAdaptive' | 'BurgerIngredients' | 'BurgerConstructor' | "FeedOrders" | "FeedStatistic";
}

export interface IReduxStore__Feed {
  feed: {
    orders: TOrders,
    total: number,
    totalToday: number,
  },
  request: {
    pending: boolean,
    success: boolean,
    failed: boolean
  }
}