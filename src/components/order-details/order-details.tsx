import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TStateBurgerIngredients } from "../../services/reducers/burger-ingredients";
import { useTypedSelector } from "../../utils/useTypedSelector";

function OrderDetails() {
  const number = useTypedSelector((state) => state.burgerIngredients.order.number);
  return (
    <>
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
    </>
  );
}

export default OrderDetails;
