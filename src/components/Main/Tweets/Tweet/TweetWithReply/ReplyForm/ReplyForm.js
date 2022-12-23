import useInput from "../../../../../../hooks/use-input";
import classes from "./ReplyForm.module.css";
const isNotEmpty = (val) => val.trim().length !== 0;
const ReplyForm = (props) => {
  const {
    hasError: replyHasError,
    enteredValue: enteredReply,
    OnChangeHandler: replyOnChangeHandler,
    OnBlurHandler: replyOnBlurHandler,
    reset: resetReply,
  } = useInput(isNotEmpty);
  const onSubmitHadler = (event) => {
    event.preventDefault();

    if (replyHasError) return;

    props.onSubmit({ message: enteredReply });
    resetReply();
  };

  return (
    <>
      <form className="" onSubmit={onSubmitHadler}>
        {replyHasError && (
          <p className={classes["invalid"]}>
            reply should be blank or greater than 144 character
          </p>
        )}
        <textarea
          onBlur={replyOnBlurHandler}
          onChange={replyOnChangeHandler}
          id="replyMsg"
          placeholder="Add a comment..."
          rows="3"
          className={`form-control ${classes["relpy"]}`}
          value={enteredReply}
        />
        <button className="btn btn-primary btn-sm float-end mt-2 me-2">
          comment
        </button>
      </form>
    </>
  );
};

export default ReplyForm;
