import { useState } from "react";
import { Link } from "react-router-dom";
import { likeTweet, replyTweet } from "../../../../services/tweet-service";
import { useAuth } from "../../../../store/auth-context";
import classes from "./Tweet.module.css";
import Modal from "../../../UI/Modal/Modal";
import ProfileImage from "../../../UI/ProfileImage/ProfileImage";
import TweetWithReply from "./TweetWithReply/TweetWithReply";
import Tag from "../../../UI/Tag/Tag";
import TweetMessage from "../../../UI/TweetMessage/TweetMessage";

const Tweet = (props) => {
  const auth = useAuth();
  //console.log("props:",props);
  const [tweet, setTweet] = useState(props.tweet);
  const [likes, setLikes] = useState([]);
  const [showReply, setShowReply] = useState(false);

  const isLiked = likes.map((x) => x.userLoginId).includes(auth.user.loginId);

  const onLikeToggleHandler = (event) => {
    event.preventDefault();
    likeTweet(
      auth.token,
      auth.user,
      tweet._id,
      () => {
        setLikes((prev) => {
          if (prev.map((x) => x.userLoginId).includes(auth.user.loginId)) {
            return prev.filter((x) => x.userLoginId !== auth.user.loginId);
          } else {
            return [...prev, { userLoginId: auth.user.loginId }];
          }
        });
      },
      () => {}
    );
  };
  const showReplyHandler = (event) => {
    setShowReply(true);
  };
  const postReplyHandler = (tweetDetails) => {
    console.log("auth.user",auth.user);
    replyTweet(
      auth.token,
      auth.user.loginId,
      tweet._id,
      tweetDetails,
      (data) => {
        console.log(data);
        setTweet(data);
      },
      () => {}
    );
  };
  const hideReplyHandler = (event) => {
    setShowReply(false);
    console.log(showReply);
  };
  return (    
    <>
      <div className="container pt-2 mb-3 card">
        <div className="d-flex gap-2">
          <ProfileImage
            key={tweet.loginId}
            seed={tweet.loginId}
            className="rounded-circle bg-dark bg-opacity-50"
          />
          <div className="w-100">
            <Link
              to={"/tweetapp/" + tweet.loginId}
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
              <form onSubmit={onLikeToggleHandler}>
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
              <button className="btn shadow-none" onClick={showReplyHandler}>
                <>
                  <i className="bi bi-chat"></i> reply ({tweet.replies.length})
                </>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReply && (
        <Modal onBackdropClick={hideReplyHandler}>
          <TweetWithReply
            onLikeToggleHandler={onLikeToggleHandler}
            tweet={tweet}
            likes={likes}
            postReply={postReplyHandler}
          />
        </Modal>
      )}
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

export default Tweet;
