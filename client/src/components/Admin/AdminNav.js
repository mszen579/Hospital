import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class AdminNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      admin: null

    } 
     
    
    this.handleLogOut = this.handleLogOut.bind(this);
  }


  handleLogOut() {
    let _this = this;
    axios.get('http://localhost:8000/api/admin/logout')
      .then(function (response) {
        _this.setState({ admin: null })
       
      })
      .catch(function (error) {
        console.log(error);
      })
      window.location.href = '/adminwsq'
  }

  componentDidMount() {


    let _this = this;

    axios.get('http://localhost:8000/api/current_Admin')
      .then(function (response) {
        if (response.data.error) {
          _this.setState({ loading: false })
        } else {
          _this.setState({ admin: response.data, loading: false })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    if (this.state.loading) {
      return <p>Loading your information, please be patient</p>
    }  else {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark">

          <ul className="nav navbar-nav">
          {this.state.admin && <h1> Hello, {this.state.admin.id}</h1> }&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink exact to="/Admin-panel/DashboardArticle" className="nav-item nav-link">List of articles</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink exact to="/Admin-panel/AddArticle" className="nav-item nav-link">Adding article</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink exact to="/Admin-panel/Register" className="nav-item nav-link">Add Admin</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink exact to="/Admin-panel/allAdmins" className="nav-item nav-link">List of Admins</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink exact to="/Admin-panel/Dashboardvolunteers" className="nav-item nav-link">List of Volunteer Aplications</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
            <a style={{ cursor: 'pointer' }} className="text-danger" onClick={this.handleLogOut}>Logout</a>&nbsp;&nbsp;&nbsp;&nbsp;
          </ul>

          <ul className="nav navbar-nav ml-auto">
        
          </ul>
        </nav>

      )
    }
  }
}

export default AdminNav
