//Library imports
import React from 'react';
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import PropTypes from 'prop-types';

//Redux imports
import { deleteExperience } from "../../../../store/modules/profile/actions";


const Experiences = ({ experiences }) => {
  const dispatch = useDispatch();

  const onDeleteExperience = experienceId => dispatch(deleteExperience(experienceId));

  const handleDeleteExperience = experienceId => {
    onDeleteExperience(experienceId);
  }


  const mappedExperiences = experiences.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {exp.to === null ? (" Now") : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => handleDeleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ))

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { mappedExperiences }
        </tbody>
      </table>
    </>
  )
}

Experiences.propTypes = {
  experiences: PropTypes.array.isRequired
};

export default Experiences;
