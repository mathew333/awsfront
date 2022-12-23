import User from "./User/User";
import Card from "../../UI/Card/Card";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user-service";
import { useAuth } from "../../../store/auth-context";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const USER_LIMIT = 5;
const Users = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(USER_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    getAllUsers(
      auth.token,
      (data) => {
        console.log("data",data);
        const filteredUsers = data.filter(
          (x) => x._id !== auth.user
        );
        console.log("xyz",filteredUsers)
        setUsers(filteredUsers);
        setIsLoading(false);
      },
      (err) => {
        toast.error("Something went wrong!: " + err.data);
      }
    );
  }, [auth.token, auth.user]);

  const viewMoreHandler = (event) => {
    if (2 * limit > users.length - 1) {
      setLimit(users.length);
    } else {
      setLimit((prevLimit) => 2 * prevLimit);
    }
  };
  const viewLessHandler = (event) => {
    setLimit(USER_LIMIT);
  };

  return (
    <Card title="People You May Know">
      {isLoading ? (
        <div className="d-flex w-100">
          <ReactLoading
            type="balls"
            color="rgba(33,37,41,1)"
            height="120px"
            width="120px"
            className="m-auto"
          />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center fw-bold">No Users</p>
      ) : (
        <>
          {users
            .filter((_, index) => index < limit)
            .map((user) => (
              <User {...user} key={user._id} />
            ))}
          {limit < users.length - 1 && (
            <button
              className="btn btn-outline-primary w-100"
              onClick={viewMoreHandler}
            >
              view more
            </button>
          )}
          {limit === users.length && (
            <button
              className="btn btn-outline-primary w-100"
              onClick={viewLessHandler}
            >
              view less
            </button>
          )}
        </>
      )}
    </Card>
  );
};

export default Users;
