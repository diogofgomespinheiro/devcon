import postsActionTypes from "./types";
import axios from "../../../config/axios";
import { setAlert } from "../../modules/alert/actions";


export const getPostsSuccess = (posts) => {
  return {
    type: postsActionTypes.GET_POSTS_SUCCESS,
    payload: posts
  }
}

export const postsError = (error) => ({
  type: postsActionTypes.POST_ERROR,
  payload: error
});


export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}