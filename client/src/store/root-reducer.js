import { combineReducers } from "redux";

import alertReducer from "./modules/alert/reducer";
import authReducer from "./modules/auth/reducer";
import profileReducer from "./modules/profile/reducer";
import postsReducer from "./modules/posts/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer
});

export default rootReducer;