import {  useRef } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { IMakeDetail } from "../types";
import {IIngredient, IIngr} from '../../../utils/types/ingredient.types'
import { useActions } from "../../../utils/useAction";
import { TStateBurgerIngredients } from "../../../services/reducers/burger-ingredients";
import { useTypedSelector } from "../../../utils/useTypedSelector";

function MakeDetail({ ingredient, id, moveCard, index }: IMakeDetail) {
  const {decrease, deleteIngredient, deleteIngredientAction, getId, getPrice} = useActions();

  const deleteIngredientFunc = () => {
    decrease(ingredient._id);
    deleteIngredient(ingredient._id);
    deleteIngredientAction();
    getId();
    getPrice();
  };

  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: "card",
    // !!!
    hover: (item: {id: number}, monitor) => {
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

      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingReact.top;

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
        handleClose={deleteIngredientFunc}
      />
    </li>
  );
}

function ScrollBurgerConstructor() {

  const ingredients = useTypedSelector(
    (state) => state.burgerIngredients.constructorIngredients
  );
 const {increase,  addIngredient,  getPrice, sortCard} = useActions();
  const [, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngr) {
      if (ingredient.ingredient.type !== "bun") {
        addIngredient(ingredient, uuidv4());
        increase(ingredient.ingredient._id);
        getPrice()
      }
    },
  });

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = ingredients[dragIndex];

    const newCards = [...ingredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    sortCard(newCards);
  };

  return (
    <ul ref={drop} className={styles.scrollBar} data-cypress="constructor">
      {ingredients &&
        ingredients.map((ingredient:{id: number, ingr: IIngredient}, i: number) => (
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
