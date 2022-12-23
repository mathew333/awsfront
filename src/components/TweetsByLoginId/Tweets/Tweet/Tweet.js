import { useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteTweet,
  likeTweet,
  replyTweet,
  updateTweet,
} from "../../../../services/tweet-service";
import { useAuth } from "../../../../store/auth-context";
import classes from "./Tweet.module.css";
import ProfileImage from "../../../UI/ProfileImage/ProfileImage";
import Modal from "../../../UI/Modal/Modal";
import TweetWithReply from "../../../Main/Tweets/Tweet/TweetWithReply/TweetWithReply";
import EditTweet from "./EditTweet/EditTweet";
import DeleteTweet from "./DeleteTweet/DeleteTweet";
import { toast } from "react-toastify";
import TweetMessage from "../../../UI/TweetMessage/TweetMessage";

const Tweet = (props) => {
  const auth = useAuth();
  const [tweet, setTweet] = useState(props.tweet);
  console.log("$$$$$",tweet);
  const [likes, setLikes] = useState(props.tweet.likes);
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isLiked = likes.map((x) => x.userLoginId).includes(auth.user.loginId);

  const onLikeToggleHandler = (event) => {
    event.preventDefault();
    likeTweet(
      auth.token,
      auth.user.loginId,
      tweet.id,
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

  const showDeleteHandler = (event) => {
    setShowDelete(true);
  };
  const showEditHandler = (event) => {
    setShowEdit(true);
  };
  const postReplyHandler = (tweetDetails) => {
    replyTweet(
      auth.token,
      auth.user.loginId,
      tweet.id,
      tweetDetails,
      (data) => {
        setTweet(data);
      },
      () => {}
    );
  };
  const onDeleteHandler = (event) => {
    event.preventDefault();
    hideModal();

    deleteTweet(
      auth.token,
      auth.user.loginId,
      props.tweet._id,
      () => {
        toast.success("successfully Deleted Tweet");
        console.log("deketeTweet",tweet);
        props.deleteHandler(tweet);
      },
      (err) => {
        toast.error("something went wrong: " + err.data);
      }
    );
  };
  const onUpdateHandler = (event, updatedTweet) => {
    console.log("*****",event);
    if (!event) {
      hideModal();
      return;
    }
    event.preventDefault();

    hideModal();

    if (
      tweet.message === updatedTweet.message &&
      arrayEquals(tweet.tags, updatedTweet.tags)
    ) {
      toast.warning("No Changes!!");
      return;
    }
    updatedTweet.tags = updatedTweet.tags
      // .map((x) => x)
      .reduce((prev, curr) => prev + curr, "");

    updateTweet(
      auth.token,
      auth.user.loginId,
      props.tweet._id,
      updatedTweet,
      (data) => {
        toast.success("successfully Updated Tweet");
        console.log("%%%%%",data);
        setTweet(data);
      },
      (err) => {
        toast.error("something went wrong: " + err.data);
      }
    );
  };
  const hideModal = (event) => {
    event && event.preventDefault && event.preventDefault();
    setShowReply(false);
    setShowEdit(false);
    setShowDelete(false);
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
              to={"/tweets/" + tweet.loginId}
              className={`text-capitalize fw-bold ${classes["name"]}`}
            >
              {tweet.firstName + " " + tweet.lastName}
            </Link>{" "}
            <span className="text-muted">
              @{tweet.loginId} &middot; {getTimeDiff(tweet.lastModifiedDate)}
            </span>
            <TweetMessage msg={tweet.message} />
            <p>
              {console.log(tweet.tags)}
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
              {props.editEnabled && (
                <>
                  <button className="btn shadow-none" onClick={showEditHandler}>
                    <>
                      <i className="bi bi-pencil-square"></i> Edit
                    </>
                  </button>
                  <button
                    className="btn shadow-none"
                    onClick={showDeleteHandler}
                  >
                    <>
                      <i className="bi bi-trash3-fill"></i> delete
                    </>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showReply && (
        <Modal onBackdropClick={hideModal}>
          <TweetWithReply tweet={tweet} postReply={postReplyHandler} />
        </Modal>
      )}
      {showEdit && (
        <Modal onBackdropClick={hideModal}>
          <EditTweet
            tweet={tweet}
            hideModal={hideModal}
            onUpdate={onUpdateHandler}
          />
        </Modal>
      )}
      {showDelete && (
        <Modal onBackdropClick={hideModal}>
          <DeleteTweet
            tweet={tweet}
            hideModal={hideModal}
            onDelete={onDeleteHandler}
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

const Tag = (props) => {
  return <span className="text-primary">{props.children}</span>;
};

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export default Tweet;
