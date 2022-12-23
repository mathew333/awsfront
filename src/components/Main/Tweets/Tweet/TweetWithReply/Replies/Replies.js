import Reply from "./Reply/Reply";
import classes from "./Replies.module.css";
const Replies = (props) => {
  const replies = props.replies;

  if (replies.length <= 0)
    return (
      <div
        className={`d-flex justify-content-around w-100 ${classes["no-replies"]}`}
      >
        <p className="fw-bold">No Replies</p>
      </div>
    );
  return (
    <>
      <div className="rounded bg-dark">
        <p className="p-3 ps-2 text-light mb-0 fw-bold">Replies</p>
      </div>
      <div className={`rounded p-2 mb-2 ${classes["replies"]}`}>
        {replies.map((reply, index) => {
          return (
            <Reply key={props.id + "" + index} reply={reply} index={index} />
          );
        })}
      </div>
    </>
  );
};

export default Replies;
