import React from "react";

// styles
import styles from "./Main.module.scss";

export const Main: React.FunctionComponent = React.memo(() => {
  return (
    <main className={styles.main}>
      <section className={styles.main__title}>
        <h1 className={styles["title-text"]}>Соберите бургер</h1>
      </section>
      <section className={styles.main__container}>
        <h2>Content</h2>
      </section>
    </main>
  );
});
