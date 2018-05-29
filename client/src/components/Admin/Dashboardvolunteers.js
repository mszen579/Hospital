import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import Moment from "react-moment";


class Dashboardvolunteers extends Component {
    constructor(props) {
        super(props);

        this.state = {

            Forms: null,
            loading: true,
            admin: {

            }

        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }




    componentDidMount() {
        axios.get("http://localhost:8000/api/admin/listofVolunteers")
        .then((response) => {
            if (response.data.error) {
                this.setState({ loading: false })
            } else {
                this.setState({ Forms: response.data, loading: false, })
            }
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'SuperAdmin' || res.data.jobTitle === 'Admin') {
                this.setState({ admin: res.data, loading: false })
            } else {
                window.location.href = "/Admin-panel/DashboardArticle"
            }
        });
    }

    render() {
        return (
            <div>
                <AdminNav />
                <h1>Volunteer Dashboard</h1>

                <div className="table-responsive-md">
                    <table className="table table-hover">
                        <thead>
                            <tr>

                                <th scope="col" colSpan={1}>name</th>
                                <th scope="col" colSpan={2}>Received at</th>
                                <th scope="col" colSpan={3}>More</th>

                            </tr>
                        </thead>
                        <tbody>

                            {this.state.Forms && this.state.Forms.map(function (Form) {
                                return (
                                    <tr key={Form._id}>
                                        <td colSpan={1}>{Form.name}</td>
                                        <td colSpan={2}>
                                            <Moment className="text-muted" format="Do MMM YYYY">
                                                {Form.createdAt}
                                            </Moment>

                                        </td>
                                        <td colSpan={3}><Link className="btn btn-primary" to={`/Admin-panel/${Form._id}/Singlevolunteer`}>View details</Link></td>
                                    </tr>
                                )
                            }.bind(this))}
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }
}
export default Dashboardvolunteers;