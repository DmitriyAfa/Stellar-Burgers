import { IOrders } from "../../utils/types/types";
import { IOrder } from "../reducers/feed";
import { TDispatch } from "../store";

export enum EwsActions {
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_STOP = 'WS_CONNECTION_STOP',
  WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_ERROR ='WS_CONNECTION_ERROR',
  WS_CONNECTION_CLOSED =  'WS_CONNECTION_CLOSED',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
  GET_FEED_DETAILS = 'GET_FEED_DETAILS',
}

interface wsStart {
  type: EwsActions.WS_CONNECTION_START;
  payload: string;
}
interface wsStop {
  type: EwsActions.WS_CONNECTION_STOP;
}
interface wsSuccess {
  type: EwsActions.WS_CONNECTION_SUCCESS;
}
interface wsError {
  type: EwsActions.WS_CONNECTION_ERROR;
}
interface wsClosed {
  type: EwsActions.WS_CONNECTION_CLOSED;
}
interface wsGetMessage {
  type: EwsActions.WS_GET_MESSAGE;
  payload: { orders: IOrders[]; total: number; totalToday: number };
}
interface wsSengMessage {
  type: EwsActions.WS_SEND_MESSAGE;
  payload: string;
}
interface getFeedDetails {
  type: EwsActions.GET_FEED_DETAILS;
  payload: IOrder;
}

export type TwsActions =
  | wsStart
  | wsSuccess
  | wsError
  | wsClosed
  | wsStop
  | wsGetMessage
  | wsSengMessage
  | getFeedDetails;


export const FeedActionCreator = {
  wsConnectionStart: (url: string) => ({
    type: EwsActions.WS_CONNECTION_START,
    payload: url
  }),
  wsConnectionStop: () => ({
    type: EwsActions.WS_CONNECTION_STOP,
  }),
  wsConnectionSuccess: () =>  ({
    type: EwsActions.WS_CONNECTION_SUCCESS,
  }),
  wsConnectionError: () =>  ({
    type: EwsActions.WS_CONNECTION_ERROR,
  }),
  wsConnectionClosed: () =>  ({
    type: EwsActions.WS_CONNECTION_CLOSED,
  }),
  wsGetMessage: (message: string) => ({
    type: EwsActions.WS_GET_MESSAGE,
    payload: message
  }),
  wsSendMessage: (message: string) =>  ({
    type: EwsActions.WS_SEND_MESSAGE,
    payload: message
  }),
  getFeedDetails: (order: IOrder) => (dispatch: TDispatch) => {
    dispatch({
      type: EwsActions.GET_FEED_DETAILS,
      payload: order,
    });
  },
};