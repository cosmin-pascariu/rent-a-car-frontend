import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useDispatch } from "react-redux";
import { registerAction } from "../../store/actions/authActions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("client");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registrationData = {
      email,
      password,
      userName,
      userType,
      contactNumber,
    };

    await dispatch(registerAction(registrationData));
    navigate("/login");
  };

  return (
    <div className="login">
      <h1>CAR RENTAL</h1>
      <h2>Register</h2>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>

          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />

          <input type="submit" value="Register" />
        </form>
        <a href="/login" className="link">
          Already have an account? Log in here!
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
