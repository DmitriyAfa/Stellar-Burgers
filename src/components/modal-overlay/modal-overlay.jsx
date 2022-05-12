import React from "react";
import styles from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/burger-ingredients";
import { CLOSE_MODAL_OF_ORDER_DETAILS } from "../../services/actions/burger-constructor";

function ModalOverlay() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    dispatch({
      type: CLOSE_MODAL_OF_ORDER_DETAILS,
    });
  };

  return (
    <section
      onClick={closeModal}
      className={`${styles.modalOverlay} ${styles.active}`}
    ></section>
  );
}

export default ModalOverlay;
