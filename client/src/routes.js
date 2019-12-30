//Library imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Component imports
import Register from "./pages/Register";
import Login from "./pages/Login";

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </section>
  );
};

export default Routes;