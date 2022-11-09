import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./profile.module.css";
import "../../styles/styles.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useActions } from "../../utils/useAction";
import { wsUrl } from "../../services/baseUrl";
function ProfilePage({children, text}: {children?: React.ReactNode, text: React.ReactNode | string}) {
  const {wsConnectionStart, wsConnectionStop} = useActions();
  const history = useHistory();
  const { logout } = useActions();

    
  useEffect(() => {
    wsConnectionStart(wsUrl);
  }, []);

  useEffect(() => {
    return () => {
      wsConnectionStop();
    }
  }, []);

  const logOut = async () => {
    const res: Function = await logout();
    if (res) {
      history.push("/login");
    }
  };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.left}>
          <Link
            to="/login"
            className={`${styles.link} ${styles.button} ${styles.linkActive}`}
          >
            Профиль
          </Link>
          <Button onClick={() => history.push("/profile/orders")} type="secondary" size="large">
                    История заказов
          </Button>
          <Button onClick={logOut} type="secondary" size="large">
            Выход
          </Button>
          <div className={`text ${styles.leftBottom} text_type_main-default`}>
            {text}
          </div>
        </div>
        {children}
      </main>
    </>
  );
}

export default ProfilePage;
