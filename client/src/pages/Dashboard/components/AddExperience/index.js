//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Redux imports
import { addExperience } from "../../../../store/modules/profile/actions";

const AddExperience = ( { history } ) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false, 
    description: ""
  });

  const [toDateDisabled, toggleToDate] = useState(false);

  const {
    company,
    title,
    location,
    from,
    to,
    current, 
    description
  } = formData;

  const dispatch = useDispatch();

  const onAddExperience = (formData, history) =>
    dispatch(addExperience(formData, history));

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleChangeCurrent = () => {
    setFormData({ ...formData, current: !current});
    toggleToDate(!toDateDisabled);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddExperience(formData,history);
  }

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={handleChange} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value={current} onChange={handleChangeCurrent} /> Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={handleChange} disabled={toDateDisabled ? "disabled" : ""} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={handleChange}
          ></textarea>
        </div>
        <input type="submit" value="Add" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddExperience;
