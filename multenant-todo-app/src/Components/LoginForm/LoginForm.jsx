import React, { useEffect, useState } from "react";
import "./LoginForm.scss";
import axiosInstance from "../../util/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { baseUrl } from "../../constants/baseUrl";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Actions/AuthActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function LoginForm() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(()=>{
  //    if (isAuthenticated) {
  //   navigate("/");
  // }
  // })
 
  //login state variables
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [statusColor, setStatusColor] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  //handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userDetails = {
        email,
        password,
      };
      const user = await axiosInstance.post(`/login`, userDetails);
      dispatch(loginSuccess(user.data.user));
      setStatusMessage("success");
      console.log(user, isAuthenticated);
      setStatusColor("green");
      setIsLoading(false);
      //navigate user to homepage
      navigate("/");
    } catch (err) {
      // const error = err.response.data.message;
      setStatusMessage(err.data);
      console.log(err);
      setStatusColor("red");
      // console.log("error", error);
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
          <span>Login in now to Multitenant App</span>
        </div>
        <div className="login-form">
          <form className="form" onSubmit={handleSubmit}>
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
              <button type="submit" className="login-button form-button">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="register-handle-container">
          <span className="register-desc"> don't have an account</span>
          <a href="/register" className="register-title">
            register
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
