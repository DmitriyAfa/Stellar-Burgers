import React from "react";

// Router
import { Routes, Route, Link, useLocation } from "react-router-dom";

// Components
import { OrdersPage } from "../../pages/Profile1/Orders1";
import { Edit1 } from "../../pages/Profile1/Edit1";
import { Logout1 } from "../../pages/Profile1/Logout1";

// Styles
import Styles from "./profileContent.module.scss";

const ProfileContent: React.FunctionComponent = React.memo(() => {
  const location = useLocation();

  return (
    <section className={Styles.profileContent}>
      {window.innerWidth > 560 ? (
        <div className={Styles.profileContent__menu}>
          <ul className={Styles.menu__items}>
            <li className={Styles.items__item}>
              <Link
                to="/profile"
                className={
                  Styles.item__link +
                  " " +
                  (location.pathname === "/profile"
                    ? Styles.item__link_active
                    : "")
                }
              >
                Профиль
              </Link>
            </li>
            <li className={Styles.items__item}>
              <Link
                to="/profile/orders"
                className={
                  Styles.item__link +
                  " " +
                  (location.pathname === "/profile/orders"
                    ? Styles.item__link_active
                    : "")
                }
              >
                История заказов
              </Link>
            </li>
            <li className={Styles.items__item}>
              <Link to="/profile/logout" className={Styles.item__link}>
                Выход
              </Link>
            </li>
          </ul>
          <div className={Styles.menu__hint}>
            {location.pathname === "/profile" && (
              <span>
                В этом разделе вы можете
                <br />
                изменить свои персональные данные
              </span>
            )}
            {location.pathname === "/profile/orders" && (
              <span>
                В этом разделе вы можете
                <br />
                просмотреть свою историю заказов
              </span>
            )}
          </div>
        </div>
      ) : null}
      <div
        className={
          Styles.profileContent__content +
          " " +
          (location.pathname === "/profile/orders"
            ? Styles.profileContent__content_big
            : "")
        }
      >
        <Routes>
          <Route path="/" element={<Edit1 />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="logout" element={<Logout1 />} />
        </Routes>
      </div>
    </section>
  );
});

export default ProfileContent;
