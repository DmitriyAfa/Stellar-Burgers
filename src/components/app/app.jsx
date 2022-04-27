import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { IngridientsContext } from "../../context/ingridientsContext";

const url = "https://norma.nomoreparties.space/api/ingredients ";

function App() {
  const [ingridients, setIngridients] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => setIngridients(data.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <IngridientsContext.Provider value={{ ingridients, setIngridients }}>
      <AppHeader />
      <main className={styles.app}>
        {/* <BurgerIngridients ingridients={ingridients} /> */}
        <BurgerConstructor ingridients={ingridients} />
      </main>
    </IngridientsContext.Provider>
  );
}

export default App;
