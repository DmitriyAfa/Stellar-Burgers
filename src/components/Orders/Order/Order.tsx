import React, { useEffect, useState } from "react";

//Router

// Redux
import { useSelector } from "react-redux";
import { IReduxStore } from "../../../services/types";

// Styles
import styles from "./Order.module.scss";

// Components
import { IOrder } from "../../../services/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Helpers
import { getDate } from "../../../services/utils/helpers/getData";
import { getStatus } from "../../../services/utils/helpers/getStatus";
// Types
interface IntOrder {
  order: IOrder;
}

const OrderNotMemoized = ({ order }: IntOrder) => {
  const ingredients = useSelector(
    (state: IReduxStore) => state.app.ingredients.data
  );

  // Получим картинки путем сравнения id ингредиентов из ордера с id ингредиентов из состояния burgerIngredients
  const getImages = (id: string): string | undefined => {
    let ingredient = ingredients.find((i: any) => i._id === id);
    if (ingredient) {
      return ingredient.image;
    }
  };

  // Вычислим цену
  const price = React.useMemo((): number => {
    let allPrice = 0;

    if (ingredients.length === 0) {
      return 0;
    }

    order.ingredients.forEach((id: string) => {
      let price: number;

      if (ingredients && ingredients.length > 0) {
        const ingredient = ingredients.find((i: any) => i._id === id);

        price = ingredient !== undefined ? ingredient.price : 0;

        if (price) {
          allPrice += price;
        }
      }
    });

    return allPrice;
  }, [ingredients]);

  let isOrderPage = true; //!!!!

  return (
    <div
      key={order._id}
      className={`p-6 mr-2 mb-4 ${styles.card}`}
      // onClick={onClickOrder}
    >
      <div className={`${styles.top} mb-6`}>
        <div className={`${styles.number} 'text text_type_digits-default`}>
          {`#${order.number}`}
        </div>
        <div className={`${styles.date} 'text text_color_inactive`}>
          {getDate(order.createdAt)}
        </div>
      </div>
      <div
        className={`${styles.feedItemName} text ${
          window.innerWidth > 560
            ? "text_type_main-medium"
            : "text_type_main-default"
        } ${isOrderPage ? "mb-2" : "mb-6"}`}
      >
        {order.name}
      </div>
      {isOrderPage ? (
        <p
          className={`text text_type_main-default mb-6 ${styles.status} ${
            order.status === "done" ? styles.done : ""
          }`}
        >
          {getStatus(order.status)}
        </p>
      ) : null}

      <div className={styles.bottom}>
        <div className={`${styles.ingredients} pr-6`}>
          {order.ingredients &&
            order.ingredients.map((ingredient: string, index: number) =>
              index <= 5 ? (
                <div
                  className={styles.ingredient}
                  key={`ingredients${ingredient}_${index}`}
                >
                  <img src={getImages(ingredient)} alt="" />
                  {order.ingredients.length > 6 && index === 5 ? (
                    <div
                      className={`${
                        styles.count
                      } 'text text_type_digits-default ${
                        window.innerWidth > 560
                          ? "text_type_main-medium"
                          : "text_type_main-default"
                      }`}
                    >
                      +{order.ingredients.length - 6}
                    </div>
                  ) : null}
                </div>
              ) : null
            )}
        </div>
        <div className={styles.price}>
          {ingredients ? (
            <span
              className={`text ${
                window.innerWidth > 560
                  ? "text_type_main-medium"
                  : "text_type_main-default"
              }`}
            >
              {price}
            </span>
          ) : null}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export const Order = React.memo(OrderNotMemoized);
