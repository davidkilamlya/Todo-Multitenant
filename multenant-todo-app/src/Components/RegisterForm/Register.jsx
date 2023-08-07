import React, { useState } from "react";
import "../LoginForm/LoginForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { baseUrl } from "../../constants/baseUrl";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function LoginForm() {
  const navigate = useNavigate();

  //login state variables
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [statusColor, setStatusColor] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //handle email change
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  //handle email change
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  //handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  //handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userDetails = {
        firstName,
        lastName,
        email,
        password,
      };
      const response = await axios.post(`${baseUrl}register`, userDetails);
      if (response.status === 201) {
        console.log(response.data);
        setStatusMessage("success");
        setStatusColor("green");
        setIsLoading(false);
        //navigate user to homepage
        navigate("/login");
      } else {
        console.log(response.status);
      }
    } catch (err) {
      const error = err.response.data.message;

      setStatusColor("red");
      setIsLoading(false);
      setStatusMessage(error);
      console.log("errow", error);
    }

    console.log(email, password);
  };

  return (
    <div className="todo-login">
      <h1>MULTITENANT TODO</h1>
      {isLoading && <LoadingSpinner />}
      {statusMessage && (
        <ErrorBoundary message={statusMessage} color={statusColor} />
      )}
      <div className="todo-login-container">
        <div className="login-title">
          <span>Register now</span>
        </div>
        <div className="login-form">
          <form className="form" onSubmit={handleRegisterSubmit}>
            <div className="login-email-container text-input">
              <div className="input-label-container">
                <span className="input-label">Firstname</span>
              </div>
              <input
                type="text"
                name="firstname"
                placeholder="first name"
                onChange={(e) => handleFirstNameChange(e)}
                required
                className="first-name-input form-input"
              />
            </div>

            <div className="login-last-name-container text-input">
              <div className="input-label-container">
                <span className="input-label">Lastname</span>
              </div>
              <input
                type="text"
                name="lastname"
                placeholder="lastname"
                onChange={(e) => handleLastNameChange(e)}
                required
                className="last-name-input form-input"
              />
            </div>

            <div className="login-email-container text-input">
              <div className="input-label-container">
                <span className="input-label">Email</span>
              </div>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={(e) => handleEmailChange(e)}
                required
                className="email-input form-input"
              />
            </div>
            <div className="login-password-container text-input">
              <div className="input-label-container">
                <span className="input-label">password</span>
              </div>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => handlePasswordChange(e)}
                required
                className="password-input form-input"
              />
            </div>
            <div className="form-button-container">
              <button type="submit" className="register-button form-button">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="register-handle-container">
          <span className="register-desc"> Have an account</span>
          <a href="/login" className="register-title">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
