import parseJwt from "../../utils/jwtDecoder";
import { LOGIN, REGISTER } from "../constants/constants";

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const register = (data) => {
  return {
    type: REGISTER,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const loginAction = (payload) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log("Login data:", data);
    localStorage.setItem("token", data.accessToken);
    const userData = parseJwt(data.accessToken);
    localStorage.setItem("user", userData.user);
    dispatch(login(data));
  };
};

export const registerAction = (payload) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log("Register data:", data);
    localStorage.setItem("token", data.accessToken);
    const userData = parseJwt(data.accessToken);
    localStorage.setItem("user", userData.user);
    dispatch(register(data));
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};
