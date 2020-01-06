//Library imports
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Component imports
import Spinner from "../../components/Spinner";
import DashboardActions from "./components/DashboardActions";

//Redux imports
import { getCurrentProfile } from "../../store/modules/profile/actions";

const Dashboard = () => {
  const isLoading = useSelector(state => state.profile.isLoading);
  const profile = useSelector(state => state.profile.profile);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const onGetProfile = useCallback(() => dispatch(getCurrentProfile()), [
    dispatch
  ]);

  useEffect(() => {
    onGetProfile();
  }, [onGetProfile]);

  return isLoading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
