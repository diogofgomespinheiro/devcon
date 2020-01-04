//Library imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Component imports
import Register from "./pages/Register";
import Login from "./pages/Login";
import Alert from "./components/Alert";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;