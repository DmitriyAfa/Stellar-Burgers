import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../../services/auth";
import { Redirect, useLocation } from "react-router-dom";
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

  let auth = useAuth();

  const [isAuth, setIsAuth] = useState(true);

  const ingredients = useSelector(
    (state) => state.burgerIngredients.order.ingredients
  );

  const price = useSelector((state) => state.burgerIngredients.price);

  const bunIshere = useSelector((state) => state.burgerIngredients.bun._id);

  // const req = async () => {
  //   const data = await auth.getUser().then(async (res) => res);
  //   console.log(data);
  //   if (data === undefined) {
  //     setIsAuth(false);
  //   }
  // };

  // useEffect(() => {
  //   req();
  // }, []);

  const getId = () => {
    if (bunIshere) {
      dispatch({
        type: GET_ID,
      });
    }
  };
  const openModal = async () => {
    const request = await auth.getUser().then(async (res) => {
      console.log(res);
      if (res !== undefined) {
        if (bunIshere) {
          dispatch(getOrderNumber(ingredients));
          dispatch({
            type: OPEN_MODAL_OF_ORDER_DETAILS,
          });
        }
      } else {
        setIsAuth(false);
      }
    });
    // console.log(request);
    // if (bunIshere && isAuth) {
    //   dispatch(getOrderNumber(ingredients));
    //   dispatch({
    //     type: OPEN_MODAL_OF_ORDER_DETAILS,
    //   });
    // }
  };

  if (isAuth === false) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        // to={{ pathname: state?.from || "/" }}
        to={{ pathname: "/login" }}
      />
    );
  }

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
