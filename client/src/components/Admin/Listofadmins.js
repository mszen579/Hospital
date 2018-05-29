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
            admins: null
        }
        
    }


    //deleting admin
    


    componentDidMount() {
        axios.get('http://localhost:8000/api/admin/alladmins')
            .then((res) => this.setState({ admins: res.data }))
    }

    render() {
        return (
            <div>
                <AdminNav />
                <h1>All Registered admins</h1>

                {this.state.admins && this.state.admins.map((admin =>{
                    return(
                        <ul className='admins' key={admin._id}>
                            <div className="card-body">
                                <h3 className="card-title">Admin name: {admin.name}
                                    <br />Email: {admin.email}
                                    <br />Admin Rank: {admin.jobTitle}</h3>
                                <DeleteAdmin key={admin._id} id={admin._id} />
                                
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
