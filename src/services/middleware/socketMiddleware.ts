import { Middleware, MiddlewareAPI } from 'redux';
import { rootStateTypes } from '../reducers';
import {TDispatch} from '../store'


type TwsActions = {
  WS_CONNECTION_START: string;
  WS_CONNECTION_STOP: string;
  WS_CONNECTION_SUCCESS: string;
  WS_CONNECTION_ERROR: string;
  WS_CONNECTION_CLOSED: string;
  WS_GET_MESSAGE: string;
  WS_SEND_MESSAGE: string;
};


export const socketMiddleware = (wsActions: TwsActions): Middleware =>
  (store: MiddlewareAPI) => {
    
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }

      if (type === wsActions.WS_CONNECTION_STOP && socket !== null) {
        socket.close(1000, 'Connection stopped by user');
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: wsActions.WS_CONNECTION_SUCCESS,
            payload: event,
          });
        };

        socket.onerror = (event) => {
          dispatch({
            type: wsActions.WS_CONNECTION_ERROR,
            payload: event,
          });
        };

        socket.onmessage = (event) => {

          const { data } = event;
          if (data?.includes('ping')) {
            if (socket !== null) {
              socket.send('pong');
            }
          }

          const { success, orders, total, totalToday } = JSON.parse(data);

          if (success) {
            dispatch({
              type: wsActions.WS_GET_MESSAGE,
              payload: {
                orders,
                total,
                totalToday,
              },
            });
          }

        };

        socket.onclose = (e) => {
          dispatch({
            type: wsActions.WS_CONNECTION_CLOSED,
            payload: e,
          });
        };
        if (type === wsActions.WS_SEND_MESSAGE) {
          socket.send(JSON.stringify(payload));
        }
      }
      next(action);
    };
  };