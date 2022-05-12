import React from "react";
import styles from "../burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNumber } from "../../../services/actions/burger-constructor";
import {
  GET_ID,
  GET_PRICE,
  OPEN_MODAL_OF_ORDER_DETAILS,
} from "../../../services/actions/burger-constructor";
function Order() {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state) => state.burgerIngredients.order.ingredients
  );

  const price = useSelector((state) => state.burgerIngredients.price);
  const getId = () => {
    dispatch({
      type: GET_ID,
    });
  };
  const openModal = () => {
    dispatch(getOrderNumber(ingredients));
    dispatch({
      type: OPEN_MODAL_OF_ORDER_DETAILS,
    });
  };

  return (
    <span className={`mt-10 ${styles.bottom}`}>
      <span className="mr-10">
        <p className="text text_type_digits-medium">{price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <span onClick={getId}>
        <span onClick={openModal} className={styles.bottomButton}>
          <Button type="primary" size="small">
            Оформить заказ
          </Button>
        </span>
      </span>
    </span>
  );
}

export default Order;
