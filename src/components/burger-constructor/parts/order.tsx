import { useHistory } from "react-router-dom";
import styles from "../burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useActions } from "../../../utils/useAction";
import { TStateBurgerIngredients } from "../../../services/reducers/burger-ingredients";
import { TUserState } from "../../../services/reducers/user";
import { TStore } from "../../../utils/types/types";
import { useTypedSelector } from "../../../utils/useTypedSelector";

function Order() {
  const history = useHistory();
  const {ingredients} = useTypedSelector(
    (state) => state.burgerIngredients.order
  );
  const isLoggedIn = useTypedSelector(
    (state: {user: TUserState}) => state.user.isLoggedIn
  );
  const price = useTypedSelector((state: {burgerIngredients: TStateBurgerIngredients}) => state.burgerIngredients.price);
  const bunIshere = useTypedSelector((state: {burgerIngredients: TStateBurgerIngredients}) => state.burgerIngredients.bun._id);
  const { getId, openModalOfOrderDetails, getOrderNumber } = useActions();

  //Получаем идентификатор заказа
  const addOrder = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // isLoggedIn проверяется в App getUser()
    if (!isLoggedIn) {
      history.push("/login");
      return null;
    }
    if (isLoggedIn && bunIshere) {
      getId();
      getOrderNumber(ingredients);
      openModalOfOrderDetails();
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
