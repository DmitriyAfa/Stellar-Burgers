import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Styles
import styles from "./App.module.scss";

import { Header } from "./Header/Header";
import { MobileHeader } from "./Header/Mobile/MobileHeader";

export const App: React.FunctionComponent = React.memo(() => {
  const [isMobile, setIsMobile] = useState<undefined | boolean>();

  const setAdaptive = (): void => {
    if (window.innerWidth <= 560) {
      setIsMobile(true);
    }
    if (window.innerWidth > 560) {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 560) {
      setIsMobile(true);
    }
    if (window.innerWidth > 560) {
      setIsMobile(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setAdaptive);
  }, [window.innerWidth]);

  return (
    <div className={styles.app}>
      {isMobile === false ? (
        <Header />
      ) : isMobile === true ? (
        <MobileHeader />
      ) : null}
      <Outlet />
    </div>
  );
});
