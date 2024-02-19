import React from "react";
import { Route,Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Routes>
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
    </Routes>
  );
};
export default ProtectedRoute;