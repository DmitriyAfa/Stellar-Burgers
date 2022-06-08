import React, { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  const closeModal = () => {
    onClose();
  };
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return ReactDOM.createPortal(
    <>
      <section className={`${styles.modal} ${styles.active}`}>
        <div className={styles.content}>
          <div className={`mt-10 mr-10 ml-10 ${styles.header}`}>
            <h2 className="text text_type_main-large">
              {header ? header : ""}
            </h2>
            <button onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </section>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  header: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
