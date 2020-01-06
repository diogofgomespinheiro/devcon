//Library imports
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Component imports
import Spinner from "../../../../components/Spinner";

//Redux imports
import {
  getProfileById,
  clearProfile
} from "../../../../store/modules/profile/actions";

const Profile = ({ match }) => {
  const profile = useSelector(state => state.profile.profile);
  const isLoading = useSelector(state => state.profile.isLoading);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const onGetProfile = useCallback(userId => dispatch(getProfileById(userId)), [
    dispatch
  ]);
  const onClearProfile = () => dispatch(clearProfile());

  useEffect(() => {
    onGetProfile(match.params.id);

    return () => {
      onClearProfile();
    };
  }, [onGetProfile]);

  return (
    <>
      {profile === null || isLoading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </>
      )}
    </>
  );
};

export default Profile;
