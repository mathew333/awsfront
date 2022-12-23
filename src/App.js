import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import RequiredAuthentication from "./components/auth/RequiredAuthentication";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import TweetsByLoginId from "./components/TweetsByLoginId/TweetsByLoginId";
import Welcome from "./components/Welcome/Welcome";
import { AuthContextProvider, useAuth } from "./store/auth-context";

function App() {
  const auth = useAuth();
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/home"
            element={
              <RequiredAuthentication>
                <Main />
              </RequiredAuthentication>
            }
          />
          <Route
            path="/tweets/:loginId"
            element={
              <RequiredAuthentication>
                <TweetsByLoginId />
              </RequiredAuthentication>
            }
          />
          <Route
            path="/"
            element={<Navigate to={auth.isLoggedIn ? "/home" : "/welcome"} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
