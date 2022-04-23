import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';


function ModalOverlay({ active}) {

  return (
    <>
    <section className={`${styles.modalOverlay} ${active ? styles.active : ""}`}>
    </section>
    </>
  );
}

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired
}

export default ModalOverlay;