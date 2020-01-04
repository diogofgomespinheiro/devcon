//Library imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Redux imports
import { logout } from "../../store/modules/auth/actions";

//Style imports
import "./styles.css";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);

  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  const authLinks = (
    <ul>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevCon
        </Link>
      </h1>
      { !isLoading && (<>{ isAuthenticated ? authLinks : guestLinks }</>)}
    </nav>
  );
};

export default Navbar;
