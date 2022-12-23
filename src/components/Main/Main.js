import Trends from "./Trends/Trends";
import Tweets from "./Tweets/Tweets";
import Users from "./Users/Users";

const Main = () => {
  return (
    <>
      <div className="container mt-3 flex-grow-1 flex-shrink-1">
        <div className="row">
          <div className="col-md-8">
            <Tweets />
          </div>
          <div className="col-md-4">
            <div className="row g-4">
              <div className="col-12">
                <Users />
              </div>
              <div className="col-12 flex-grow-1 flex-shrink-1">
                <Trends />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
