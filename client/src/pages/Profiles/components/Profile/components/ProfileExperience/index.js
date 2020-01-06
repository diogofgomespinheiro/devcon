//Library imports
import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      <p>
        <strong>Position: </strong> {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong> {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
