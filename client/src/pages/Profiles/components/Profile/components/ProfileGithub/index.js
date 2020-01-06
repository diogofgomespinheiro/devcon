//Library imports
import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

//Component imports
import Spinner from "../../../../../../components/Spinner";

//Redux imports
import { getGithubRepos } from "../../../../../../store/modules/profile/actions";

//Style imports
import "./styles.css";

const ProfileGithub = ({ username }) => {
  const repos = useSelector(state => state.profile.repos);

  const dispatch = useDispatch();

  const onGetRepos = useCallback(
    username => dispatch(getGithubRepos(username)),
    [dispatch]
  );

  useEffect(() => {
    onGetRepos(username)
  }, [onGetRepos, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default React.memo(ProfileGithub);
