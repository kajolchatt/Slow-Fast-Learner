import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from 'react';
import "./Navbar.css";
function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const inlinestyle = {
    marginLeft: "10%",
  };

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <img
            src="https://www.rnsit.ac.in/wp-content/themes/rnsit/webp/logo.webp"
            style={inlinestyle}
          />
          <h4 className="d-none d-lg-block">Home</h4>
          <h4 className="d-none d-lg-block">Contact</h4>
          <h4 className="d-none d-lg-block">About</h4>
          <h4 className="log d-none d-lg-block">Login</h4>
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
            className={`offcanvas offcanvas-end d-lg-none ${isNavOpen ? 'show' : ''}`}
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                DASHBOARD
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
                    Link
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
