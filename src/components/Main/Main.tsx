import React from 'react';

// Styles
import styles from "./Main.module.scss";

export const Main: React.FunctionComponent = React.memo(() =>{
  return(
    <div className={styles.main}>
      Main
    </div>
  )
})