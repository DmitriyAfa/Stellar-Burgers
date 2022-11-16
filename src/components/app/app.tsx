import React from 'react';
import { Outlet } from 'react-router-dom';

// Styles
import styles from "./App.module.scss";

export const App: React.FunctionComponent = React.memo(() =>{
  return(
    <div className={styles.app}>
      <Outlet />
    </div>
  )
})