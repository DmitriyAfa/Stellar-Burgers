import {  useRef, useState } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingridients.module.css";
import Tabs from "./parts/tabs";
import Ingredients from "./parts/ingredients";
import {IIngredient, IIngr} from '../../utils/types/ingredient.types';
import { useTypedSelector } from "../../utils/useTypedSelector";
import { TStore } from "../../utils/types/types";

function BurgerIngredients() {


  const {ingredients} = useTypedSelector((state) => state.burgerIngredients);
  // Поменял условие первого аргумента ingredients на ingredients.length > 0
  const buns =
    ingredients.length > 0 &&
    ingredients.filter((ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient.type === "bun");
  const sauce =
    ingredients.length > 0 &&
    ingredients.filter((ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient.type === "sauce");
  const main =
    ingredients.length > 0 &&
    ingredients.filter((ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient.type === "main");

  const [activeTab, setActiveTab] = useState("one");

 // не позволяет типизировать как HTMLDivElement, начинает ругаться на  clientHeight даже с использлованием !перед точками (scrollBarRef!.current!.childNodes[1]!.clientHeight)
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

  if(!buns || !sauce || !main){
    return null;
  }

  return (
    <section className={`mt-10 ${styles.burgerIngridients}`}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <Tabs activeTab={activeTab} />
      <div
        ref={scrollBarRef}
        onScroll={onScrollHandler}
        className={styles.scrollBar}
      >
        {ingredients.length > 0 && <Ingredients head="Булки" ingredients={buns} />}
        {ingredients.length > 0 && <Ingredients head="Соусы" ingredients={sauce} />}
        {ingredients.length > 0 && <Ingredients head="Начинки" ingredients={main} />}
      </div>
    </section>
  );
}

export default BurgerIngredients;
