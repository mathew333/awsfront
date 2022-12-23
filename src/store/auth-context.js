import React, { useCallback, useEffect, useState } from "react";

let logoutTimmer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  user: "",
});

const remainingTime = (expiraationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expiraationTime).getTime();

  return adjExpirationTime - currentTime;
};

const getTokenFromLocal = () => {
  const initialToken = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  const user = JSON.parse(localStorage.getItem("user"));

  const remTime = remainingTime(expirationTime);
  if (remTime < 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  }
  return { token: initialToken, remTime, user };
};

export const AuthContextProvider = (props) => {
  const storedToken = getTokenFromLocal();
  let initialToken, initialUser;
  if (storedToken) {
    initialToken = storedToken.token;
    initialUser = storedToken.user;
  }
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    console.log("logOut");
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");

    if (logoutTimmer) {
      clearTimeout(logoutTimmer);
    }
  }, []);
  const loginHandler = (token, expirationTime, userDetails) => {
    expirationTime = new Date(new Date().getTime() + expirationTime);
    
    console.log("login");
    setToken(token);
    console.log("tokennnnn",token);
    setUser(userDetails);

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("user", JSON.stringify(userDetails));
    
    const remTime = remainingTime(expirationTime);
    getTokenFromLocal();

    logoutTimmer = setTimeout(logoutHandler, remTime);
  };

  useEffect(() => {
    if (storedToken) {
      logoutTimmer = setTimeout(logoutHandler, storedToken.remTime);
    }
    return () => {
      clearTimeout(logoutTimmer);
    };
  }, [storedToken, logoutHandler]);
  // console.log({
  //   token,
  //   isLoggedIn: userIsLoggedIn,
  //   login: loginHandler,
  //   logout: logoutHandler,
  // });
  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthContext;
