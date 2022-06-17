import styles from "./modal-overlay.module.css";


const ModalOverlay = ({ onClose }: {onClose: Function}) => {
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

export default ModalOverlay;
