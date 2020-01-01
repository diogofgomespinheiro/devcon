//Library imports
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";

//Style imports
import "./styles.css";

const Alert = () => {
  const alerts = useSelector(state => state.alert);

  return (
    <TransitionGroup>
      {alerts !== null && alerts.length > 0
        ? alerts.map(alert => {
            return (
              <CSSTransition key={alert.id} timeout={800} classNames="item">
                <div className={`alert alert-${alert.alertType}`}>
                  {alert.msg}
                </div>
              </CSSTransition>
            );
          })
        : null}
    </TransitionGroup>
  );
};

export default Alert;
