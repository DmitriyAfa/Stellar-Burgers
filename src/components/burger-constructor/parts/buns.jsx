import React from "react";
import ScrollBurgerConstructor from "./scroll-burger-consctructor";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { INCREASE } from "../../../services/actions/burger-ingredients";
import {
  ADD_BUN,
  MAKE_BUN_QTY_ZERO,
  GET_BUN_ID,
} from "../../../services/actions/burger-constructor";
import {
  GET_ID,
  GET_PRICE,
} from "../../../services/actions/burger-constructor";

function Buns() {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.burgerIngredients.bun);

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      if (ingredient.ingredient.type === "bun") {
        dispatch({
          type: ADD_BUN,
          ...ingredient,
        });
        dispatch({
          type: MAKE_BUN_QTY_ZERO,
        });
        dispatch({
          type: INCREASE,
          payload: ingredient.ingredient._id,
        });
        dispatch({
          type: INCREASE,
          payload: ingredient.ingredient._id,
        });
        dispatch({
          type: GET_BUN_ID,
        });
        dispatch({
          type: GET_ID,
        });
        dispatch({
          type: GET_PRICE,
        });
      }
    },
  });
  return (
    <ul ref={drop} className="mt-25 ml-4">
      <li className="ml-8 mb-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх) `}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
      <li>
        <ScrollBurgerConstructor />
      </li>
      <li className="ml-8 mt-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ) `}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
    </ul>
  );
}

export default Buns;
