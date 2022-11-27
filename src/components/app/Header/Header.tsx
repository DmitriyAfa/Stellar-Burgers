import React from "react";
import { useLocation, Link } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { ILocationType, IReduxStore } from "../../../services/types";

// Ya components
import {
  BurgerIcon,
  Logo,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./Header.module.scss";

export const Header: React.FunctionComponent = React.memo(() => {
  const location = useLocation() as ILocationType;

  const user = useSelector((store: IReduxStore) => store.user, shallowEqual);

  const { request } = user;
  const { accessToken } = user.data;

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <ul className={styles.navContainer__nav}>
          <li
            className={
              styles.nav__item +
              " " +
              (location.pathname === "/" ? styles.active : "")
            }
          >
            <Link
              to="/"
              state={{ from: { pathname: location.pathname } }}
              className={styles.item__link}
            >
              <div className={styles.link__icon}>
                <BurgerIcon type="primary" />
              </div>
              <span className={styles.link__text}>Конструктор</span>
            </Link>
          </li>

          <li
            className={
              styles.nav__item +
              " " +
              (location.pathname === "/feed" ? styles.active : "")
            }
          >
            <Link
              to="/feed"
              state={{ from: { pathname: location.pathname } }}
              className={styles.item__link}
            >
              <div className={styles.link__icon}>
                <ListIcon type="primary" />
              </div>
              <span className={styles.link__text}>Лента заказов</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.header__logo}>
        <Link to="/" state={{ from: { pathname: location.pathname } }}>
          <Logo />
        </Link>
      </div>

      <div
        className={
          styles.profileContainer +
          " " +
          (location.pathname.includes("/profile") ||
          location.pathname === "/login"
            ? styles.active
            : "")
        }
      >
        <Link
          to={accessToken ? "/profile" : "/login"}
          className={styles.profileContainer__link}
        >
          <div className={styles.link__icon}>
            <ProfileIcon type="primary" />
          </div>
          <span className={styles.link__text}>
            {accessToken ? "Личный кабинет" : "Войти в аккаунт"}
          </span>
        </Link>
      </div>
    </header>
  );
});
