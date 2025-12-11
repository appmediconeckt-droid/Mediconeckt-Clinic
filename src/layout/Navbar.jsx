import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ position: "fixed", width: "100%", zIndex: 999 }}
      >
        <div className="container-fluid nav-conte">
          <div className="nav-content">
            {/* BRAND */}
            <div className="nav-bran d-flex align-items-center">
              <a
                className="nav-brand"
                href="#"
                style={{ textDecoration: "none" }}
              >
                Mediconeckt
              </a>
            </div>

            {/* RIGHT SIDE ICONS */}
            <div className="nav-main-icon d-flex align-items-center">
              {/* Emergency Icon */}
              <a className="emergency-icon " href="#">
                <i
                  className="fa-solid fa-triangle-exclamation"
                  style={{ fontSize: "20px", color: "red" }}
                ></i>
              </a>

              {/* Notification Icon */}

              <Link to="/notifications">
                <i className="fa-solid fa-bell"></i>
              </Link>

              {/* Profile Dropdown */}
              <div className="dropdown profile-element">
                <div
                  className=" fw-bold p-1 rounded-4 profile d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Profile Image */}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cd3WPk9UN_F0b0ieXUS5ufEV0fgYfuDO1Q&s"
                    alt="profile"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/changepassword">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
