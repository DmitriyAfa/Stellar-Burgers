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
    const accessToken: any = localStorage.getItem("accessToken");
    console.log('accessToken ', accessToken.slice(7, accessToken.length))
    const url = `${wsUrlToken}${accessToken.slice(7, accessToken.length)}`;
    wsConnectionStart(url);
  }, []);
  useEffect(() => {
    return () => {
      wsConnectionStop();
    };
  }, []);

  if(!orders.length){
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
