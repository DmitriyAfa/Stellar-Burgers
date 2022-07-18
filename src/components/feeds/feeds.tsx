import {  useEffect } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feeds.module.css";
import FeedCard from "../feed-card/feedCard";
import {FeedInfo} from "../feed-info/feed-info";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { useActions } from "../../utils/useAction";
import { wsUrl } from "../../services/baseUrl";
import { IOrder } from "../../services/reducers/feed";

function Feeds() {
  const {wsConnectionStart, wsConnectionStop} = useActions();
  const { orders, total, totalToday } = useTypedSelector((state) => state.feed);
  useEffect(() => {
    wsConnectionStart(wsUrl);
  }, []);

  useEffect(() => {
    return () => {
      wsConnectionStop();
    }
  }, []);

  if(!orders.length){
    return <h1>Загрузка</h1>
  }

  return (
    <main className={styles.main}>
      <section className={`mt-10 ${styles.feeds}`}>
      <h2 className="mb-5 text text_type_main-large">Лента заказов</h2>
      <div
        className={styles.scrollBar}
      >
      {orders &&
        orders.map((order: IOrder, id: number) => {
          return (
            <FeedCard order={order} key={`${order._id}${id}`} />
           )
        })}
      </div>
    </section>
    <FeedInfo orders={orders} total={total} totalToday={totalToday} />
    </main>
  );
}

export default Feeds;
