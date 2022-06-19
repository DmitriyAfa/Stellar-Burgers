import {  useRef, useState } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingridients.module.css";
import Tabs from "./parts/tabs";
import Ingredients from "./parts/ingredients";
// redux
import { useSelector } from "react-redux";
import {IIngredient} from '../../utils/types/ingredient.types';

function BurgerIngredients() {

  const { ingredients } = useSelector((state: any) => state.burgerIngredients);

  const buns =
    ingredients &&
    ingredients.filter((ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient.type === "bun");
  const sauce =
    ingredients &&
    ingredients.filter((ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient.type === "sauce");
  const main =
    ingredients &&
    ingredients.filter((ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient.type === "main");

  const [activeTab, setActiveTab] = useState("one");

  const scrollBarRef = useRef<any>(null);

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
