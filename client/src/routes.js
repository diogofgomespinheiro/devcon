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
import AddExperience from "./pages/Dashboard/components/AddExperience";
import AddEducation from "./pages/Dashboard/components/AddEducation";
import Profiles from "./pages/Profiles";
import Profile from "./pages/Profiles/components/Profile";
import Posts from "./pages/Posts";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
      </Switch>
    </section>
  );
};

export default Routes;