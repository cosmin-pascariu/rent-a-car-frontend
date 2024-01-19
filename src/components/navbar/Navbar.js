import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/cars" className="link">
        Cars
      </Link>
      <Link to="/cars/add" className="link">
        Add Car
      </Link>
    </div>
  );
}

export default Navbar;
