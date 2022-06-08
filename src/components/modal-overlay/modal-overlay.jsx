import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <section
      onClick={closeModal}
      className={`${styles.modalOverlay} ${styles.active}`}
    ></section>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
