import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from "../services/authService";

function renderUserInfo(user) {
  if (user)
    return (
      <React.Fragment>
        <NavLink
          onClick={auth.logout}
          className="navbar__item navbar__item--right"
          to="/"
        >
          Logout
        </NavLink>
        <NavLink className="navbar__item navbar__item--right" to="/">
          {user.name}
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

const NavBar = () => {
  const [user, setUser] = useState(auth.getCurrentUser());
  auth.setNavBarUpdate(setUser);
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
      {renderUserInfo(user)}
    </nav>
  );
};
export default NavBar;
