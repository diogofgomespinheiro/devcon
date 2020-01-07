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

    dispatch(addPostSuccess(res.data));
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const getPostSuccess = (post) => {
  return {
    type: postsActionTypes.GET_POST_SUCCESS,
    payload: post
  }
}

export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch(getPostSuccess(res.data));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const clearPost = () => {
  return { 
    type: postsActionTypes.CLEAR_POST
  }
}

export const addCommentSuccess = (comments) => {
  return {
    type: postsActionTypes.ADD_COMMENT,
    payload: comments
  }
}

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch(addCommentSuccess(res.data));
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}

export const removeCommentSuccess = (commentId) => {
  return {
    type: postsActionTypes.REMOVE_COMMENT,
    payload: commentId
  }
}

export const removeComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch(removeCommentSuccess(commentId));
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch(postsError({ msg: err.response.data.msg, status: err.response.status }));
  }
}