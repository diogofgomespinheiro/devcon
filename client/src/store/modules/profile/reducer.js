import profileActionTypes from "./types";

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {}
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true
      };
    case profileActionTypes.GET_PROFILE_SUCCESS:
    case profileActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case profileActionTypes.GET_ALL_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false
      }
    case profileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case profileActionTypes.CLEAR_PROFILE:
      return {
        ...state, 
        profile: null,
        repos: [],
        isLoading: false
      }
    case profileActionTypes.GET_GITHUB_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload,
        isLoading: false
      }
    default:
      return state;
  }
};

export default profileReducer;
