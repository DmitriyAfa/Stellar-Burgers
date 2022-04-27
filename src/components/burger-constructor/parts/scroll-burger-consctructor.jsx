import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import ingridientPropTypes from "../../../utils/constants";
import { IngridientsContext } from "../../../context/ingridientsContext";
import { TotalPriceContext } from "../../../context/totalPriceContext";
import { PostBodyBurgerConstructor } from "../../../context/totalPriceContext";

function MakeDetail({ ingridient }) {
  return (
    <li className="ml-4 mr-6 mb-4">
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image}
      />
    </li>
  );
}

MakeDetail.propTypes = {
  ingridient: ingridientPropTypes.isRequired,
};

function ScrollBurgerConstructor(props) {
  const { ingridients } = useContext(IngridientsContext);
  const ingridientsWithoutBun = [];

  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  const { postBodyBurgerConstructor, setPostBodyBurgerConstructor } =
    useContext(PostBodyBurgerConstructor);

  ingridients.map((ingridient) => {
    if (ingridient.type !== "bun") {
      return ingridientsWithoutBun.push(ingridient);
    }
  });

  useEffect(() => {
    let total = 0;
    let ids = [];
    ingridients.map((item) => {
      if (item.type !== "bun") {
        total += item.price;
        ids.push(item._id);
      }
    });
    ids.unshift(props.bunID);
    setPostBodyBurgerConstructor({ ingridients: ids });
    setTotalPrice(totalPrice + total);
  }, [ingridients, setTotalPrice]);

  const arr = ingridientsWithoutBun.map((ingridientsWithoutBun) => {
    return (
      <MakeDetail
        key={ingridientsWithoutBun._id}
        ingridient={ingridientsWithoutBun}
      />
    );
  });

  return <ul className={styles.scrollBar}>{arr}</ul>;
}

// Detail.propTypes = {
//   ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired,
// };

export default ScrollBurgerConstructor;
