import React from "react";
import styles from "./ingridient-details.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";

function IngridientDetails({
  active,
  setActive,
  name,
  image,
  proteins,
  fat,
  carbohydrates,
  calories,
}) {
  return (
    <Modal active={active} setActive={setActive} header={"Детали ингредиента"}>
      <div className={`mb-15 ${styles.main}`}>
        <img src={image} alt={name} />
        <h4 className="mt-2 text text_type_main-medium">{name}</h4>
        <ul className="mt-8">
          <li className="">
            <p className="text text_type_main-default">Калории,ккал</p>{" "}
            <p className="text text_type_digits-default">{calories}</p>
          </li>
          <li className="ml-5">
            <p className="text text_type_main-default">Белки, г</p>{" "}
            <p className="text text_type_digits-default">{proteins}</p>
          </li>
          <li className="ml-5">
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default">{fat}</p>
          </li>
          <li className="ml-5">
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">{carbohydrates}</p>
          </li>
        </ul>
      </div>
    </Modal>
  );
}

IngridientDetails.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
};

export default IngridientDetails;
