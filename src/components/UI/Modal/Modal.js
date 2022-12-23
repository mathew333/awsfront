import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop {...props} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>,
    document.getElementById("overlay")
  );
};

export default Modal;

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onBackdropClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
