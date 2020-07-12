export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.user };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
