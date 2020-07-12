import React, { createContext, useReducer } from "react";
import AuthReducer from "../reducer/AuthReducer";

const initialState = {
  isLoggedIn: false,
};

const AuthStore = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext(initialState);
export default AuthStore;
