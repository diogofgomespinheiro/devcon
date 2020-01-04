import profileActionTypes from "./types";
import axios from "../../../config/axios";
import { setAlert } from "../alert/actions";

export const getProfileStart = () => ({
  type: profileActionTypes.GET_PROFILE_START
});

export const getProfileSuccess = (profile) => ({
  type: profileActionTypes.GET_PROFILE_SUCCESS,
  payload: profile
});

export const getProfileFailed = (error) => ({
  type: profileActionTypes.GET_PROFILE_FAILED,
  payload: error
});

export const getCurrentProfile = () => async dispatch => {
  dispatch(getProfileStart());

  try {
    const res = await axios.get("/api/profile/me");

    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    dispatch(getProfileFailed({ msg: err.response.data.msg, status: err.response.status }));
  }
}