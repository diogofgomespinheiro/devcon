//Library imports
import React from "react";

//Style imports
import "./styles.css";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">DevCon</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <a href="#" className="btn btn-primary">
              Sign Up
            </a>
            <a href="#" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
