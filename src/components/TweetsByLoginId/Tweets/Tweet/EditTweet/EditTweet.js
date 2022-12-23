import useInput from "../../../../../hooks/use-input";
import Input from "../../../../UI/Input/Input";
import { toast } from "react-toastify";
const isNotEmpty = (x) => x.trim() !== "";

const EditTweet = (props) => {
  const inizialTweet = props.tweet;

  const {
    hasError: messageHasError,
    enteredValue: enteredMessage,
    enteredValueIsValid: enteredMessageIsValid,
    OnChangeHandler: messageOnChangeHandler,
    OnBlurHandler: messageOnBlurHandler,
  } = useInput(isNotEmpty, inizialTweet.message);

  const inizialTags = inizialTweet.tags
    .map((x) => "#" + x)
    .reduce((prev, curr) => prev + curr, "");

  const {
    hasError: tagsHasError,
    enteredValue: enteredTags,
    enteredValueIsValid: enteredTagsIsValid,
    OnChangeHandler: tagsOnChangeHandler,
    OnBlurHandler: tagsOnBlurHandler,
  } = useInput((x) => true, inizialTags);

  const onSubmitHadler = (event) => {
    event.preventDefault();
    const isFormValid = enteredMessageIsValid && enteredTagsIsValid;

    if (!isFormValid) {
      toast.error("Invalid Details!!");
      props.onUpdate();
    }
    props.onUpdate(event, {
      message: enteredMessage,
      tags: enteredTags
        .trim()
        .split("#")
        .filter((x) => x !== ""),
    });
  };

  return (
    <>
      <form onSubmit={onSubmitHadler}>
        <Input
          isTextarea={true}
          inputHasError={messageHasError}
          containerStyle="col-md-12"
          input={{
            value: enteredMessage,
            type: "message",
            id: "message",
            rows: "5",
            className: "form-control",
            onChange: messageOnChangeHandler,
            onBlur: messageOnBlurHandler,
          }}
          label="Message"
          errorMessage="Should not be empty"
        />
        <Input
          isTextarea={true}
          inputHasError={tagsHasError}
          containerStyle="col-md-12"
          input={{
            value: enteredTags,
            type: "tags",
            id: "tags",
            rows: "5",
            className: "form-control",
            onChange: tagsOnChangeHandler,
            onBlur: tagsOnBlurHandler,
          }}
          label="Tags"
          errorMessage=""
        />
        <button
          className="col-12 my-1 col-sm-6 btn btn-outline-success"
          type="submit"
        >
          Update
        </button>
        <button
          className="col-12 my-1 col-sm-6 btn btn-outline-danger"
          onClick={props.hideModal}
        >
          Cancle
        </button>
      </form>
    </>
  );
};

export default EditTweet;
