import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Github } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <Github size={24} />
          <span>DevSphere</span>
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/projects"
              className={location.pathname === "/projects" ? "active" : ""}
            >
              Projects
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
