import { Link } from "react-router-dom";
import { CurrentUserDataContext } from "../utils/contexts/currentUserDataContext";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentTwoToneIcon from "@mui/icons-material/AssessmentTwoTone";
import Divider from "@mui/material/Divider";
import ProtectedElement from "./ProtectedElement";

import headerLogo from "../assets/logo.png";

function Header({ logoutUser }) {
  const { isLoggedIn, currentUserData } = useContext(CurrentUserDataContext);
  const [profileDropdownVisibile, setProfDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const timerRef = useRef(null);

  function showProfileDropdown() {
    setProfDropdownVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current); // Clear any existing timer
    }

    timerRef.current = setTimeout(() => {
      setProfDropdownVisible(false);
      timerRef.current = null;
    }, 2000);
  }

  function hideProfileDropdown() {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Clear any existing timer
    }
    timerRef.current = setTimeout(() => {
      setProfDropdownVisible(false);
      timerRef.current = null; // Reset the reference
    }, 200);
  }

  // clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function handleSubscriptionClk() {
    navigate("/subscribe");
  }

  function handleReportsClk() {
    navigate("/reports");
  }

  function handleAdminPgClk() {
    navigate("/admin");
  }

  return (
    <header className="header">
      <div className="header__left-side">
        <Link className="header__link" to="/">
          <img src={headerLogo} alt="Prunely logo" className="header__logo" />
        </Link>
      </div>
      <ul className="header__right-side-list">
        <li className="header__list-item">
          <Link className="header__link">About Us</Link>
        </li>
        <li className="header__list-item">
          {isLoggedIn && (
            <div
              className="header__profile-container"
              onMouseEnter={showProfileDropdown}
            >
              <Link className="header__link">
                {currentUserData.avatar && (
                  <img
                    src={currentUserData.avatar}
                    alt={currentUserData.username}
                    className="header__avatar"
                  />
                )}{" "}
                My Profile
              </Link>
              {profileDropdownVisibile && (
                <ul
                  className="header__profile-list"
                  onMouseLeave={hideProfileDropdown}
                >
                  <ProtectedElement
                    isAllowed={
                      isLoggedIn &&
                      currentUserData.subscriptionTier === "Premium"
                    }
                  >
                    <li
                      className="header__profile-list-item"
                      onClick={handleAdminPgClk}
                    >
                      *Admin Pg
                    </li>
                    <li
                      className="header__profile-list-item"
                      onClick={handleReportsClk}
                    >
                      <AssessmentTwoToneIcon />
                      Reports
                    </li>
                  </ProtectedElement>
                  <li
                    className="header__profile-list-item"
                    onClick={handleSubscriptionClk}
                  >
                    Subscription
                  </li>
                  <li
                    className="header__profile-list-item"
                    onClick={logoutUser}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="header__link">
              Login
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
