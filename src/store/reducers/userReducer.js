let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  users: [],
  loggedUser: localLoggedinUser,
  msg: "",
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };

    case "LOG_USER":
      sessionStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        loggedUser: action.user,
      };
    case "LOGOUT":
      sessionStorage.removeItem("user");

      return {
        ...state,
        loggedUser: null,
      };

    // MSG
    case "SET_MSG":
      return {
        ...state,
        msg: action.msg,
      };
    case "RESET_MSG":
      return {
        ...state,
        msg: "",
      };

    default:
      return state;
  }
}
