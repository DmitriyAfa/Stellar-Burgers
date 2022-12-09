// Redux
import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionGetMessage,
  wsConnectionClosed,
} from "../redux/slicers/feedSlice";

export const socketMiddleware = (): Middleware => (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;

    /**
     * Если тип экшена feed/wsConnectionStart, то создаем объект new WebSocket и
     * передаем ему специальный протокол ws или wss с url адресом.
     *
     * Когда WebSocket(payload) будет создан он сразу начнет устанавливать соединение.
     */
    if (type === "feed/wsConnectionStart") {
      socket = new WebSocket(payload);
    }

    /**
     * Если тип экшена feed/wsConnectionStop и socket не равен null,
     * закрываем соединение или попытку соединения.
     * Передаем первым параметром код который указывает на причину закрытия соединения.
     * Вторым параметром передаем, в виде строки, причину закрытия которая будет понятна человеку.
     */
    if (type === "feed/wsConnectionStop" && socket !== null) {
      socket.close(1000, "Connection stopped by user");
    }

    if (socket) {
      socket.onopen = (event) => {
        dispatch(wsConnectionSuccess());
      };

      socket.onerror = (event) => {
        dispatch(wsConnectionError());
      };

      /**
       * Событие сообщения запускается при получении данных через WebSocket
       */
      socket.onmessage = (event) => {
        const { data } = event;

        if (data?.includes("ping")) {
          if (socket !== null) {
            socket.send("pong");
          }
        }

        const { success } = JSON.parse(data);

        if (success) {
          dispatch(wsConnectionGetMessage(JSON.parse(data)));
        }
      };

      socket.onclose = (e) => {
        dispatch(wsConnectionClosed());
      };

      if (type === "feed/wsConnectionSendMessage") {
        socket.send(JSON.stringify(payload));
      }
    }
    next(action);
  };
};

/**
 * Протокол WebSocket обеспечивает возможноть обмена данными между браузером и сервером
 * через постоянное соединение.
 */
