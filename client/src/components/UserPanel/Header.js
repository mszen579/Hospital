//Header.js
import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; //this is for routing

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to={"/"}>
                WebSiteName
              </Link>
            </div>
            <ul className="nav navbar-nav">
              <li className="active">
              <Link className="navbar-brand" to={"/"}>
                Home
              </Link>
              </li>
              <li>
              <Link className="navbar-brand" to={"/Volunteer"}>
                Volunteer
              </Link>
              </li>
              <li>
              <Link className="navbar-brand" to={"/News"}>
                News
              </Link>
              </li>
              <li>
              <Link className="navbar-brand" to={"/Aboutus"}>
                About us
              </Link>
              </li>
              <li>
              <Link className="navbar-brand" to={"/Donation"}>
              Donation
              </Link>
              </li>
            </ul>
            <button className="btn btn-danger navbar-btn">Button</button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
