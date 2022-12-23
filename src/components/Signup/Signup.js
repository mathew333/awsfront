import { Link, Navigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { register } from "../../services/user-service";
import { useAuth } from "../../store/auth-context";
import Input from "../UI/Input/Input";
import classes from "./Signup.module.css";
import { toast } from "react-toastify";

const isNotEmpty = (val) => val.trim().length !== 0;
const islengthGreaterThanThree = (val) => val.trim().length >= 3;

const Signup = (props) => {
  const {
    hasError: firstNameHasError,
    enteredValue: enteredFirstName,
    enteredValueIsValid: enteredFirstNameIsValid,
    OnChangeHandler: firstNameOnChangeHandler,
    OnBlurHandler: firstNameOnBlurHandler,
    reset: firstNameReset,
  } = useInput(islengthGreaterThanThree);

  const {
    hasError: lastNameHasError,
    enteredValue: enteredLastName,
    enteredValueIsValid: enteredLastNameIsValid,
    OnChangeHandler: lastNameOnChangeHandler,
    OnBlurHandler: lastNameOnBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);
  const {
    hasError: emailHasError,
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    OnChangeHandler: emailOnChangeHandler,
    OnBlurHandler: emailOnBlurHandler,
    reset: emailReset,
  } = useInput(isNotEmpty);
  const {
    hasError: contactNumberHasError,
    enteredValue: enteredContactNumber,
    enteredValueIsValid: enteredContactNumberIsValid,
    OnChangeHandler: contactNumberOnChangeHandler,
    OnBlurHandler: contactNumberOnBlurHandler,
    reset: contactNumberReset,
  } = useInput(isNotEmpty);
  const {
    hasError: loginIdHasError,
    enteredValue: enteredLoginId,
    enteredValueIsValid: enteredLoginIdIsValid,
    OnChangeHandler: loginIdOnChangeHandler,
    OnBlurHandler: loginIdOnBlurHandler,
    reset: loginIdReset,
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
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredContactNumberIsValid &&
    enteredLoginIdIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid;
  const onSubmitHadler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    const enteredValues = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      contactNo: enteredContactNumber,
      loginId: enteredLoginId,
      password: enteredPassword,
    };
    console.log(enteredValues);
    resetAll();

    register(
      enteredValues,
      (data) => {
        toast.success("Successfully Registed, Please login");
      },
      (err) => {
        toast.error("Something went wrong: " + err.data);
      }
    );
  };
  const resetAll = () => {
    firstNameReset();
    lastNameReset();
    emailReset();
    contactNumberReset();
    loginIdReset();
    passwordReset();
    confirmPasswordReset();
  };
  const auth = useAuth();
  if (auth.isLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }
  return (
    <div className={`container ${classes["form-container"]}`}>
      <div className="m-auto">
        <h1 className="ms-3">Sign Up</h1>
        <form
          className={`row g-3 ${classes["form-signin"]}`}
          onSubmit={onSubmitHadler}
        >
          <Input
            inputHasError={firstNameHasError}
            containerStyle="col-md-6"
            input={{
              value: enteredFirstName,
              type: "text",
              id: "firstName",
              className: "form-control",
              onChange: firstNameOnChangeHandler,
              onBlur: firstNameOnBlurHandler,
            }}
            label="First Name"
            errorMessage="First Name should have more than Three letter."
          />
          <Input
            inputHasError={lastNameHasError}
            containerStyle="col-md-6"
            input={{
              value: enteredLastName,
              type: "text",
              id: "lastName",
              className: "form-control",
              onChange: lastNameOnChangeHandler,
              onBlur: lastNameOnBlurHandler,
            }}
            label="Last Name"
            errorMessage="Last Name should have more than One letter."
          />
          <Input
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
            inputHasError={contactNumberHasError}
            containerStyle="col-md-6"
            input={{
              value: enteredContactNumber,
              type: "text",
              id: "contactNumber",
              className: "form-control",
              onChange: contactNumberOnChangeHandler,
              onBlur: contactNumberOnBlurHandler,
            }}
            label="Contact Number"
            errorMessage="Contact Number Should be in Valid format!"
          />
          <Input
            inputHasError={loginIdHasError}
            containerStyle="col-md-4"
            symbol="@"
            input={{
              value: enteredLoginId,
              type: "text",
              id: "loginId",
              className: "form-control",
              onChange: loginIdOnChangeHandler,
              onBlur: loginIdOnBlurHandler,
            }}
            label="LoginId"
            errorMessage="LoginId Should be in Valid format!"
          />
          <Input
            inputHasError={passwordHasError}
            containerStyle="col-md-4"
            input={{
              value: enteredPassword,
              type: "password",
              id: "password",
              className: "form-control",
              onChange: passwordOnChangeHandler,
              onBlur: passwordOnBlurHandler,
            }}
            label="Password"
            errorMessage="password Should be in Valid format!"
          />
          <Input
            inputHasError={confirmPasswordHasError}
            containerStyle="col-md-4"
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
            <button
              className="btn btn-dark w-100"
              disabled={!isFormValid}
              type="submit"
            >
              Submit form
            </button>
          </div>
          <div className="col-12 d-flex">
            <p className="mt-5 mb-3 mx-auto">
              already a member?{" "}
              <Link to="/login" className="link-dark">
                sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
