const DeleteTweet = (props) => {
  return (
    <>
      <div className="d-flex text-center">
        <div className="m-auto gap-2 row justify-content-around">
          <p className="col-sm-12">
            Are you sure, you want to delete this Tweet!!
          </p>
          <button className="col-sm-5 btn btn-danger" onClick={props.onDelete}>
            Yes
          </button>
          <button className="col-sm-5 btn btn-dark" onClick={props.hideModal}>
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteTweet;
