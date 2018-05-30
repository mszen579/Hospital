import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);
const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
})

export default class DeleteAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.deleteadmin = this.deleteadmin.bind(this);
    }
    
    deleteadmin(event) {
        event.preventDefault();
        swalWithBootstrapButtons({
            title: 'Are you sure you want to delete this admin?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,

        })
            .then((result) => {
                if (result.value) {
                    axios.delete("http://localhost:8000/api/admin/delete/" + this.props.id)
                        .then(function (response) {
                            this.setState({ user: null })
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                    swalWithBootstrapButtons(
                        'Deleted!',
                        'Admin has been Deleted',
                        'success',
                        window.location.href = "/Admin-panel/allAdmins"
                    )
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons(
                        'Cancelled',
                        'Cancelled Admin delete',
                        'error'
                    )
                }
            }
            );
    }

    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.deleteadmin} >Verwijderen</button>
            </div>
        )
    }
}
