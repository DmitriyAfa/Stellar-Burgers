import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";

import { useActions } from "../../utils/useAction";
import { useTypedSelector } from "../../utils/useTypedSelector";
import styles from './profileOrder.module.css';
import { wsUrlToken } from "../../services/baseUrl";
import FeedCard from "../feed-card/feedCard";
import { useRouteMatch } from "react-router";

export const ProfileOrder = () => {
  const { orders } = useTypedSelector((store) => store.feed);
  const { wsConnectionStart, wsConnectionStop } = useActions();
  const isProfileOrdersPage = useRouteMatch('/profile/orders');
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const url = `${wsUrlToken}${accessToken!.slice(7, accessToken!.length)}`;
    wsConnectionStart(url);
  }, []);
  useEffect(() => {
    return () => {
      wsConnectionStop();
    };
  }, []);
  // ДЛЯ ревьюера "иногда пропадает содержимое заказа в попапе заказа, если 2-3 раза открыть его." - скорее всего это происходит на странице /profile/orders
  // по какой-то причине от сервера не всегда приходят корректные данные при передачи accessToken. На данный момент склоняюсь к тому, что - это проблема с сервером
  // т.к. если посмотреть в консоле orders - приходит массив корректных данных, а затем сразу не корректных из-за этого в модальном окне пропадает содержимое заказа. 

  // Не нашел ошибки в способе передачи accessToken т.к. при отправки на предыдущую проверку все отображалось корректно

  if(orders.length === 0){
    return <h1>Загрузка</h1>
  }

  return(
    <div className={isProfileOrdersPage ? styles.profileOrders : styles.scrollBar}>
      {orders &&
        orders.map((order, id) => (
          <FeedCard key={`${order._id}${id}`} order={order} />
        ))}
    </div>
  )
}
