import ReactLoading from "react-loading";
import ReactDOM from "react-dom";
import styles from "./Loading.module.css";

const Loading = () => {
  return ReactDOM.createPortal(
    <div className={styles.outter}>
      <div className={styles.inner}>
        <ReactLoading
          type="balls"
          color="rgba(33,37,41,1)"
          height="120px"
          width="120px"
        />
      </div>
    </div>,
    document.getElementById("loading-root")
  );
};

export default Loading;
