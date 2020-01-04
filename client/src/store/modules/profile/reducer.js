import profileActionTypes from "./types";

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: false,
  error: {}
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.GET_PROFILE_START:
      return {
        ...state,
        isLoading: true
      };
    case profileActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case profileActionTypes.GET_PROFILE_FAILED:
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
    default:
      return state;
  }
};

export default profileReducer;
