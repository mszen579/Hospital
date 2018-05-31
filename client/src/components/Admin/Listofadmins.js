import React, { Component } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import DeleteAdmin from './DeleteAdmin';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);
const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
})




class Listofadmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin:{

            },
            admins: null
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }


    //deleting admin
    


    componentDidMount() {
        axios.get('http://localhost:8000/api/admin/alladmins')
        .then((res) => this.setState({ admins: res.data }))

        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'SuperAdmin') {
                this.setState({ admin: res.data, loading: false })
            } else if (res.data.jobTitle === 'Admin'){
                window.location.href = "/Admin-panel/DashboardArticle"
            } else {
                window.location.href = "/adminwsq"
            }
        });
    }

    render() {
        return (
            <div>
                <AdminNav />
                <h1>Alle geregisteerde admin's</h1>

                {this.state.admins && this.state.admins.map((admin =>{
                    return(
                        <ul className='admins' key={admin._id}>
                            <div className="card-body">
                                <h3 className="card-title">Admin naam: {admin.name}
                                    <br />Email: {admin.email}
                                    <br />Admin Rang: {admin.jobTitle}</h3>
                                <DeleteAdmin key={admin._id} id={admin._id} /><br/>
                                <hr />
                            </div>
                            
                        </ul>
                    )
                }))}
            </div>
        );
    }
}

export default Listofadmins;
