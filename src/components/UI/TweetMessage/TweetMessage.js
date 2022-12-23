import Tag from "../Tag/Tag";

const TweetMessage = (props) => {
  let tweetMsg = [];
  let parMsg = "";
  let count = 0;
  props.msg.split("").forEach((x) => {
    if (x === "@" || x === "#") {
      tweetMsg.push(parMsg);
      parMsg = "";
    } else if (parMsg !== "" && x === " ") {
      if (parMsg.indexOf("@") > -1 || parMsg.indexOf("#") > -1) {
        tweetMsg.push(
          <Tag key={"inMsg" + props.id || random(5) + count++}>{parMsg}</Tag>
        );
        parMsg = "";
      } else {
        // tweetMsg.push(parMsg);
      }
    }
    parMsg += x;
  });
  if (parMsg !== "") {
    if (parMsg.indexOf("@") > -1 || parMsg.indexOf("#") > -1) {
      tweetMsg.push(
        <Tag key={"inMsg" + props.id || random(5) + count++}>{parMsg}</Tag>
      );
    } else {
      tweetMsg.push(parMsg);
    }
  }

  return <p className={props.className}>{tweetMsg}</p>;
};

export default TweetMessage;

const random = (len) => {
  const Characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < len; i++) {
    str += Characters.at(Math.floor(Characters.length * Math.random()));
  }
  return str;
};
