import React from "react";

// Ya imports
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Components
import Modal from "./../Modal";

// Helpers
import getRandomInt from "./../../../services/utils/helpers/getRandomInt";

// Styles
import Styles from "./orderDetails.module.scss";
import { Logo } from "./Logo";

interface IOfferInfoComponent {
  id: number;
  name: string;
}

const OfferInfo: React.FunctionComponent<IOfferInfoComponent> = React.memo(
  ({ id, name }) => {
    return (
      <div className={Styles.offerDetails}>
        <div className={Styles.offerDetails__id}>
          <span className={Styles.id__title}>{id}</span>
          <span className={Styles.id__subtitle}>{name}</span>
        </div>
        <div className={Styles.offerDetails__info}>
          <div className={Styles.info__icon}>
            <Logo />
          </div>
          <div className={Styles.info__message}>
            <span className={Styles.message__title}>
              Ваш заказ начали готовить
            </span>
            <span className={Styles.message__subtitle}>
              Дождитесь готовности на орбитальной станции
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default OfferInfo;
