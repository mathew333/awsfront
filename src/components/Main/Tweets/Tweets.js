import { useEffect, useState } from "react";
import { getAllTweets } from "../../../services/tweet-service";
import { useAuth } from "../../../store/auth-context";
import Modal from "../../UI/Modal/Modal";
import ReactLoading from "react-loading";
import PostTweet from "../PostTweet/PostTweet";
import Tweet from "./Tweet/Tweet";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [showPostTweet, setShowPostTweet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hideModal = () => {
    setShowPostTweet(false);
  };
  const auth = useAuth();
  useEffect(() => {
    setIsLoading(true);
    getAllTweets(
      auth.token,
      (data) => {        
        setTweets(data.tweetData);
        setIsLoading(false);
      },
      () => {}
    );
  }, [auth.token]);

  const onPostHandler = (tweet) => {   
    setTweets((prev) => {
      return [tweet, ...prev];
    });
  };

  return isLoading ? (
    <div className="d-flex w-100">
      <ReactLoading
        type="balls"
        color="rgba(33,37,41,1)"
        height="120px"
        width="120px"
        className="m-auto"
      />
    </div>
  ) : (
    <>
      <div className="mb-3 d-flex">
        <button
          className=" m-auto btn btn-outline-dark w-75"
          onClick={() => {
            setShowPostTweet(true);
          }}
        >
          post a tweet
        </button>
      </div>
      {!isLoading && tweets.length === 0 ? (
        <p className="text-center fw-bold">No Tweets</p>
      ) : (
        tweets.map((tweet) => {
          return <Tweet key={tweet._id} tweet={tweet} />;
        })
      )}
      {showPostTweet && (
        <Modal onBackdropClick={hideModal}>
          <PostTweet hideModal={hideModal} onPostTweet={onPostHandler} />
        </Modal>
      )}
    </>
  );
};

export default Tweets;
