import React, { useEffect, useState } from "react";

// Redux
import { Total } from "./BurgerConstructor/Total";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IReduxStore } from "../../../services/types";
import { setCurrentComponent } from "../../../services/redux/slicers/adaptiveSlice";

// DnD
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// Components
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";

// styles
import styles from "./Main.module.scss";

export const Main: React.FunctionComponent = React.memo(() => {
  const dispatch = useDispatch();
  const { currentComponent } = useSelector(
    (store: IReduxStore) => store.adaptive,
    shallowEqual
  );

  useEffect(() => {
    if (window.innerWidth <= 930) {
      dispatch(setCurrentComponent("BurgerIngredients"));
    }
  }, []);
  return (
    <main className={styles.main}>
      <section className={styles.main__title}>
        <h1 className={styles["main__title-text"]}>Соберите бургер</h1>
      </section>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.main__container}>
          {window.innerWidth > 930 ? (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          ) : window.innerWidth <= 930 &&
            currentComponent === "BurgerIngredients" ? (
            <>
              <BurgerIngredients />
              <Total />
            </>
          ) : window.innerWidth <= 930 &&
            currentComponent === "BurgerConstructor" ? (
            <BurgerConstructor />
          ) : null}
        </section>
      </DndProvider>
    </main>
  );
});
