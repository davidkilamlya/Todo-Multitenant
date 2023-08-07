import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={
      isAuthenticated ? <element /> : <Navigate to="/login" />
    }
  />
);

export default PrivateRoute;
