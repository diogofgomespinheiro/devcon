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

export const updateLikes = (id, likes) => {
  return {
    type: postsActionTypes.UPDATE_LIKES,
    payload: { id, likes }
  }
}

export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch(updateLikes(postId, res.data));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch(updateLikes(postId, res.data));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const deletePostSuccess = (id) => {
  return {
    type: postsActionTypes.DELETE_POST,
    payload: id
  }
}

export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch(deletePostSuccess(postId));
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const addPostSuccess = (post) => {
  return {
    type: postsActionTypes.ADD_POST,
    payload: post
  }
}

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const res = await axios.post(`/api/posts/`, formData, config);
    console.log(res);

    dispatch(addPostSuccess(res.data));
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}