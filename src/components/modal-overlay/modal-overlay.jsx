import React from 'react';
import './modal-overlay.scss';
import PropTypes from 'prop-types';


function ModalOverlay({ active}) {

  return (
    <>
    <section id={'modal-overlay'} className={`modal-overlay ${active ? "modal-overlay_active" : ""}`}>
    </section>
    </>
  );
}

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired
}

export default ModalOverlay;

