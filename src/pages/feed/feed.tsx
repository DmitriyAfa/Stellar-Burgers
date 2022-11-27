import React from "react";
import { Link, useLocation } from "react-router-dom";

// Types
import { ILocationType } from "./../../services/types/";

// Styles
import Styles from "./feed.module.scss";

export const Feed = React.memo(() => {
  const location = useLocation() as ILocationType;
  const from = location.state?.from?.pathname || "/";

  return (
    <section className={Styles.feedContainer}>
      <span className={Styles.feedContainer__text}>
        Скоро здесь будет лента заказов, но пока есть только кнопка
      </span>
      <Link to={from} className={Styles.feedContainer__link}>
        Назад
      </Link>
    </section>
  );
});
