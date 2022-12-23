import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTweetsByLoginId } from "../../services/tweet-service";
import { useAuth } from "../../store/auth-context";
import Tweets from "./Tweets/Tweets";
import ReactLoading from "react-loading";

const TweetsByLoginId = () => {
  const param = useParams();
  const auth = useAuth();
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getTweetsByLoginId(
      auth.token,
      param.loginId,
      (data) => {
        setTweets(data);
        setIsLoading(false);
      },
      (err) => {
        setError(err.data);
        setIsLoading(false);
      }
    );
  }, [param.loginId, auth.token]);

  const onDeleteHandler = (tweet) => {
    setTweets((prev) => prev.filter((x) => x._id !== tweet._id));
  };

  return !isLoading ? (
    <div className="mt-3">
      {error ? (
        error
      ) : auth.user === param.loginId ? (
        <Tweets tweets={tweets} editEnabled={true} onDelete={onDeleteHandler} />
      ) : (
        <Tweets tweets={tweets} editEnabled={false} />
      )}
    </div>
  ) : (
    <div className="d-flex w-100">
      <ReactLoading
        type="balls"
        color="rgba(33,37,41,1)"
        height="120px"
        width="120px"
        className="m-auto"
      />
    </div>
  );
};

export default TweetsByLoginId;
