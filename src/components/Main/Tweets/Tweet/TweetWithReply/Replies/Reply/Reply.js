import ProfileImage from "../../../../../../UI/ProfileImage/ProfileImage";
import TweetMessage from "../../../../../../UI/TweetMessage/TweetMessage";

const Reply = (props) => {
  return (
    <div className="w-100">
      {props.index !== 0 && <hr />}
      <div className="d-flex gap-3">
        <ProfileImage
          key={props.reply.userLoginId}
          seed={props.reply.userLoginId}
          width="40"
          height="40"
          className="rounded-circle bg-dark bg-opacity-50"
        />
        <div>
          <p className="mb-0">{"@" + props.reply.userLoginId}</p>
          <TweetMessage className="mb-3" msg={props.reply.message} />
        </div>
      </div>
    </div>
  );
};

export default Reply;
