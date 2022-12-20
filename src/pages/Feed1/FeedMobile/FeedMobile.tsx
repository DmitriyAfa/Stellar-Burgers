import React, { useEffect, useState } from "react";

// Ya import
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

// Redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCurrentComponent } from "../../../services/redux/slicers/adaptiveSlice";
import { IReduxStore } from "../../../services/types";

// Styles
import Styles from "./FeedMobile.module.scss";
import { Orders } from "../../../components/Orders/Orders";
import { FeedInfo } from "../../../components/Orders/FeedInfo/FeedInfo";

export const FeedMobile = React.memo(() => {
  const [current, setCurrent] = useState("one");
  const dispatch = useDispatch();

  const { currentComponent } = useSelector(
    (store: IReduxStore) => store.adaptive,
    shallowEqual
  );

  const setOrders = () => {
    dispatch(setCurrentComponent("FeedOrders"));
  };
  const setStatistic = () => {
    dispatch(setCurrentComponent("FeedStatistic"));
  };

  useEffect(() => {
    if (window.innerWidth <= 930) {
      dispatch(setCurrentComponent("FeedOrders"));
    }
  }, []);

  return (
    <section className={Styles.feed}>
      <div className={Styles.feed__menu}>
        <span onClick={setOrders}>
          {/* @ts-ignore */}
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Заказы
          </Tab>
        </span>
        <span onClick={setStatistic}>
          {/* @ts-ignore */}
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Статистика
          </Tab>
        </span>
      </div>
      <div className={Styles.feed__content}>
        {currentComponent === "FeedOrders" ? <Orders /> : <FeedInfo />}
      </div>
    </section>
  );
});
