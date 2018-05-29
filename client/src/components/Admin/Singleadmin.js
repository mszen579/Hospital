//Singleadmin.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import dateFormat from 'dateFormat';
var now = new Date();



// Basic usage
// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");


function Detail(props) {
    var data = props.adminData;
    return (
        <div className="card">
            <h1 className="card-header">
                Single admin Details
                </h1>
            <div className="card-body">
                <h2 className="card-title">Admin name: {admin.name}</h2>
                <h3 className="card-title">Email: {admin.email}</h3>


            </div>
        </div>
    )
}

class Singleadmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admininfo: null
        }
        axios.get('http://localhost:8000/api/admin/' + this.props.match.params._id)
            .then((res) => this.setState({ admininfo: res.data }))
        this.deleteadmin = this.deleteadmin.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            console.log(res);
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'SuperAdmin' || res.data.jobTitle === 'Admin') {
                this.setState({ admin: res.data, loading: false })
            } else if (res.data.jobTitle === 'Admin') {
                this.setState({ admin: res.data, loading: false })
                window.location.href = "/Admin-panel/DashboardArticle"
            } else {
                window.location.href = "/adminwsq"
            }
        });
    }

    //deleting admin
    deleteadmin(event) {
        event.preventDefault();
        let _this = this;
        axios.delete("http://localhost:8000/api/admin/delete/:id" + this.props.match.params._id)
            .then(function (response) {
                _this.setState({ user: null })
            })
            .catch(function (error) {
                console.log(error);
            })
        window.location.href = "/";
    }

    render() {
        return (
            <div>

                {this.state.admininfo && <Detail adminData={this.state.admininfo} />}
                <br />
                <Link className="btn btn-danger" onClick={this.deleteadmin} to="/">Delete this admin</Link>
            </div>
        );
    }
}

export default Singleadmin;