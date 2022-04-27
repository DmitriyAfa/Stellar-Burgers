import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ closeModal, active }) {
  return (
    <section
      onClick={closeModal}
      className={`${styles.modalOverlay} ${active ? styles.active : ""}`}
    ></section>
  );
}

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
