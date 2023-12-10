import React from "react";
import { useAuth } from "./AuthProvider";

const WithAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useAuth();
    const isLoggedIn = !!user;

    // If user is not logged in, redirect to login page
    if (!isLoggedIn) {
      window.location.href = "/signIn";
      return;
    }

    // If user is logged in, render the wrapped component (e.g., the Subscription component)
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
