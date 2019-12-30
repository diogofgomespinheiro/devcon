//Library imports
import React from "react";
import { Link } from "react-router-dom";

//Style imports
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevCon
        </Link>
      </h1>
      <ul>
        <li>
          <a href="#">Developers</a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
