import { IIngredientType } from "."


export interface IReduxStore {
  app: IReduxStore__App,
  user: IReduxStore__User,
  adaptive: IReduxStore__Adaptive,
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
  innerWidth: number,

  currentComponent:'nonAdaptive' | 'BurgerIngredients' | 'BurgerConstructor';
  
}