import React, { useCallback } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingridients.module.css";
import { useDrag } from "react-dnd";
import { useHistory, useLocation, Link } from "react-router-dom";
import {IIngr, IIngredient} from '../../../utils/types/ingredient.types';
import { useActions } from "../../../utils/useAction";

export function MakeIngredient({ ingredient, count }: {ingredient: IIngredient, count: number}) {
  const history = useHistory();
  const location = useLocation();
  const {getIngredient} = useActions();

  // добавим новую запись с id ингредиента в стек истории и заставим пользователя перейти на этот маршрут, используя метод push
  const addHistory = useCallback(() => {
    history.push({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: location },
    });
  }, [history]);

  // Откроем модальное окно с деталями выбранного ингредиента (выбор осуществляется путем сравнения id в IngredientDetails)
  const openModalWithIngredient = () =>{
    getIngredient(ingredient);
    addHistory();
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  if(isDrag){
    return (null)
  }


  return (
    (
      <li ref={dragRef} onClick={openModalWithIngredient} className="ml-4 mr-6">
        {count > 0 && <Counter count={count} size="default" />}
        <img
          className={`mr-4 ml-4 ${styles.mainImg}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <span className="mt-1" style={{ flexDirection: "row" }}>
          <h3 className="text text_type_digits-default">{ingredient.price}</h3>{" "}
          <span style={{ marginLeft: "10px" }}>
            <CurrencyIcon type="primary" />
          </span>
        </span>
        <h4 className="mt-2 text text_type_main-default">{ingredient.name}</h4>
      </li>
    )
  );
}

function Ingredients({ head, ingredients }: {head: string, ingredients: IIngr[]}) {
  const arr = ingredients.map((ingredient) => {
    return (
      <MakeIngredient
        key={ingredient.ingredient._id}
        ingredient={ingredient.ingredient}
        count={ingredient.qty}
      />
    );
  });

  return (
    <div className={styles.main}>
      <h3 className="text text_type_main-medium mt-10">{head}</h3>
      <ul className="mt-6">{arr}</ul>
    </div>
  );
}

export default Ingredients;
