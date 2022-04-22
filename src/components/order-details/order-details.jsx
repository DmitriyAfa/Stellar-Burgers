import React from "react";
import './order-details.scss';
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function OrderDetails({active, setActive}){

  return(
    <>
    <Modal active={active} setActive={setActive} header={false}>
        <div className="order-details">
          <p className="order-details__head mt-30 text text_type_digits-large">034536</p>
          <p className="mt-8 text text_type_main-medium">Идентификатор заказа</p>
          <div className="order-details__icon mt-15">
          <CheckMarkIcon type="primary" />
          </div>
          <p className="mt-8 text text_type_main-default mt-15">Ваш заказ начали готовить</p>
          <p className="order-details__bottom mt-2 text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
        </div>
      </Modal>
    </>
  );
}

OrderDetails.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}

export default OrderDetails;