import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const inlinestyle = {
    marginLeft: "10%",
    cursor: "pointer", // Add cursor pointer style
  };

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Use navigate function to redirect
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <img
            src="https://www.rnsit.ac.in/wp-content/themes/rnsit/webp/logo.webp"
            style={inlinestyle}
          />
          <NavLink to={"/"} className="link-without-underline" activeClassName="active-link">
            <h4 className="d-none d-lg-block" style={{ cursor: "pointer" }}>
              Home
            </h4>
          </NavLink>

          <h4 className="d-none d-lg-block" style={{ cursor: "pointer" }}>
            Contact
          </h4>
          <NavLink to={"/about"} className="link-without-underline" activeClassName="active-link">
            <h4 className="d-none d-lg-block" style={{ cursor: "pointer" }}>
              About
            </h4>
          </NavLink>

          <h4
            className="d-none d-lg-block"
            style={{ cursor: "pointer" }}
            onClick={handleLogin}
          >
            Login/Signup
          </h4>
          <h4
            className="log d-none d-lg-block"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </h4>
          {/* Toggle button for small screens */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas content */}
          <div
            className={`offcanvas offcanvas-end d-lg-none ${
              isNavOpen ? "show" : ""
            }`}
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                NAVBAR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={toggleNavbar}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Login/Signup
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
