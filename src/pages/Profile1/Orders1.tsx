import React, { useEffect } from "react";

// Redux
import {
  wsConnectionStart,
  wsConnectionStop,
} from "../../services/redux/slicers/feedSlice";
import { useDispatch } from "react-redux";

// URL
import { WEBSOCKET_TOKEN_URL, WEBSOCKET_URL } from "../../services/Api";
import { Orders } from "../../components/Orders/Orders";

export const OrdersPage = React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const token = JSON.parse(accessToken!);
    const url = `${WEBSOCKET_TOKEN_URL}${token.value}`;
    /**
     * Возможны неполадки с токеном на сервере, поэтому отправляю общий  url
     *
     */
    dispatch(wsConnectionStart(WEBSOCKET_URL));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(wsConnectionStop());
    };
  }, []);

  return (
    <div>
      <Orders />
    </div>
  );
});
