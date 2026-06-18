import React from "react";
import "../styles/Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar">
        <div className="logo-section">
            <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="nav-links">
            <Link to="/about">About</Link>
        </div>
    </nav>
  );
}

export default Header;