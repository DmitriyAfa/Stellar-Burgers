import React from "react";

// Route
import { useNavigate } from "react-router-dom";

// DnD
import { useDrop } from "react-dnd";

// Redux
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { ingredientsIncreaseCounter } from "../../../../services/redux/slicers/appSlice";

// Components
import DraggableConstructorElement from "./DraggableConstructorElement";
import { Total } from "./Total";

// Types
import {
  ILocationType,
  IIngredientType,
  IReduxStore,
} from "../../../../services/types";

// Styles
import Styles from "./burgerConstructor.module.scss";

const BurgerConstructor: React.FunctionComponent = React.memo(() => {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (store: IReduxStore) => store.app.ingredients,
    shallowEqual
  );
  const { burger } = useSelector(
    (store: IReduxStore) => store.app.order,
    shallowEqual
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: { id: string }) {
      handleIncreaseCounter(item.id);
    },
  });

  const handleIncreaseCounter = React.useCallback(
    (ingredientId: string) => {
      const selectedIngredient: IIngredientType = ingredients.data
        .filter(
          (ingredient: IIngredientType) => ingredient._id === ingredientId
        )
        .shift()!;

      dispatch(ingredientsIncreaseCounter(selectedIngredient));
    },
    [ingredients.data, dispatch]
  );

  return (
    <>
      <div className={Styles.burgerConstructor} ref={dropTarget}>
        <ul className={Styles.burgerConstructor__header}>
          {burger.ingredients
            .filter(
              (activeIngredient: IIngredientType) =>
                activeIngredient.type === "bun"
            )
            .map(
              (
                activeIngredient: IIngredientType,
                activeIngredient__index: number
              ) => {
                return (
                  <DraggableConstructorElement
                    key={activeIngredient.uuid}
                    className={Styles.header__item}
                    ingredient={activeIngredient}
                    ingredientIndex={activeIngredient__index}
                    type="top"
                  />
                );
              }
            )}
        </ul>

        <ul className={Styles.burgerConstructor__main}>
          {burger.ingredients
            .filter(
              (activeIngredient: IIngredientType) =>
                activeIngredient.type !== "bun"
            )
            .map(
              (
                activeIngredient: IIngredientType,
                activeIngredient__index: number
              ) => {
                return (
                  <DraggableConstructorElement
                    key={activeIngredient.uuid}
                    className={Styles.main__item}
                    ingredient={activeIngredient}
                    ingredientIndex={activeIngredient__index}
                  />
                );
              }
            )}
        </ul>

        <ul className={Styles.burgerConstructor__footer}>
          {burger.ingredients
            .filter(
              (activeIngredient: IIngredientType) =>
                activeIngredient.type === "bun"
            )
            .map(
              (
                activeIngredient: IIngredientType,
                activeIngredient__index: number
              ) => {
                return (
                  <DraggableConstructorElement
                    key={activeIngredient.uuid}
                    className={Styles.footer__item}
                    ingredient={activeIngredient}
                    ingredientIndex={activeIngredient__index}
                    type="bottom"
                  />
                );
              }
            )}
        </ul>

        <Total />
      </div>
    </>
  );
});

export default BurgerConstructor;
