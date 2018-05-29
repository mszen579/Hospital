import React, { Component } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';


function Result(props) {
    return (

        props.admins.map((admin) => {
            return (

                <ul className='admins' key={admin._id}>
                    <div className="card-body">
                        <h2 className="card-title">Admin name: {admin.name}</h2>
                        <h3 className="card-title">Email: {admin.email}</h3>
                        {/* <button className="btn btn-danger" onClick={this.deleteadmin} to="/">Delete</button> */}
                        <hr />
                    </div>
                </ul>

            )
        })
    )
}


class Listofadmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: null
        }
        this.deleteadmin = this.deleteadmin.bind(this);
    }


    //deleting admin
    deleteadmin(event) {
        event.preventDefault();
        let _this = this;
        axios.delete("http://localhost:8000/api/admin/delete/" + this.props.match.params._id)
            .then(function (response) {
                _this.setState({ user: null })
            })
            .catch(function (error) {
                console.log(error);
            })
        window.location.href = "/";
    }


    componentDidMount() {
        axios.get('http://localhost:8000/api/admin/alladmins')
            .then((res) => this.setState({ admins: res.data }))
    }

    render() {
        return (
            <div>
                <AdminNav />
                <h1>All Registered admins</h1>

                {this.state.admins && <Result admins={this.state.admins} />}
            </div>
        );
    }
}

export default Listofadmins;
