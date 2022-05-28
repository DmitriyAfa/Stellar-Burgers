import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingridients.module.css";
import ingridientPropTypes from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { GET_INGREDIENT } from "../../../services/actions/burger-ingredients";
import { useParams, useHistory } from "react-router-dom";

export function MakeIngredient({ ingredient, count }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToForgotPassword = useCallback(() => {
    history.push({ pathname: `/ingredients/:${ingredient._id}` });
  }, [history]);

  const getIngredient = () => {
    dispatch({
      type: GET_INGREDIENT,
      payload: ingredient,
    });
    goToForgotPassword();
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <li ref={dragRef} onClick={getIngredient} className="ml-4 mr-6">
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

MakeIngredient.propTypes = {
  ingredient: ingridientPropTypes.isRequired,
  count: PropTypes.number.isRequired,
};

function Ingredients({ head, ingredients }) {
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

Ingredients.propTypes = {
  head: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Ingredients;
