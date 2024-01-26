import React, { useState } from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/authActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <div className="login">
      <h1>CAR RENTAL</h1>
      <h2>Log In</h2>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <input type="submit" value="Log In" />
        </form>
        <a href="/register" className="link">
          Don't have an account? Register here!
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
