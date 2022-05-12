import React, { useEffect } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingridients.module.css";
import Tabs from "./parts/tabs";
import Ingredients from "./parts/ingredients";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const buns = ingredients.filter(
    (ingredient) => ingredient.ingredient.type === "bun"
  );
  const sauce = ingredients.filter(
    (ingredient) => ingredient.ingredient.type === "sauce"
  );
  const main = ingredients.filter(
    (ingredient) => ingredient.ingredient.type === "main"
  );

  const modalIsActive = useSelector(
    (state) => state.burgerIngredients.currentIngredient
  );

  return (
    <section className={`mt-10 ${styles.burgerIngridients}`}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <Tabs />
      <div className={styles.scrollBar}>
        <Ingredients head="Булки" ingredients={buns} />
        <Ingredients head="Соусы" ingredients={sauce} />
        <Ingredients head="Ингредиенты" ingredients={main} />
      </div>
      {modalIsActive && <IngredientDetails />}
    </section>
  );
}

export default BurgerIngredients;
