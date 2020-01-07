import postsActionTypes from "./types";

const INITIAL_STATE = {
  posts: [],
  post: null,
  isLoading: true,
  error: {}
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postsActionTypes.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };
    case postsActionTypes.POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case postsActionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        )
      };
    case postsActionTypes.GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      }
    case postsActionTypes.ADD_POST:
      return {
        ...state,
        posts: [ action.payload,...state.posts],
        isLoading: false
      }
    case postsActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        isLoading: false
      }
    case postsActionTypes.CLEAR_POST:
      return {
        ...state,
        post: null,
        isLoading: false
      }
    default:
      return state;
  }
};

export default postsReducer;
