import React, { useMemo } from "react";

// Redux
import { shallowEqual, useSelector } from "react-redux";
import { IReduxStore } from "../../../services/types";
import { IOrder } from "../../../services/types";

// Styles
import styles from "./FeedInfo.module.scss";

export const FeedInfo: React.FunctionComponent = React.memo(() => {
  const { feed } = useSelector(
    (store: IReduxStore) => store.feed,
    shallowEqual
  );

  const { orders, total, totalToday } = feed;

  const getDoneOrders = useMemo(() => {
    const doneOrders = orders.filter(
      (order: IOrder) => order.status === "done"
    );

    if (doneOrders) {
      // условия задания "Реализуйте вёрстку так, чтобы каждая из этих колонок содержала не более 10 записей"
      // Вызов slice(-2) извлечёт два последних элемента последовательности - получается если использовать отрицательное число
      //в первом аргументе, то массив будет копирован начиная с end + |-2|(модуль чила) до end
      return doneOrders.slice(-20);
    }
    return null;
  }, [orders]);

  const getPendingOrders = useMemo(() => {
    const pendingOrders = orders.filter(
      (order: IOrder) => order.status === "pending"
    );

    if (pendingOrders) {
      return pendingOrders.slice(-20);
    }
    return null;
  }, [orders]);

  return (
    <section className={styles.main}>
      <div className={`mb-15 ${styles.top}`}>
        <div className={`${styles.ready}`}>
          <p className={`mb-6 text text_type_main-medium`}> Готовы:</p>
          {getDoneOrders && getDoneOrders.length > 9 ? (
            <div className={`${styles.orders}`}>
              <ul
                className={`text text_type_digits-default text_color_inactive ${styles.ul}`}
              >
                {getDoneOrders.map((order: IOrder, i: number) => {
                  if (i <= 9) {
                    return <li key={order.number}>{order.number}</li>;
                  }
                })}
              </ul>
              <ul
                className={`text text_type_digits-default text_color_inactive ${styles.ul}`}
              >
                {getDoneOrders.map((order: IOrder, i: number) => {
                  if (i > 9) {
                    return <li key={order.number}>{order.number}</li>;
                  }
                })}
              </ul>
            </div>
          ) : (
            <div className={`${styles.orders}`}>
              <ul
                className={`text text_type_digits-default text_color_inactive ${styles.ul}`}
              >
                {getDoneOrders!.map((order: IOrder, i: number) => {
                  if (i <= 9) {
                    return <li key={order.number}>{order.number}</li>;
                  }
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={`${styles.todo}`}>
          <p className={`mb-6 text text_type_main-medium`}> В работе:</p>
          {getPendingOrders && getPendingOrders.length > 9 ? (
            <div className={`${styles.orders}`}>
              <ul
                className={`text text_type_digits-default text_color_inactive ${styles.ul}`}
              >
                {getPendingOrders.map((order: IOrder, i: number) => {
                  if (i <= 9) {
                    return <li key={order.number}>{order.number}</li>;
                  }
                })}
              </ul>
              <ul
                className={`text text_type_digits-default text_color_inactive ${styles.ul}`}
              >
                {getPendingOrders.map((order: IOrder, i: number) => {
                  if (i > 9) {
                    return <li key={order.number}>{order.number}</li>;
                  }
                })}
              </ul>
            </div>
          ) : (
            <div className={`${styles.orders}`}>
              <ul
                className={`text text_type_digits-default text_color_inactive ${styles.ul}`}
              >
                {getPendingOrders!.map((order: IOrder, i: number) => {
                  if (i <= 9) {
                    return <li key={order.number}>{order.number}</li>;
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={`mb-15 ${styles.center}`}>
        <p className={`text text_type_main-medium`}> Выполнено за все время:</p>
        <p
          className={`text ${
            window.innerWidth > 560
              ? "text_type_digits-large"
              : "text_type_digits-medium mt-6"
          }`}
        >
          {" "}
          {total}
        </p>
      </div>
      <div className={`${styles.bottom}`}>
        <p className={`text text_type_main-medium`}> Выполнено за сегодня:</p>
        <p
          className={`text ${
            window.innerWidth > 560
              ? "text_type_digits-large"
              : "text_type_digits-medium mt-6"
          }`}
        >
          {" "}
          {totalToday}
        </p>
      </div>
    </section>
  );
});
