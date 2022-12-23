import styles from "./SearchModal.module.css";
import ReactDOM from "react-dom";
const SearchModal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop {...props} />
      <ModalOverlay {...props}> {props.children}</ModalOverlay>
    </>,
    document.getElementById("overlay")
  );
};

export default SearchModal;

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onBackdropClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal} onClick={props.onModalClick}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
