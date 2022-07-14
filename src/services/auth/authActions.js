import * as AT from "./authTypes";
import axios from "axios";

const INGRESS_API = "34.160.0.103";
const AUTH_URL = "http://"+ INGRESS_API+ "/login";

export const authenticateUser = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      username: username,
      password: password,
    });
    localStorage.setItem("jwtToken", response.data.token);
    dispatch(success({ username: response.data.name, isLoggedIn: true }));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success({ username: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};