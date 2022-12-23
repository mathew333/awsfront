import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth-context";

const RequiredAuthentication = (props) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return props.children;
};

export default RequiredAuthentication;
