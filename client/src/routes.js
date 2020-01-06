//Library imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Component imports
import Register from "./pages/Register";
import Login from "./pages/Login";
import Alert from "./components/Alert";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/Dashboard/components/CreateProfile";
import EditProfile from "./pages/Dashboard/components/EditProfile";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      </Switch>
    </section>
  );
};

export default Routes;