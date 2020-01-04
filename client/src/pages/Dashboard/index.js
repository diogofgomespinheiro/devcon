//Library imports
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";

//Redux imports
import { getCurrentProfile } from "../../store/modules/profile/actions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const onGetProfile = useCallback(() => dispatch(getCurrentProfile()), [dispatch]);

  useEffect(() => {
    onGetProfile();
  }, [onGetProfile])

  return (
    <div>
      
    </div>
  )
}

export default Dashboard;
