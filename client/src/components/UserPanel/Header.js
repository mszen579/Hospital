import React, { Component } from "react";
// import Script from "react-script-tag";
import { Link } from "react-router-dom";







export default class Header extends Component {


    render() {
        return       <div>
  
            <header id="header">
              <div className="menu_area">
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                  {" "}
                  <div className="container">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">
                          Toggle navigation
                        </span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                      <a className="navbar-brand logoicon" href="index.html">
                        {" "}
                        <Link  to={"/"}>
                          <img className="logoicon" style={{"margin-top" : "-20px"}}  src={require("../../assests/logoicon.ico")} width="60" alt="logo" />
                        </Link>
                      </a>
                      <a className="navbar-brand" style={{"margin-top" : "5px"}} href="index.html">
                        Hospice <br /> <span>A.Z.O</span>
                      </a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                      <ul id="top-menu" className="nav navbar-nav navbar-right main-nav">
                        <li className="active">
                          <Link className="" to={"/"}>
                            {" "}
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link className="" to={"/Volunteer"}>
                            {" "}
                            vrijwilliger worden?
                          </Link>
                        </li>
                        <li>
                          <Link className="" to={"/News"}>
                            {" "}
                            Nieuws
                          </Link>
                        </li>
                   
                        <li>
                          <Link className="" to={"/Contactus"}>
                            {" "}
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link className="" to={"/Donation"}>
                            {" "}
                            Donaties
                          </Link>
                        </li>
                        <li>
                          <a style={{ color: "white" }} href="https://www.doneeractie.nl/stichting-hospice-amsterdam-zuidoost/-28298" className="btn btn-danger">
                            doneer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </header> }
            
        </div>
    }
}
