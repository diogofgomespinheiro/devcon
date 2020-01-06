//Library imports
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

//Component imports
import Spinner from "../../components/Spinner";
import ProfileItem from "./components/ProfileItem";

//Redux imports
import { getAllProfiles } from "../../store/modules/profile/actions";

const Profiles = () => {
  const profiles = useSelector(state => state.profile.profiles);
  const isLoading = useSelector(state => state.profile.isLoading);

  const dispatch = useDispatch();

  const onGetAllProfiles = useCallback(() => dispatch(getAllProfiles()), [
    dispatch
  ]);

  useEffect(() => {
    onGetAllProfiles();
  }, [onGetAllProfiles]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fas fa-search-plus"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {
              profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile}/>
                ))
              ) : (
                <h4>No profiles found...</h4>
              )
            }
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
