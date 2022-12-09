import React, { useEffect } from "react";

// Route
import { Link, useLocation } from "react-router-dom";

// Types
import { ILocationType, IReduxStore } from "./../../services/types/";

// Styles
import Styles from "./feed.module.scss";

// Redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  wsConnectionStart,
  wsConnectionStop,
} from "../../services/redux/slicers/feedSlice";

// URL
import { WEBSOCKET_URL } from "../../services/Api";

// Components
import { Orders } from "../../components/Orders/Orders";
import { FeedInfo } from "../../components/Orders/FeedInfo/FeedInfo";
import { FeedMobile } from "./FeedMobile/FeedMobile";

export const Feed = React.memo(() => {
  const location = useLocation() as ILocationType;
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart(WEBSOCKET_URL));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(wsConnectionStop());
    };
  }, []);

  return (
    <>
      {window.innerWidth > 930 ? (
        <section className={Styles.feed}>
          <h2 className="mb-5 text text_type_main-large">Лента заказов</h2>
          <div className={Styles.feed__container}>
            <div className={Styles.feed__orders}>
              <Orders />
            </div>
            <div className={Styles.feed__total}>
              <FeedInfo />
            </div>
          </div>
        </section>
      ) : (
        <FeedMobile />
      )}
    </>
  );
});
