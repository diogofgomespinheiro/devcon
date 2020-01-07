//Library imports
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Component imports
import Spinner from "../../../../components/Spinner";
import ProfileTop from "./components/ProfileTop";
import ProfileAbout from "./components/ProfileAbout";
import ProfileExperience from "./components/ProfileExperience";
import ProfileEducation from "./components/ProfileEducation";
import ProfileGithub from "./components/ProfileGithub";

//Redux imports
import {
  getProfileById,
  clearProfile
} from "../../../../store/modules/profile/actions";

//Style imports
import "./styles.css";

const Profile = ({ match }) => {
  const profile = useSelector(state => state.profile.profile);
  const isLoading = useSelector(state => state.profile.isLoading);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const onGetProfile = useCallback(userId => dispatch(getProfileById(userId)), [
    dispatch
  ]);
  const onClearProfile = useCallback(() => dispatch(clearProfile()), [dispatch])

  useEffect(() => {
    onGetProfile(match.params.id);

    return () => {
      onClearProfile();
    };
  }, [onGetProfile, match.params.id, onClearProfile]);

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
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
