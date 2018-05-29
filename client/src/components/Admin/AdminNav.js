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

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }


    handleLogOut() {
        axios.get('http://localhost:8000/api/admin/logout')
            .then(function (response) {
                this.setState({ admin: null })

            })
            .catch(function (error) {
                console.log(error);
            })
        window.location.href = '/adminwsq'
    }

    componentDidMount() {

        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'SuperAdmin' || res.data.jobTitle === 'Admin') {
                this.setState({ admin: res.data, loading: false })
            } else {
                this.setState({ admin: null, loading: false })
            }
        });
    }

    render() {
        if (this.state.loading) {
            return <p>Loading your information, please be patient</p>
        } else {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark">

                    <ul className="nav navbar-nav">
                        {this.state.admin && <h1> Hello, {this.state.admin.name}</h1>}&nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink exact to="/Admin-panel/DashboardArticle" style={{ color: 'white' }}>List of articles</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink exact to="/Admin-panel/AddArticle" style={{ color: 'white' }}>Adding article</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
                       
                        <NavLink exact to="/Admin-panel/allAdmins" style={{ color: 'white' }}>List of Admins</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink exact to="/Admin-panel/Register" style={{ color: 'white' }}>Add Admin</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink exact to="/Admin-panel/Dashboardvolunteers" style={{ color: 'white' }}>List of Volunteer Aplications</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a style={{ cursor: 'pointer' }} style={{ color: 'red' }} onClick={this.handleLogOut}><strong style={{ color: 'red' }}>Logout</strong></a>&nbsp;&nbsp;&nbsp;&nbsp;
                    </ul>
                    <br />
                </nav>

            )
        }
    }
}

export default AdminNav
