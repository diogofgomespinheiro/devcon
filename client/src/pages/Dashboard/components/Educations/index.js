//Library imports
import React from 'react';
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import PropTypes from 'prop-types';

//Redux imports
import { deleteEducation } from "../../../../store/modules/profile/actions";


const Educations = ({ educations }) => {
  const dispatch = useDispatch();

  const onDeleteEducation = educationId => dispatch(deleteEducation(educationId));

  const handleDeleteEducation = educationId => {
    onDeleteEducation(educationId);
  }

  const mappedEducations = educations.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.fieldofstudy}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {edu.to === null ? (" Now") : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => handleDeleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
  ))

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { mappedEducations }
        </tbody>
      </table>
    </>
  )
}

Educations.propTypes = {
  educations: PropTypes.array.isRequired
};

export default Educations;