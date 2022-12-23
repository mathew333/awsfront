import { useState } from "react";

const useInput = (validationCheck, inizialValue = "") => {
  const [enteredValue, setEnteredValue] = useState(inizialValue);
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validationCheck(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const OnChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const OnBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    hasError,
    enteredValue,
    enteredValueIsValid,
    OnChangeHandler,
    OnBlurHandler,
    reset,
  };
};

export default useInput;
