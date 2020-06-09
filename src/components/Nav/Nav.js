import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h2 className="logo">Pace!</h2>
      </Link>
      <ul className="nav-links">
        <Link to="/welcome">
          <li className="dash">Community Dashboard</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
