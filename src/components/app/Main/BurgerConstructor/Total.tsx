import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

// Redux
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { ingredientsIncreaseCounter } from "../../../../services/redux/slicers/appSlice";

import { submitOrderEnhance } from "../../../../services/redux/enhances";

// Ya imports
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// Types
import {
  ILocationType,
  IIngredientType,
  IReduxStore,
} from "../../../../services/types";

// Styles
import Styles from "./burgerConstructor.module.scss";
import { setCurrentComponent } from "../../../../services/redux/slicers/adaptiveSlice";
import Modal from "../../../Modals/Modal";
import OrderDetails from "../../../Modals/OrderDetails/OrderDetails";

export const Total = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as ILocationType;

  const { orderId, totalAmount, burger, request } = useSelector(
    (store: IReduxStore) => store.app.order,
    shallowEqual
  );
  const { accessToken } = useSelector(
    (store: IReduxStore) => store.user.data,
    shallowEqual
  );
  const { currentComponent } = useSelector(
    (store: IReduxStore) => store.adaptive,
    shallowEqual
  );

  const [openOrderDetails, setOpenOrderDetails] =
    React.useState<boolean>(false);

  const [orderDetails, setOrderDetails] = React.useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });

  React.useEffect(() => {
    if (!orderId || !burger.name) return;

    setOrderDetails({ id: orderId, name: burger.name });
  }, [orderId, burger.name, setOrderDetails]);

  const showOrderDetails: (e: any) => void = React.useCallback(() => {
    if (!accessToken)
      return navigate("/login", {
        state: { from: { pathname: location.pathname } },
      });

    const objForServer: { ingredients: string[] } = {
      ingredients: burger.ingredients.map(
        (activeIngredient: IIngredientType) => activeIngredient._id
      ),
    };

    dispatch(submitOrderEnhance(objForServer) as any).then(
      (response: Response) => {
        setOpenOrderDetails(true);
      }
    );
  }, [
    burger.ingredients,
    setOpenOrderDetails,
    dispatch,
    accessToken,
    location.pathname,
    navigate,
  ]);

  const closeOrderDetails: () => void = React.useCallback(() => {
    setOpenOrderDetails(false);

    if (currentComponent === "BurgerConstructor") {
      dispatch(setCurrentComponent("BurgerIngredients"));
    }
  }, [setOpenOrderDetails]);

  let buttonVariable =
    // Desktop
    burger.ingredients.filter(
      (activeIngredient: IIngredientType) => activeIngredient.type === "bun"
    ).length > 0 &&
    burger.ingredients.filter(
      (activeIngredient: IIngredientType) => activeIngredient.type === "main"
    ).length > 0 ? (
      <div className={Styles.total__button}>
        {/* @ts-expect-error */}
        <Button
          type="primary"
          size={window.innerWidth > 930 ? "medium" : "small"}
          onClick={
            currentComponent === "nonAdaptive" ||
            currentComponent === "BurgerConstructor"
              ? showOrderDetails
              : () => dispatch(setCurrentComponent("BurgerConstructor"))
          }
        >
          {(currentComponent === "nonAdaptive" ||
            currentComponent === "BurgerConstructor") &&
          request.pending ? (
            <>Оформляем заказ...</>
          ) : (currentComponent === "nonAdaptive" ||
              currentComponent === "BurgerConstructor") &&
            !request.pending ? (
            <>Оформить заказ</>
          ) : currentComponent === "BurgerIngredients" ? (
            <>Смотреть заказ</>
          ) : null}
        </Button>
      </div>
    ) : (
      <div
        className={Styles.total__button + " " + Styles.total__button_disabled}
      >
        {/* @ts-expect-error */}
        <Button
          type="primary"
          size={window.innerWidth > 930 ? "medium" : "small"}
        >
          {burger.ingredients.filter(
            (activeIngredient: IIngredientType) =>
              activeIngredient.type === "bun"
          ).length > 0
            ? "Осталось выбрать начинку 🥓"
            : burger.ingredients.filter(
                (activeIngredient: IIngredientType) =>
                  activeIngredient.type === "main"
              ).length > 0
            ? "Осталось выбрать булку 🥯"
            : "Выберите булку и начинку 🍔"}
        </Button>
      </div>
    );

  return (
    <>
      <div
        className={Styles.burgerConstructor__total}
        style={{ pointerEvents: request.pending ? "none" : "auto" }}
      >
        <div className={Styles.total__price}>
          <span>{totalAmount.toLocaleString()}</span>
          <div className={Styles.total__icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        {buttonVariable}
      </div>

      {openOrderDetails && (
        <Modal closeModalCallback={closeOrderDetails}>
          <OrderDetails {...orderDetails} />
        </Modal>
      )}
    </>
  );
});
