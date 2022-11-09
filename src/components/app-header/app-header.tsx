import {  useCallback, FC } from "react";
import {  useHistory } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

import {IAppHeader, IAppHeaderButton} from './types';

const  AppHeader = ({ constr, lenta, profile } : IAppHeader) => {
  const history = useHistory();

  const AppHeaderButton: FC<IAppHeaderButton> = ({ typeButton, children, text }) => {
    let typeOfButton = typeButton === "active" ? "" : styles.inactive;

    return (
      <button
        className={`${styles.button} text text_type_main-default mt-4 mb-4 pl-5 pr-5 pb-4 pt-4 ${typeOfButton}`}
      >
        <span className="mr-2">{children}</span> {text}
      </button>
    );
  };

  const goToProfile = useCallback(() => {
    history.push({ pathname: "/profile" });
  }, [history]);

  const goToFeed = useCallback(() => {
    history.push({ pathname: "/feed" });
  }, [history]);

  const goToMain = useCallback(() => {
    history.push({ pathname: "/" });
  }, [history]);
  return (
    <header className={`${styles.appHeader}`}>
      <nav className={styles.nav}>
          <ul className="">
            {constr == "active" ? (
              <li onClick={goToMain} data-btn="mainPage">
                <AppHeaderButton typeButton="active" text="Конструктор">
                  <BurgerIcon type="primary" />
                </AppHeaderButton>
              </li>
            ) : (
              <li onClick={goToMain} data-btn="mainPage">
                <AppHeaderButton typeButton="" text="Конструктор">
                  <BurgerIcon type="secondary" />
                </AppHeaderButton>
              </li>
            )}
            {lenta === "active" ? (
              <li onClick={goToFeed}>
                <AppHeaderButton typeButton="active" text="Лента заказов">
                  <ListIcon type="primary" />
                </AppHeaderButton>
              </li>
            ) : (
              <li onClick={goToFeed}>
                <AppHeaderButton typeButton="" text="Лента заказов">
                  <ListIcon type="secondary" />
                </AppHeaderButton>
              </li>
            )}
          </ul>
      </nav>

      <Logo />


        {profile === "active" ? (
          <AppHeaderButton typeButton="active" text="Личный кабинет">
            <ProfileIcon type="primary" />
          </AppHeaderButton>
        ) : (
          <span onClick={goToProfile}>
            <AppHeaderButton typeButton="" text="Личный кабинет">
              <ProfileIcon type="secondary" />
            </AppHeaderButton>
          </span>
        )}
    </header>
  );
}

export default AppHeader;
