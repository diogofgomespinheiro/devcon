import postsActionTypes from "./types";

const INITIAL_STATE = {
  posts: [],
  post: null,
  isLoading: true,
  error: {}
}

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postsActionTypes.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      }
    case postsActionTypes.POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state;
  }
}

export default postsReducer;