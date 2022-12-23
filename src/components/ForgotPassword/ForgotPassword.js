import useInput from "../../hooks/use-input";
import Input from "../UI/Input/Input";
import classes from "./ForgotPassword.module.css";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/user-service";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../store/auth-context";
const isNotEmpty = (val) => val.trim().length !== 0;
const ForgotPassword = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    hasError: emailHasError,
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    OnChangeHandler: emailOnChangeHandler,
    OnBlurHandler: emailOnBlurHandler,
    reset: emailReset,
  } = useInput(isNotEmpty);
  const {
    hasError: passwordHasError,
    enteredValue: enteredPassword,
    enteredValueIsValid: enteredPasswordIsValid,
    OnChangeHandler: passwordOnChangeHandler,
    OnBlurHandler: passwordOnBlurHandler,
    reset: passwordReset,
  } = useInput(isNotEmpty);
  const {
    hasError: confirmPasswordHasError,
    enteredValue: enteredConfirmPassword,
    enteredValueIsValid: enteredConfirmPasswordIsValid,
    OnChangeHandler: confirmPasswordOnChangeHandler,
    OnBlurHandler: confirmPasswordOnBlurHandler,
    reset: confirmPasswordReset,
  } = useInput(isNotEmpty);

  const isFormValid =
    // enteredLoginIdIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid;

  const onSubmitHadler = (event) => {
    event.preventDefault();
    allBlur();
    if (!isFormValid) {
      toast.error("Please enter valid details");
      return;
    }

    forgotPassword(
      // { loginId: enteredLoginId, password: enteredPassword },
      { email: enteredEmail, newPassword: enteredPassword},
      () => {
        toast.success("password changed successfully");
        emailReset();
        passwordReset();
        confirmPasswordReset();
        navigate("../login", { replace: true });
      },
      (err) => {
        toast.error("some thing went wrong: " + err.data);
      }
    );
  };

  const allBlur = () => {
    emailOnBlurHandler(true);
    passwordOnBlurHandler(true);
    confirmPasswordOnBlurHandler(true);
  };

  if (auth.isLoggedIn) return <Navigate to="/home" replace={true} />;

  return (
    <>
      <div className={`container ${classes["form-container"]}`}>
        <div className="m-auto">
          <h1 className="ms-3">Forgot Password</h1>
          <form
            className={`row g-3 ${classes["form"]}`}
            onSubmit={onSubmitHadler}
          >
            <Input
              // inputHasError={loginIdHasError}
              // containerStyle="col-md-12"
              // symbol="@"
              // input={{
              //   value: enteredLoginId,
              //   type: "text",
              //   id: "loginId",
              //   className: "form-control",
              //   onChange: loginIdOnChangeHandler,
              //   onBlur: loginIdOnBlurHandler,
              // }}
              // label="LoginId"
              // errorMessage="LoginId Should be in Valid format!"
            inputHasError={emailHasError}
            containerStyle="col-md-6"
            input={{
              value: enteredEmail,
              type: "email",
              id: "email",
              className: "form-control",
              onChange: emailOnChangeHandler,
              onBlur: emailOnBlurHandler,
            }}
            label="Email"
            errorMessage="Email Should be in Valid format!"
            />
            <Input
              inputHasError={passwordHasError}
              containerStyle="col-md-6"
              input={{
                value: enteredPassword,
                type: "password",
                id: "password",
                className: "form-control",
                onChange: passwordOnChangeHandler,
                onBlur: passwordOnBlurHandler,
              }}
              label="Password"
              errorMessage="Password Should be in Valid format!"
            />
            <Input
              inputHasError={confirmPasswordHasError}
              containerStyle="col-md-6"
              input={{
                value: enteredConfirmPassword,
                type: "password",
                id: "confirmPassword",
                className: "form-control",
                onChange: confirmPasswordOnChangeHandler,
                onBlur: confirmPasswordOnBlurHandler,
              }}
              label="Confirm Password"
              errorMessage="Confirm password Should be same as password"
            />
            <div className="col-12">
              <button className="btn btn-outline-dark w-100" type="submit">
                Reset Password
              </button>
            </div>
          </form>
          <div className="col-12 d-flex">
            <p className="mt-5 mb-3 mx-auto">
              <Link to="/login" className="link-dark">
                sign in
              </Link>{" "}
              or{" "}
              <Link to="/register" className="link-dark">
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
