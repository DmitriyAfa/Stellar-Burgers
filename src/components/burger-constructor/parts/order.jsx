import { useHistory } from "react-router-dom";
import styles from "../burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNumber } from "../../../services/actions/burger-constructor";
import {
  GET_ID,
  OPEN_MODAL_OF_ORDER_DETAILS,
} from "../../../services/actions/burger-constructor";
function Order() {
  const dispatch = useDispatch();
  const history = useHistory();

  const ingredients = useSelector(
    (state) => state.burgerIngredients.order.ingredients
  );

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const price = useSelector((state) => state.burgerIngredients.price);

  const bunIshere = useSelector((state) => state.burgerIngredients.bun._id);

  const addOrder = () => {
    if (bunIshere && !user) {
      history.push("/login");
    } else {
      dispatch({
        type: GET_ID,
      });
      dispatch(getOrderNumber(ingredients));
      dispatch({
        type: OPEN_MODAL_OF_ORDER_DETAILS,
      });
    }
  };

  return (
    <span className={`mt-10 ${styles.bottom}`}>
      <span className="mr-10">
        <p className="text text_type_digits-medium">{price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <span>
        <span onClick={addOrder} className={styles.bottomButton}>
          <Button type="primary" size="small">
            Оформить заказ
          </Button>
        </span>
      </span>
    </span>
  );
}

export default Order;
