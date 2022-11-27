import React, { useState } from "react";

// Router
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ILocationType, IReduxStore } from "../../../../services/types";

// Ya components
import {
  MenuIcon,
  CloseIcon,
  ProfileIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./MobileHeader.module.scss";
import styles2 from "../Header.module.scss";

// Redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCurrentComponent } from "../../../../services/redux/slicers/adaptiveSlice";

export const MobileHeader: React.FunctionComponent = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIisProfileOpen] = useState(false);

  const user = useSelector((store: IReduxStore) => store.user, shallowEqual);

  const location = useLocation() as ILocationType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentComponent } = useSelector(
    (store: IReduxStore) => store.adaptive,
    shallowEqual
  );
  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setIisProfileOpen(false);
  };

  const goToLogin = (): void => {
    navigate("/login");
    closeMenu();
  };

  const { accessToken } = user.data;

  return currentComponent === "BurgerIngredients" ? (
    <header
      className={
        styles.MobileHeaderContainer +
        " " +
        (isMenuOpen ? styles.MobileHeaderContainer_opened : "")
      }
    >
      <div className={styles.header}>
        {isMenuOpen ? (
          <h2 className={styles.header__title}>Меню</h2>
        ) : (
          <div className={styles.header__logo}>
            <img src={require("../../../../assets/images/logo.png")}></img>
          </div>
        )}
        <span
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.header__menu}
        >
          {isMenuOpen ? (
            <CloseIcon type="primary" />
          ) : (
            <MenuIcon type="primary" />
          )}
        </span>
      </div>
      {isMenuOpen ? (
        <nav className={styles.nav}>
          <div className={styles.profile}>
            <div
              className={styles.profile__container}
              onClick={
                accessToken
                  ? () => setIisProfileOpen(!isProfileOpen)
                  : () => goToLogin()
              }
            >
              <div className={styles.content}>
                <ProfileIcon type="primary" />
                <span className={styles.text}>
                  {accessToken ? "Личный кабинет" : "Войти в аккаунт"}
                </span>
              </div>
              {accessToken && (
                <span>
                  {isProfileOpen ? (
                    <ArrowUpIcon type="primary" />
                  ) : (
                    <ArrowDownIcon type="primary" />
                  )}
                </span>
              )}
            </div>
            {isProfileOpen ? (
              <ul className={styles.items}>
                <li className={styles.item} onClick={() => closeMenu()}>
                  <Link
                    to="/profile"
                    state={{ from: { pathname: location.pathname } }}
                    className={styles.item__link + " text_color_inactive"}
                  >
                    Профиль
                  </Link>
                </li>
                <li className={styles.item} onClick={() => closeMenu()}>
                  <Link
                    to="/profile/orders"
                    state={{ from: { pathname: location.pathname } }}
                    className={styles.item__link + " text_color_inactive"}
                  >
                    История заказов
                  </Link>
                </li>
                <li className={styles.item} onClick={() => closeMenu()}>
                  <Link
                    to="/profile/logout"
                    state={{ from: { pathname: location.pathname } }}
                    className={styles.item__link + " text_color_inactive"}
                  >
                    Выход
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul
              className={styles2.navContainer__nav}
              style={{ flexDirection: "column" }}
            >
              <li
                className={
                  styles2.nav__item +
                  " " +
                  (location.pathname === "/" ? styles2.active : "")
                }
                onClick={() => closeMenu()}
              >
                <Link
                  to="/"
                  state={{ from: { pathname: location.pathname } }}
                  className={styles2.item__link}
                >
                  <div className={styles2.link__icon}>
                    <BurgerIcon type="primary" />
                  </div>
                  <span className={styles2.link__text}>Конструктор</span>
                </Link>
              </li>

              <li
                className={
                  styles2.nav__item +
                  " " +
                  (location.pathname === "/feed" ? styles2.active : "")
                }
                onClick={() => closeMenu()}
              >
                <Link
                  to="/feed"
                  state={{ from: { pathname: location.pathname } }}
                  className={styles2.item__link}
                >
                  <div className={styles2.link__icon}>
                    <ListIcon type="primary" />
                  </div>
                  <span className={styles2.link__text}>Лента заказов</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  ) : currentComponent === "BurgerConstructor" ? (
    <header
      className={
        styles.MobileHeaderContainer +
        " " +
        (isMenuOpen ? styles.MobileHeaderContainer_opened : "")
      }
    >
      <div className={styles.header}>
        <h2 className={styles.header__title}>Заказ</h2>
        <span
          onClick={() => dispatch(setCurrentComponent("BurgerIngredients"))}
          className={styles.header__menu}
        >
          <CloseIcon type="primary" />
        </span>
      </div>
    </header>
  ) : null;
});
