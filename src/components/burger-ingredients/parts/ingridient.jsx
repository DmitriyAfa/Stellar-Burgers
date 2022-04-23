import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingridients.module.css";
import IngridientDetails from "../../ingridient-details/ingridient-details";
import ingridientPropTypes from "../../../utils/constants";

function MakeIngridients({ ingridient }) {
  const [modalActive, setModalActive] = useState(false);

  function setModalActiveTrue() {
    setModalActive(true);
  }

  function setModalActiveFalse() {
    setModalActive(false);
  }

  return (
    <li className="ml-4 mr-6">
      <IngridientDetails
        active={modalActive}
        setActive={setModalActiveFalse}
        name={ingridient.name}
        image={ingridient.image}
        proteins={ingridient.proteins}
        fat={ingridient.fat}
        carbohydrates={ingridient.carbohydrates}
        calories={ingridient.calories}
      />
      <Counter count={1} size="default" />
      <img
        onClick={setModalActiveTrue}
        className={`mr-4 ml-4 ${styles.mainImg}`}
        src={ingridient.image}
        alt={ingridient.name}
      />
      <span className="mt-1" style={{ flexDirection: "row" }}>
        <h3 className="text text_type_digits-default">{ingridient.price}</h3>{" "}
        <span style={{ marginLeft: "10px" }}>
          <CurrencyIcon type="primary" />
        </span>
      </span>
      <h4 className="mt-2 text text_type_main-default">{ingridient.name}</h4>
    </li>
  );
}

MakeIngridients.propTypes = {
  ingridient: ingridientPropTypes.isRequired,
};

function Ingridient({ head, ingridients }) {
  const arr = ingridients.map((ingridients) => {
    return <MakeIngridients key={ingridients._id} ingridient={ingridients} />;
  });

  return (
    <div className={styles.main}>
      <h3 className="text text_type_main-medium mt-10">{head}</h3>
      <ul className="mt-6">{arr}</ul>
    </div>
  );
}

Ingridient.propTypes = {
  head: PropTypes.string.isRequired,
  ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired,
};

export default Ingridient;
