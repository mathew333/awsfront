const Card = (props) => {
  return (
    <div className="card">
      <div className="px-3 pt-2 pb-0 border-0">
        <h4 className="card-title mb-0">{props.title}</h4>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export default Card;
