import { useEffect, useState } from "react";
import { getAllTweets } from "../../../services/tweet-service";
import { useAuth } from "../../../store/auth-context";
import Card from "../../UI/Card/Card";
import Tweet from "./Tweet/Tweet";
import ReactLoading from "react-loading";

const Trends = () => {
  const [trendingTweets, setTrendingTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  useEffect(() => {
    setIsLoading(true);
    getAllTweets(
      auth.token,
      (data) => {
        const filteredTrendingTweet = data.tweetData
          .filter(
            (x) =>
              new Date().getTime() - new Date(x.lastModifiedDate).getTime() <=
              86400000
          )
          .sort(
            (a, b) =>
              b.likes.length +
              b.replies.length -
              a.likes.length -
              a.replies.length
          )
          .filter((_, i) => i < 5);
        setTrendingTweets(filteredTrendingTweet);
        setIsLoading(false);
      },
      () => {}
    );
  }, [auth.token]);

  return (
    <Card title="Trending Tweets">
      {!isLoading ? (
        trendingTweets.length === 0 ? (
          <p className="text-center fw-bold">No Trending Tweets</p>
        ) : (
          trendingTweets.map((user) => <Tweet key={user.id} {...user} />)
        )
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
      )}
    </Card>
  );
};

export default Trends;
