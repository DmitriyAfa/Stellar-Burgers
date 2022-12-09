import React from 'react';

// Styles
import Styles from './modalOverlay.module.scss';



interface IModalOverlayComponent {
  closeModalCallback: () => void
}

const ModalOverlay: React.FunctionComponent<IModalOverlayComponent> = React.memo(({
  closeModalCallback,
}) => {

  return (
    <div className={Styles.modalOverlay} onClick={closeModalCallback} />
  )
})


export default ModalOverlay;