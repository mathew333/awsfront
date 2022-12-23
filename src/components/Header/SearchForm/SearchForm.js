import { useState } from "react";
import SearchModal from "../../UI/SearchModal/SearchModal";
import classes from "./SearchForm.module.css";
import ReactLoading from "react-loading";
import User from "../../Main/Users/User/User";
import { searchUsers } from "../../../services/user-service";
import { useAuth } from "../../../store/auth-context";
import { toast } from "react-toastify";
const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuth();
  const [showUsers, setShowUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [users, setUsers] = useState([]);

  const onSearchHandler = (event) => {
    event.preventDefault();
    setShowUsers(true);
    if (searchTerm.trim() === "") {
      setUsers([]);
      return;
    }
    setIsLoading(true);
    setSearched(true);
    searchUsers(
      auth.token,
      searchTerm,
      (data) => {
        setUsers(data);
      },
      (err) => {
        toast.error("error");
      }
    );
    setIsLoading(false);
  };
  const onFocusHandler = (event) => {
    showModal();
  };
  const hideModal = () => {
    console.log("called");
    setShowUsers(false);
    setSearched(false);
  };
  const showModal = () => {
    setShowUsers(true);
  };
  const onChangeHadler = (event) => {
    setSearchTerm(event.target.value);
    if (searched) setSearched(false);
  };
  return (
    <>
      <form
        className={`d-flex ${classes["search-form"]} `}
        onSubmit={onSearchHandler}
      >
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={onChangeHadler}
          onFocus={onFocusHandler}
        />
        <button className="btn btn-sm btn-outline-light" type="submit">
          Search
        </button>
      </form>
      {showUsers && (
        <SearchModal onBackdropClick={hideModal} onModalClick={showModal}>
          {isLoading && (
            <ReactLoading
              type="balls"
              color="rgba(33,37,41,1)"
              height="75px"
              width="75px"
              className="m-auto"
            />
          )}
          {!isLoading &&
            users.length !== 0 &&
            users.map((user) => <User {...user} key={user.id} />)}
          {!isLoading && users.length === 0 && searchTerm.trim() === "" && (
            <p className="text-center m-0">Enter some value </p>
          )}
          {!isLoading && users.length === 0 && searched && (
            <p className="text-center m-0">No Users Present </p>
          )}
        </SearchModal>
      )}
    </>
  );
};

export default SearchForm;
