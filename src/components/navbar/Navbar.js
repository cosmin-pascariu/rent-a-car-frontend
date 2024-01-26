import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/actions/authActions";
import parseJwt from "../../utils/jwtDecoder";

function Navbar() {
  const dispatch = useDispatch();

  const userName = parseJwt(localStorage.getItem("token")).user.userName;

  const handleLogout = async () => {
    alert("Are you sure you want to log out?");
    dispatch(logoutAction());
  };

  return (
    <div className="navbar">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/cars" className="link">
        Cars
      </Link>
      <Link to="/reservations" className="link">
        Reservations
      </Link>
      <h3>{userName && "Username: " + userName}</h3>
      <button className="logout-button" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
