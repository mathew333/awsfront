import useInput from "../../../hooks/use-input";
import Input from "../../UI/Input/Input";
import { toast } from "react-toastify";
import { postTweet } from "../../../services/tweet-service";
import { useAuth } from "../../../store/auth-context";
const isNotEmpty = (val) => val.trim().length !== 0;
const PostTweet = (props) => {
  const auth = useAuth();
  const {
    hasError: messageHasError,
    enteredValue: enteredMessage,
    enteredValueIsValid: enteredMessageIsValid,
    OnChangeHandler: messageOnChangeHandler,
    OnBlurHandler: messageOnBlurHandler,
  } = useInput(isNotEmpty);

  const {
    hasError: tagsHasError,
    enteredValue: enteredTags,
    enteredValueIsValid: enteredTagsIsValid,
    OnChangeHandler: tagsOnChangeHandler,
    OnBlurHandler: tagsOnBlurHandler,
  } = useInput((x) => true);

  const onSubmitHadler = (event) => {
    event.preventDefault();
    const isFormValid = enteredMessageIsValid && enteredTagsIsValid;

    if (!isFormValid) {
      toast.error("Invalid Details!!");
    } else {
      postTweet(
        auth.token,
        auth.user.loginId,
        { message: enteredMessage, tags: enteredTags.trim() },
        (data) => {
          console.log(data);
          toast.success("tweet successfully posted :)");
          props.onPostTweet(data);
        },
        (err) => {
          console.log(err);
          toast.success("some went wrong: " + err.data);
        }
      );
    }
    props.hideModal();
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
          Tweet
        </button>
        <button
          className="col-12 my-1 col-sm-6 btn btn-outline-danger"
          onClick={props.hideModal}
          type="button"
        >
          Cancle
        </button>
      </form>
    </>
  );
};

export default PostTweet;
