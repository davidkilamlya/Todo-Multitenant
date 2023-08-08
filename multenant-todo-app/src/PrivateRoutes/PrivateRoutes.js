import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../Actions/userActions";
import { checkAuthentication } from "../util/checkAuthentication";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const PrivateRoutes = ({ children, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Make a request to the server to check authentication status
    async function fetchAuthenticationStatus() {
      const authenticated = await checkAuthentication();
      setIsAuthenticated(authenticated.isAuthenticated);
      dispatch(user(authenticated.user));
    }

    fetchAuthenticationStatus();
  }, []);

  if (isAuthenticated === null) {
    // Still loading authentication status, you might show a loading spinner here
    return (
      <>
        <LoadingSpinner /> <div>Loading...</div>
      </>
    );
  }

  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
