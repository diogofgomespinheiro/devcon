//Library imports
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//Component imports

//Redux imports
import { createProfile, getCurrentProfile } from "../../../../store/modules/profile/actions";

const EditProfile = ( { history } ) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const profile = useSelector(state => state.profile.profile);
  const isLoading = useSelector(state => state.profile.isLoading);

  const dispatch = useDispatch();

  const onGetProfile = useCallback(() => dispatch(getCurrentProfile()), [dispatch]);
  const onCreateProfile = (formData,history) => dispatch(createProfile(formData,history,true));

  useEffect(() => {
    onGetProfile();

    setFormData({
      company: isLoading || !profile.company ? '' : profile.company,
      website: isLoading || !profile.website ? '' : profile.website,
      location: isLoading || !profile.location ? '' : profile.location,
      status: isLoading || !profile.status ? '' : profile.status,
      skills: isLoading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        isLoading || !profile.githubusername ? '' : profile.githubusername,
      bio: isLoading || !profile.bio ? '' : profile.bio,
      twitter: isLoading || !profile.social ? '' : profile.social.twitter,
      facebook: isLoading || !profile.social ? '' : profile.social.facebook,
      linkedin: isLoading || !profile.social ? '' : profile.social.linkedin,
      youtube: isLoading || !profile.social ? '' : profile.social.youtube,
      instagram: isLoading || !profile.social ? '' : profile.social.instagram
    })
  }, [onGetProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value});
  }

  const handleSubmit = event => {
    event.preventDefault();
    onCreateProfile(formData, history);
  }

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={handleChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={handleChange}/>
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={handleChange}/>
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange}/>
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleChange}/>
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} 
            onChange={handleChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleChange}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(prevState => !prevState)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={handleChange}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={handleChange}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={handleChange}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={handleChange}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={handleChange}/>
            </div>
          </>
        )}

        <input type="submit" value="Update" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default withRouter(EditProfile);
