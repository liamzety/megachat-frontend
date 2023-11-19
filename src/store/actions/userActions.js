import { userService } from "../../services/userService";
import { authService } from "../../services/authService";

export function loadUsers() {
  return async (dispatch) => {
    const users = await userService.query();
    dispatch({ type: "SET_USERS", users });
  };
}

export function login(user) {
  return async (dispatch) => {
    try {
      const signedUser = await authService.login(user);
      dispatch({ type: "LOG_USER", user: signedUser });
      return user;
    } catch (err) {
      dispatch({
        type: "SET_MSG",
        msg: err.response.data || "Unexpected error, try again later.",
      });
      setTimeout(() => {
        dispatch({ type: "RESET_MSG" });
      }, 2000);
    }
  };
}

export function signUp(user) {
  return async (dispatch) => {
    try {
      const signedUser = await authService.signUp(user);
      dispatch({ type: "LOG_USER", user: signedUser });
      return user;
    } catch (err) {
      console.log("err", err.response.data);
      dispatch({ type: "SET_MSG", msg: err.response.data });
      setTimeout(() => {
        dispatch({ type: "RESET_MSG" });
      }, 2000);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    await authService.logout();
    dispatch({ type: "LOGOUT" });
    return;
  };
}
