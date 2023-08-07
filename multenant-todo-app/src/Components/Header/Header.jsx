import React from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../Actions/AuthActions";
import { useSelector } from "react-redux";
import axiosInstance from "../../util/axiosInstance";
import "./Header.scss";
function Header({ userName }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  console.log("user is >>> ", user, isAuthenticated);
  //handle Logout
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/logout");
      dispatch(logout);
      navigate("/login");
    } catch (err) {
      return err;
    }
  };
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-logo-container">
          <h3 className="logo">MULTITENANT TODO</h3>
        </div>
        <div className="header-actions-container">
          <div className="header-action-message-container">
            <div className="header-action-message">
              <p className="header-action-welcome-message">Welcome</p>
              {userName && (
                <span className="header-action-username">
                  {userName && userName}
                </span>
              )}
            </div>
          </div>
          <div className="header-action-button-container">
            <button
              className="header-action-button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
