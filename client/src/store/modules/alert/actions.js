import uuid from "uuid";
import alertTypes from "./types";

export const setAlert = (msg, alertType, timeout = 2500 ) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: alertTypes.SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: alertTypes.REMOVE_ALERT, payload: id }), timeout);
};
