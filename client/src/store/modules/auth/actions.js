import authActionTypes from "./types";
import profileActionTypes from "../profile/types";
import axios, { setAuthToken } from "../../../config/axios";
import { setAlert } from "../alert/actions";

export const registerStart = () => {
  return {
    type: authActionTypes.REGISTER_START
  }
}

export const registerSuccess = (userData) => {
  return {
    type: authActionTypes.REGISTER_SUCCESS,
    payload: userData
  }
}

export const registerFailed = () => {
  return {
    type: authActionTypes.REGISTER_FAILED
  }
}

export const register = ({ name, email, password }) => async dispatch => {
  dispatch(registerStart());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ name, email, password });
  
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(registerFailed());
  }
}

export const loadUserStart = () => {
  return {
    type: authActionTypes.LOAD_USER_START
  }
}

export const loadUserSuccess = (userData) => {
  return {
    type: authActionTypes.LOAD_USER_SUCCESS,
    payload: userData
  }
}

export const loadUserFailed = () => {
  return {
    type: authActionTypes.LOAD_USER_FAILED,
  }
}


export const loadUser = () => async dispatch => {
  //dispatch(loadUserStart());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch(loadUserSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    dispatch(loadUserFailed());
  }
}

export const loginStart = () => {
  return {
    type: authActionTypes.LOGIN_START
  }
}

export const loginSuccess = (userData) => {
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    payload: userData
  }
}

export const loginFailed = () => {
  return {
    type: authActionTypes.LOGIN_FAILED
  }
}

export const login = ({ email, password }) => async dispatch => {
  dispatch(loginStart());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ email, password });
  
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(loginFailed());
  }
}

export const logout = () => dispatch => {
  dispatch({ type: profileActionTypes.CLEAR_PROFILE});
  dispatch({ type: authActionTypes.LOGOUT});
}