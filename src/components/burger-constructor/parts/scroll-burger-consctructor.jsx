import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import ingridientPropTypes from "../../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  DELETE_INGREDIENT_ACTION,
  GET_ID,
  SORT_CARD,
  GET_PRICE,
} from "../../../services/actions/burger-constructor";
import {
  INCREASE,
  DECREASE,
} from "../../../services/actions/burger-ingredients";
import { v4 as uuidv4 } from "uuid";

function MakeDetail({ ingredient, id, moveCard, index }) {
  const dispatch = useDispatch();
  // console.log(ingredient);

  const deleteIngredient = () => {
    dispatch({
      type: DECREASE,
      payload: ingredient._id,
    });
    dispatch({
      type: DELETE_INGREDIENT,
      payload: ingredient._id,
    });
    dispatch({
      type: DELETE_INGREDIENT_ACTION,
    });
    dispatch({
      type: GET_ID,
    });
    dispatch({
      type: GET_PRICE,
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "card",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.id;

      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingReact = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2; // координата середины карточки

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingReact.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.id = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li ref={ref} style={{ opacity: opacity }} className="ml-4 mr-6 mb-4">
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteIngredient}
      />
    </li>
  );
}

MakeDetail.propTypes = {
  ingredient: ingridientPropTypes.isRequired,
  id: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

function ScrollBurgerConstructor() {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state) => state.burgerIngredients.constructorIngredients
  );

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      if (ingredient.ingredient.type !== "bun") {
        dispatch({
          type: ADD_INGREDIENT,
          ...ingredient,
          payload: uuidv4(),
        });
        dispatch({
          type: INCREASE,
          payload: ingredient.ingredient._id,
        });
        dispatch({
          type: GET_PRICE,
        });
        console.log(ingredient);
      }
    },
  });

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];

    const newCards = [...ingredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    console.log(newCards);
    dispatch({
      type: SORT_CARD,
      payload: newCards,
    });
  };

  return (
    <ul ref={drop} className={styles.scrollBar}>
      {ingredients &&
        ingredients.map((ingredient, i) => (
          <MakeDetail
            key={ingredient.id}
            ingredient={ingredient.ingr}
            id={i}
            index={i}
            moveCard={moveCard}
          />
        ))}
    </ul>
  );
}

export default ScrollBurgerConstructor;
