import React from 'react';
import { Outlet } from 'react-router-dom';

// Styles
import styles from "./App.module.scss";

import { Header } from './Header/Header';
import { MobileHeader } from './Header/Mobile/MobileHeader';

export const App: React.FunctionComponent = React.memo(() =>{
  return(
    <div className={styles.app}>
      <MobileHeader />
      <Header />
      <Outlet />
    </div>
  )
})