import React from "react";

// Redux
import { shallowEqual, useSelector } from "react-redux";
import { IOrder, IReduxStore } from "../../services/types";

// Components
import { Order } from "./Order/Order";

// Styles
import Styles from "./Orders.module.scss";

export const Orders: React.FunctionComponent = React.memo(() => {
  const { feed } = useSelector(
    (store: IReduxStore) => store.feed,
    shallowEqual
  );
  const { orders } = feed;
  return (
    <div className={Styles.orders}>
      {orders &&
        orders.map((order: IOrder) => {
          return <Order order={order} />;
        })}
    </div>
  );
});
