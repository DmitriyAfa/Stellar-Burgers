import React, { useCallback } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingridients.module.css";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { GET_INGREDIENT } from "../../../services/actions/burger-ingredients";
import { useHistory, useLocation, Link } from "react-router-dom";
import {IIngredient} from '../../../utils/types/ingredient.types';

export function MakeIngredient({ ingredient, count }: {ingredient: IIngredient, count: number}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const addHistory = useCallback(() => {
    history.push({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: location },
    });
  }, [history]);

  const getIngredient = () => {
    dispatch({
      type: GET_INGREDIENT,
      payload: ingredient,
    });
    addHistory();
  };

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
      <li ref={dragRef} onClick={getIngredient} className="ml-4 mr-6">
        {/* <Link
          className={styles.burgerItemlink}
          to={{
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: location },
          }}
        > */}
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
        {/* </Link> */}
      </li>
    )
  );
}

function Ingredients({ head, ingredients }: {head: string, ingredients: Array<{qty: number, ingredient:IIngredient}>}) {
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
