//Header.js
import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; //this is for routing

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="">
                    <div className="">
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <Link className="" to={"/"}>
                                    <img src={require("../../assests/logoicon.ico")} width="30" alt="logo"/> 
                                </Link>
                            </li>
                            <li className="active">
                                <Link className="" to={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="" to={"/Volunteer"}>
                                    Volunteer
                                </Link>
                            </li>
                            <li>
                                <Link className="" to={"/News"}>
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link className="" to={"/Aboutus"}>
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link className="" to={"/Contactus"}>
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link className="" to={"/Donation"}>
                                    Donation
                                </Link>
                            </li>
                            <li>
                                <a style={{ color: "white" }} href="https://www.doneeractie.nl/stichting-hospice-amsterdam-zuidoost/-28298" className="btn btn-danger">DONATE</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br />
                <br />
                <br />
            </div>
        );
    }
}


// <nav className="navbar navbar-inverse">
// <div className="container-fluid">
//   <div className="navbar-header">
//     <Link className="navbar-brand" to={"/"}>
//       WebSiteName
//     </Link>
//   </div>
//   <ul className="nav navbar-nav">
//     <li className="active">
//     <Link className="navbar-brand" to={"/"}>
//       Home
//     </Link>
//     </li>
//     <li>
//     <Link className="navbar-brand" to={"/Volunteer"}>
//       Volunteer
//     </Link>
//     </li>
//     <li>
//     <Link className="navbar-brand" to={"/News"}>
//       News
//     </Link>
//     </li>
//     <li>
//     <Link className="navbar-brand" to={"/Aboutus"}>
//       About us
//     </Link>
//     </li>
//     <li>
//     <Link className="navbar-brand" to={"/Donation"}>
//     Donation
//     </Link>
//     </li>
//     <li>
//     <a style={{color: "white"}} href="https://www.doneeractie.nl/stichting-hospice-amsterdam-zuidoost/-28298" className="btn btn-danger">DONATE</a>
//     </li>
//   </ul>
// </div>
// </nav>