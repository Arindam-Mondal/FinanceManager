import { createContext } from "react";

const initialState = {
  isLoggedIn: false,
  user: {
    email: "",
  },
  loginDispatchHandler: (user) => {},
  logoutDispatchHandler: () => {},
};

const AuthContext = createContext(initialState);

export default AuthContext;
