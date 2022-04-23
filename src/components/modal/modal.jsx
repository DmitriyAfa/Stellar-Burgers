import React, {useEffect, useRef} from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import {CloseIcon} from  '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const modalRoot = document.getElementById("react-modals");



const Modal = ({children, active, setActive, header}) => {
  // active - отвечает за то видна компонента или нет.
  // setActive - функция которая изменяет состояние setActive

  useEffect(() => {
    document.addEventListener('keydown', (e) =>{
      if(e.code === "Escape"){
        setActive(false)
      }
    })
  }, [])

  function closeModal() {
    setActive(false)
  }


  return ReactDOM.createPortal(
    <>
    <section  className={`${styles.modal} ${active ? styles.active : ""}`}>
      <div className={styles.content}>
      <div className={`mt-10 mr-10 ml-10 ${styles.header}`}>
          <h2 className='text text_type_main-large'>{header ? header : ''}</h2>
          <button onClick={() => setActive(false)}><CloseIcon type="primary" /></button>
      </div>
        {children}
      </div>
    </section>
    <ModalOverlay closeModal={closeModal} active={active} />
    </>, modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  header: PropTypes.any.isRequired
}

export default Modal;
