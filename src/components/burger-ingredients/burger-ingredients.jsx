import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingridients.module.css";
import Tabs from "./parts/tabs";
import Ingredients from "./parts/ingredients";
// redux
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { CLOSE_MODAL } from "../../services/actions/burger-ingredients";

function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.burgerIngredients);

  const buns =
    ingredients &&
    ingredients.filter((ingredient) => ingredient.ingredient.type === "bun");
  const sauce =
    ingredients &&
    ingredients.filter((ingredient) => ingredient.ingredient.type === "sauce");
  const main =
    ingredients &&
    ingredients.filter((ingredient) => ingredient.ingredient.type === "main");

  const currentIngredient = useSelector(
    (state) => state.burgerIngredients.currentIngredient
  );

  const onClose = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const [activeTab, setActiveTab] = useState("one");

  const scrollBarRef = useRef(null);

  const onScrollHandler = () => {
    const scrollbarPosition = scrollBarRef.current.scrollTop;
    const heightBuns = scrollBarRef.current.childNodes[0].clientHeight / 2 + 20;
    const heightSauce = scrollBarRef.current.childNodes[1].clientHeight;
    if (
      scrollbarPosition > heightBuns &&
      scrollbarPosition < heightSauce + heightBuns
    ) {
      setActiveTab("two");
    } else if (
      scrollbarPosition > heightBuns &&
      scrollbarPosition > heightSauce + heightBuns
    ) {
      setActiveTab("three");
    } else {
      setActiveTab("one");
    }
  };

  return (
    <section className={`mt-10 ${styles.burgerIngridients}`}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <Tabs activeTab={activeTab} />
      <div
        ref={scrollBarRef}
        onScroll={onScrollHandler}
        className={styles.scrollBar}
      >
        {ingredients && <Ingredients head="Булки" ingredients={buns} />}
        {ingredients && <Ingredients head="Соусы" ingredients={sauce} />}
        {ingredients && <Ingredients head="Начинки" ingredients={main} />}
      </div>
    </section>
  );
}

export default BurgerIngredients;
