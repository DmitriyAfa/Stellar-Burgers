import { TwsActions, EwsActions } from "../actions/feed";

  export interface IOrder {
    createdAt: string;
    ingredients: string[];
    name?: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
  }

export type TFeedState = {
  orders: Array<IOrder>;
  ordersUser: Array<IOrder>;
  isLoading: boolean;
  total: number;
  totalToday: number;
  totalUser: number;
  totalTodayUser: number;
  isConnected: boolean;
  isConnectionFailed: boolean;
  isConnectedUser: boolean;
  isConnectionFailedUser: boolean;
  feedDetails: null | IOrder;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  isConnected: false,
  isConnectionFailed: false,
  ordersUser: [],
  totalUser: 0,
  totalTodayUser: 0,
  isConnectedUser: false,
  isConnectionFailedUser: false,
  feedDetails: null,
};

// !!!!!!!!!!
export function FeedReducer(
  state = initialState,
  action: TwsActions
): TFeedState {
  switch (action.type) {
    case EwsActions.WS_CONNECTION_START:
      return {
        ...state,
      };
    case EwsActions.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        isConnected: true,
        isConnectionFailed: false,
      };
    case EwsActions.WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case EwsActions.WS_CONNECTION_CLOSED:
      return {
        ...state,
        isConnected: false,
        isConnectionFailed: false,
      };
    case EwsActions.WS_CONNECTION_STOP:
      return {
        ...state,
        isConnected: false,
        isConnectionFailed: false,
      };
    case EwsActions.GET_FEED_DETAILS:
      return {
        ...state,
        feedDetails: action.payload
      };
    default:
      return state;
  }
}
