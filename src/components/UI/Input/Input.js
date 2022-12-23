import styles from "./Input.module.css";
import React from "react";
const Input = (props) => {
  return (
    <div
      className={`${props.containerStyle} ${
        props.inputHasError && styles.invalid
      }`}
    >
      <label htmlFor={props.input.id} className="form-label">
        {props.label}
      </label>
      <div className="input-group has-validation">
        {props.symbol && (
          <span className="input-group-text" id="inputGroupPrepend">
            {props.symbol}
          </span>
        )}
        {props.isTextarea ? (
          <textarea {...props.input} />
        ) : (
          <input {...props.input} />
        )}
      </div>
      {props.inputHasError && (
        <p className="text-danger">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
