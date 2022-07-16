import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducers } from "./reducers";
import { socketMiddleware } from "./middleware";
import {EwsActions} from './actions/feed';
import { useDispatch } from "react-redux";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


// const enhancer = composeEnhancers(applyMiddleware(thunk));
// export const store = createStore(rootReducers, enhancer);

 const obj = {
  WS_CONNECTION_START: EwsActions.WS_CONNECTION_START,
  WS_CONNECTION_STOP: EwsActions.WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS: EwsActions.WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR:EwsActions.WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED:  EwsActions.WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE: EwsActions.WS_GET_MESSAGE,
  WS_SEND_MESSAGE: EwsActions.WS_SEND_MESSAGE,
}

export const store = createStore(
  rootReducers,
  applyMiddleware(thunk, socketMiddleware(obj))
);

//  Получим типы диспатчей из стора
export type TDispatch = typeof store.dispatch;
// создадим типизированный хук диспатч для использования в useActions
export const useTypedDispatch = () => useDispatch<TDispatch>();