import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ScrollBurgerConstructor from "./parts/scroll-burger-consctructor";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import ingridientPropTypes from "../../utils/constants";
import Modal from "../modal/modal";
// import { IngridientsContext } from "../../context/ingridientsContext";
import { PostBodyBurgerConstructor } from "../../context/totalPriceContext";
import { TotalPriceContext } from "../../context/totalPriceContext";
import { whiteBun } from "../../utils/whiteBun";
// whiteBun - имитация булки.
// Пока что не знаю как работает DnD в React. Я предполагаю что передав в BurgerConstructor булку с данными как в whiteBun
// на ее основе можно отрендерить верхние и нижние булки. Таким образом получится что всегда сможем добавлять булку только одного цвета.

const url = "https://norma.nomoreparties.space/api/orders";

function BurgerConstructor() {
  // const { ingridients } = useContext(IngridientsContext);

  const [modalActive, setModalActive] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [order, setOrder] = useState(false);

  const [postBodyBurgerConstructor, setPostBodyBurgerConstructor] = useState(
    PostBodyBurgerConstructor
  );

  function setModalActiveTrue() {
    setModalActive(true);
  }

  function setModalActiveFalse() {
    setModalActive(false);
  }

  const bodyPOST = {
    ingredients: ["60666c42cc7b410027a1a9bf", "60d3b41abdacab0026a733c8"],
  };

  // Пришлось использовать хардкод. При обращении к  url со всеми элементами из APi (с одной булкой в начале) выдает ошибку 400.
  // Похоже можно передавать n-е кол-во id или в каком-то порядке. postBodyBurgerConstructor - передает первым элементом булку, а остальные - это ингридиенты.
  // bodyPOST - передает булку и один инргидиент (id-шки). Нет дополнительных указаний насчет последовательности или кол-ва id для передачи. Может быть ошибка сервера. Не могу понять пока что.
  // По заданию нужно использовать данные ответа запроса из APP. Там 15 ингридиентов, 2 булки. Если передать одну булку и 14 ингридиентов, выдает ошибку.
  // Эксперементировал с возвращаемым кол-вом (методом reduce()) - тот же рузультат ошибка 400.

  function sendOrder() {
    setModalActiveTrue();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bodyPOST),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => setOrder(data.order.number))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    setTotalPrice(whiteBun.price * 2);
  }, [whiteBun, setTotalPrice]);

  return (
    <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
      <PostBodyBurgerConstructor.Provider
        value={{ postBodyBurgerConstructor, setPostBodyBurgerConstructor }}
      >
        <section className={styles.burgerConstructor}>
          <ul className="mt-25 ml-4">
            <li className="ml-8 mb-4">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${whiteBun.name} (верх) `}
                price={whiteBun.price}
                thumbnail={whiteBun.image}
              />
            </li>
            <li>
              <ScrollBurgerConstructor bunID={whiteBun._id} />
            </li>
            <li className="ml-8 mt-4">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${whiteBun.name} (низ) `}
                price={whiteBun.price}
                thumbnail={whiteBun.image}
              />
            </li>
          </ul>
          <span className={`mt-10 ${styles.bottom}`}>
            <span className="mr-10">
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </span>
            <span onClick={sendOrder} className={styles.bottomButton}>
              <Button type="primary" size="small">
                Оформить заказ
              </Button>
            </span>
          </span>
          {order ? (
            <Modal
              active={modalActive}
              setActive={setModalActiveFalse}
              header={false}
            >
              <OrderDetails number={order} />
            </Modal>
          ) : (
            false
          )}
        </section>
      </PostBodyBurgerConstructor.Provider>
    </TotalPriceContext.Provider>
  );
}

// BurgerConstructor.propTypes = {
//   ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired,
// };

export default BurgerConstructor;
