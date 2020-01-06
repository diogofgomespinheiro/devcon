import profileActionTypes from "./types";
import authActionTypes from "../auth/types";
import axios from "../../../config/axios";
import { setAlert } from "../alert/actions";

export const getProfileStart= () => ({
  type: profileActionTypes.GET_PROFILE_START,
});

export const getProfileSuccess = (profile) => ({
  type: profileActionTypes.GET_PROFILE_SUCCESS,
  payload: profile
});

export const profileError = (error) => ({
  type: profileActionTypes.PROFILE_ERROR,
  payload: error
});

export const getCurrentProfile = () => async dispatch => {
  dispatch(getProfileStart());

  try {
    const res = await axios.get("/api/profile/me");
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const res = await axios.post("/api/profile", formData, config);
    dispatch(getProfileSuccess(res.data));

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
  }
} 

export const updateProfile = (profile) => {
  return {
    type: profileActionTypes.UPDATE_PROFILE,
    payload: profile
  }
}

export const clearProfile = () => {
  return {
    type: profileActionTypes.CLEAR_PROFILE
  }
}

export const accountDeleted = () => {
  return {
    type: authActionTypes.ACCOUNT_DELETED
  }
}


export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch(updateProfile(res.data));

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch(updateProfile(res.data));

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch(updateProfile(res.data));
    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch(updateProfile(res.data));
    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const deleteAccount = () => async dispatch => {
  if(window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete(`/api/profile`);
      dispatch(clearProfile());
      dispatch(accountDeleted());

      dispatch(setAlert("Your account has been permantly deleted", "danger"));
    } catch (err) {
      dispatch(profileError({ msg: err.response.data.msg, status: err.response.status }));
    }
  }
}