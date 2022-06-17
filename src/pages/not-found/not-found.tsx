import React, { useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import styles from "./not-found.module.css";

export function NotFound404() {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    history.replace({ pathname: "/404" });
  }, [history, pathname]);

  return (
    <>
      <AppHeader constr="" lenta="" profile="" />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* <Breadcrumbs /> */}
          <div className={styles.content}>
            <h1>Oops! 404 Error</h1>
            <p>The page you requested does not exist</p>
            <br />
            <br />
            <p>
              check the address or try{" "}
              <Link to="/" className={styles.link}>
                homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
