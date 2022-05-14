import React from "react";
import { useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import Buns from "./parts/buns";
import Order from "./parts/order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector } from "react-redux";

import {
  closeModalOfOrderDetails,
  clearOrderDetails,
} from "../../services/actions/actions-creator";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const modalIsActive = useSelector(
    (state) => state.burgerIngredients.orderDetailsIsActive
  );

  const ingrs = useSelector((state) => state.burgerIngredients.ingredients);

  const onClose = () => {
    dispatch(closeModalOfOrderDetails());
    dispatch(clearOrderDetails());
  };
  return (
    <>
      <section className={styles.burgerConstructor}>
        <Buns />
        <Order />
      </section>
      {modalIsActive && (
        <Modal header={false} onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
