import { useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import PropTypes from "prop-types";
function AppHeader({ constructor, lenta, profile }) {
  const history = useHistory();

  const AppHeaderButton = ({ typeButton, children, text }) => {
    let typeOfButton = typeButton === "active" ? "" : styles.inactive;

    return (
      <button
        className={`${styles.button} text text_type_main-default mt-4 mb-4 pl-5 pr-5 pb-4 pt-4 ${typeOfButton}`}
      >
        <span className="mr-2">{children}</span> {text}
      </button>
    );
  };

  AppHeaderButton.propTypes = {
    typeButton: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
  };

  const goToProfile = useCallback(() => {
    history.replace({ pathname: "/profile" });
  }, [history]);
  return (
    <header className={`${styles.appHeader}`}>
      <nav className={styles.nav}>
        <form>
          <ul className="">
            {constructor == "active" ? (
              <li>
                <AppHeaderButton typeButton="active" text="Конструктор">
                  <BurgerIcon type="primary" />
                </AppHeaderButton>
              </li>
            ) : (
              <li>
                <AppHeaderButton typeButton="" text="Конструктор">
                  <BurgerIcon type="secondary" />
                </AppHeaderButton>
              </li>
            )}
            {lenta === "active" ? (
              <li>
                <AppHeaderButton typeButton="active" text="Лента заказов">
                  <ListIcon type="primary" />
                </AppHeaderButton>
              </li>
            ) : (
              <li>
                <AppHeaderButton typeButton="" text="Лента заказов">
                  <ListIcon type="secondary" />
                </AppHeaderButton>
              </li>
            )}
          </ul>
        </form>
      </nav>

      <Logo />

      <form>
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
      </form>
    </header>
  );
}
// AppHeader.defaultProps = { constructor: "", lenta: "", profile: "" };
AppHeader.propTypes = {
  constructor: PropTypes.string.isRequired,
  lenta: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};
export default AppHeader;
