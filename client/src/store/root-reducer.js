import { combineReducers } from "redux";

import alertReducer from "./modules/alert/reducer";
import authReducer from "./modules/auth/reducer";
import profileReducer from "./modules/profile/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;