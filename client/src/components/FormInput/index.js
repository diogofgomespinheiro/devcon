//Library imports
import React from 'react'

//Style imports
import "./styles.css";

const FormInput = ({ handleChange, small, ...otherProps }) => {
  return (
    <div className="form-group">
      <input onChange={handleChange} {...otherProps}/>
      {
        small ?
        <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
        </small>
        : null
      }
    </div>
  )
}

export default FormInput;
