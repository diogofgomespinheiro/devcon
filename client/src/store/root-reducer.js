import { combineReducers } from "redux";

import alertReducer from "./modules/alert/reducer";
import authReducer from "./modules/auth/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer
});

export default rootReducer;