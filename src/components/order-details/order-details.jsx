import React from "react";
import styles from "./order-details.module.css";
import Modal from "../modal/modal";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function OrderDetails(props) {
  const { number } = props;
  return (
    <div className={styles.orderDetails}>
      <p className={`${styles.head} mt-30 text text_type_digits-large`}>
        {number}
      </p>
      <p className="mt-8 text text_type_main-medium">Идентификатор заказа</p>
      <div className={`mt-15 ${styles.divIcon}`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="mt-8 text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.colorSecondary} mt-2 text text_type_main-default`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  number: PropTypes.number.isRequired,
};

export default OrderDetails;
