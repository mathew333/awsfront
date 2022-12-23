import { Link } from "react-router-dom";
import { useAuth } from "../../../../../store/auth-context";
import ProfileImage from "../../../../UI/ProfileImage/ProfileImage";
import Tag from "../../../../UI/Tag/Tag";
import TweetMessage from "../../../../UI/TweetMessage/TweetMessage";
import Replies from "./Replies/Replies";
import ReplyForm from "./ReplyForm/ReplyForm";
import classes from "./TweetWithReply.module.css";

const TweetWithReply = (props) => {
  const auth = useAuth();
  const tweet = props.tweet;
  const likes = props.likes;

  const isLiked = likes.map((x) => x.userLoginId).includes(auth.user.loginId);
  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-5 d-flex gap-2">
          <div className="d-flex gap-2">
            <ProfileImage
              key={tweet.loginId}
              seed={tweet.loginId}
              className="rounded-circle bg-dark bg-opacity-50"
            />
            <div className="w-100">
              <Link
                to={"/tweets/" + tweet.loginId}
                className={`text-capitalize fw-bold ${classes["name"]}`}
              >
                {tweet.firstName + " " + tweet.lastName}
              </Link>{" "}
              <span className="text-muted">
                @{tweet.loginId} &middot; {getTimeDiff(tweet.lastModifiedDate)}
              </span>
              <TweetMessage msg={tweet.message} id={tweet.id} />
              <p>
                {tweet.tags.map((x, index) => (
                  <Tag key={tweet.id + index}>{"#" + x + " "}</Tag>
                ))}
              </p>
              <div className="d-flex justify-content-between w-100">
                <form onSubmit={props.onLikeToggleHandler}>
                  <button className="btn shadow-none">
                    {isLiked ? (
                      <>
                        <i className="bi bi-hand-thumbs-up-fill"></i> liked (
                        {likes.length})
                      </>
                    ) : (
                      <>
                        <i className="bi bi-hand-thumbs-up"></i> like (
                        {likes.length})
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-1 d-none d-sm-flex ${classes["vr-h"]}`}>
          <div className="vr"></div>
        </div>
        <div className={`col-12 col-sm-6`}>
          <Replies replies={tweet.replies} />
          <ReplyForm onSubmit={props.postReply} />
        </div>
      </div>
    </>
  );
};

const getTimeDiff = (t) => {
  if (t == null) return "(--)";
  const timeDiffInMs = new Date() - new Date(t);
  const timeDiffInDays = timeDiffInMs / (1000 * 60 * 60 * 24);
  if (timeDiffInDays >= 1) return Math.round(timeDiffInDays) + "d";
  const timeDiffInHrs = timeDiffInDays * 24;
  if (timeDiffInHrs >= 1) return Math.round(timeDiffInHrs) + "h";
  const timeDiffInMins = timeDiffInHrs * 60;
  if (timeDiffInMins >= 1) return Math.round(timeDiffInMins) + "m";
  const timeDiffInSecs = timeDiffInMins * 60;
  return Math.round(timeDiffInSecs) + "s";
};

export default TweetWithReply;
