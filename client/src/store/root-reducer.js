import { combineReducers } from "redux";

import alertReducer from "./modules/alert/reducer";

const rootReducer = combineReducers({
  alert: alertReducer
});

export default rootReducer;