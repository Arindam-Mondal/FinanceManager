import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import { AuthReducer, LOGIN, LOGOUT } from "./AuthReducer";

const AuthGlobalState = (props) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    isLoggedIn: false,
    user: {},
  });

  const loginDispatchHandler = (user) => {
    dispatch({ type: LOGIN, user: user });
  };

  const logoutDispatchHandler = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        user: authState.user,
        loginDispatchHandler: loginDispatchHandler,
        logoutDispatchHandler: logoutDispatchHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthGlobalState;
