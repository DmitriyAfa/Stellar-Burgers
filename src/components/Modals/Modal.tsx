import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

// YA imports
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Components
import ModalOverlay from "./ModalOverlay/ModalOverlay";

// Styles
import Styles from "./modal.module.scss";

const modalRoot: HTMLElement = document.getElementById("root__modal")!;

interface IModalComponent {
  children: React.ReactNode;
  closeModalCallback?: () => void;
}

const Modal: React.FunctionComponent<IModalComponent> = React.memo(
  ({ children, closeModalCallback }) => {
    const navigate = useNavigate();
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!modalRef.current) return;

      modalRef.current!.focus();
    });

    const closeModal = React.useCallback(() => {
      navigate("/");
    }, [navigate]);

    const handleKeyPress: (e: React.KeyboardEvent) => void = React.useCallback(
      (e) => {
        let nameOfKey = e.key;

        return nameOfKey === "Escape"
          ? closeModalCallback
            ? closeModalCallback()
            : closeModal()
          : false;
      },
      [closeModalCallback, closeModal]
    );

    return ReactDOM.createPortal(
      <div
        className={Styles.modalContainer}
        onKeyDown={handleKeyPress}
        tabIndex={-1}
        ref={modalRef}
      >
        <div className={Styles.modalContainer__block}>
          {children}

          <div
            className={Styles.modalContainer__close}
            onClick={closeModalCallback || closeModal}
          >
            <CloseIcon type="primary" />
          </div>
        </div>

        <ModalOverlay closeModalCallback={closeModalCallback || closeModal} />
      </div>,
      modalRoot
    );
  }
);

export default Modal;
