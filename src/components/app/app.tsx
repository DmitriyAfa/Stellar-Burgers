import React, { useEffect, useState } from "react";

//Router
import { Outlet } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import {
  getIngredientsEnhance,
  reLoginEnhance,
} from "../../services/redux/enhances";

// Styles
import styles from "./App.module.scss";

// Components
import { Header } from "./Header/Header";
import { MobileHeader } from "./Header/Mobile/MobileHeader";

const App: React.FunctionComponent = React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsEnhance() as any);
    dispatch(reLoginEnhance() as any);
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {window.innerWidth > 560 ? <Header /> : <MobileHeader />}
      <Outlet />
    </div>
  );
});

export default App;
