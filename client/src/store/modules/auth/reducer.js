import authActionTypes from "./types";


const INITIAL_STATE = {
  isLoading: false,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActionTypes.REGISTER_START:
    case authActionTypes.LOAD_USER_START:
    case authActionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true
      }
    case authActionTypes.REGISTER_SUCCESS:
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case authActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case authActionTypes.REGISTER_FAILED:
    case authActionTypes.LOAD_USER_FAILED:
    case authActionTypes.LOGIN_FAILED:
    case authActionTypes.LOGOUT:
    case authActionTypes.ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    default:
      return state;
  }
}

export default authReducer;