import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../Actions/AuthActions";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import axiosInstance from "../../util/axiosInstance";
import "./Header.scss";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.userName);

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
              {userName ? (
                <span className="header-action-username">
                  {userName && userName}
                </span>
              ) : (
                <a href="/login" className="header-action-username">
                  Login
                </a>
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
      <div className="home-nav-container">
        <div className="home-nav">
          <div className="home-nav-link-container">
            <a href="/" className="home-nav-link">
              Home
            </a>
          </div>
          <div className="home-nav-indicator-container">
            <MdOutlineKeyboardDoubleArrowLeft className="home-nav-link-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
