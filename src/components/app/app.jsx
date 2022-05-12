import React, { useEffect } from "react";
import styles from "./app.module.css";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const url = "https://norma.nomoreparties.space/api/ingredients ";

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, [dispatch]);
  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
