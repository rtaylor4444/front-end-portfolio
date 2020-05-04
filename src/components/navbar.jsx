import React from "react";
import { NavLink } from "react-router-dom";
import auth from "../services/authService";

function renderUserInfo(user) {
  //BUG - users name to be displayed
  if (user)
    return (
      <React.Fragment>
        <NavLink className="navbar__item navbar__item--right" to="/logout">
          Logout
        </NavLink>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <NavLink className="navbar__item navbar__item--right" to="/login">
        Login
      </NavLink>
      <NavLink className="navbar__item navbar__item--right" to="/register">
        Register
      </NavLink>
    </React.Fragment>
  );
}

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__item" to="/">
        Home
      </NavLink>
      <NavLink className="navbar__item" to="/projects">
        Projects
      </NavLink>
      <NavLink className="navbar__item" to="/blog">
        Blog
      </NavLink>
      <NavLink className="navbar__item" to="/contact">
        Contact Me
      </NavLink>
      {renderUserInfo(auth.getCurrentUser())}
    </nav>
  );
};
export default NavBar;

/*
  <nav className="navbar navbar-expand-md navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Rob Taylor
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/projects">
            Projects
          </NavLink>
          <NavLink className="nav-item nav-link" to="/blog">
            Blog
          </NavLink>
          <NavLink className="nav-item nav-link" to="/contact">
            Contact Me
          </NavLink>
          {renderUserInfo(auth.getCurrentUser())}
        </div>
      </div>
    </nav>
*/
