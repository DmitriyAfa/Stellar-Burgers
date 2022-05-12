import React from "react";
import styles from "./burger-constructor.module.css";
import Buns from "./parts/buns";
import Order from "./parts/order";
import OrderDetails from "../order-details/order-details";
import { useSelector } from "react-redux";

function BurgerConstructor() {
  const modalIsActive = useSelector(
    (state) => state.burgerIngredients.orderDetailsIsActive
  );
  return (
    <>
      <section className={styles.burgerConstructor}>
        <Buns />
        <Order />
      </section>
      {modalIsActive && <OrderDetails />}
    </>
  );
}

export default BurgerConstructor;
