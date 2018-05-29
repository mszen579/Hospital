import React, { Component } from 'react'
import AdminNav from './AdminNav';
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Moment from "react-moment";
const swal = withReactContent(Swal);


const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
})




export default class Singlevolunteer extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            data: {
                name: '',
                callName: '',
                dateOfBirth: '',
                gender: '',
                address: '',
                postCode: '',
                city: '',
                email: '',
                phone: '',
                mobile: '',
                occupation: '',
                believe: '',
                marigeStatus: '',
                availability: '',
                motivation: '',
                experience: '',
                healthExper: '',
                emotionalExper: '',
                compassion: '',
                workPreferences: '',
                workExpectations: '',
            }
        }
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.deleteVol = this.deleteVol.bind(this);
    }

    //deleting vol
    deleteVol(event) {
        event.preventDefault();
        swalWithBootstrapButtons({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,

        }).then((result) => {
            if (result.value) {
                axios
                    .delete(`http://localhost:8000/api/admin/vol/delete/${this.props.match.params.id}`)
                    .then(function (response) {



                    })
                    .catch(function (error) {
                        console.log(error);
                    });


                swalWithBootstrapButtons(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                    window.location.href = "/Admin-panel/Dashboardvolunteers"
                )
            } else if(
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/admin/singleVolunteer/' + this.props.match.params.id)
            .then((res) => {
                this.setState({ data: res.data })
            });

        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            console.log(res);
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'SuperAdmin' || res.data.jobTitle === 'Admin') {
                this.setState({ admin: res.data, loading: false })
            } else {
                window.location.href = "/adminwsq"
            }
        });
    }

      
    
    render() {

        
        return (
            <div>
                <AdminNav />
                <div>
                {this.state.data && <h1>Naam: {this.state.data.name}</h1>}
                {this.state.data && <p>Roepname: {this.state.data.callName}</p>}
               
                    Geboortedatum: {this.state.data && <Moment className="text-muted" format="Do MMM YYYY">
                        <p>{this.state.data.dateOfBirth}</p> 
                    </Moment>}
                {this.state.data && <p>Geslacht: {this.state.data.gender}</p>}
                {this.state.data && <p>Adres: {this.state.data.address}</p>}
                {this.state.data && <p>Postcode: {this.state.data.postCode}</p>}
                {this.state.data && <p>Plaats: {this.state.data.city}</p>}
                {this.state.data && <p>E-mailadres: {this.state.data.email}</p>}
                {this.state.data && <p>Telefoonnummer: {this.state.data.phone}</p>}
                {this.state.data && <p>Mobiel: {this.state.data.mobile}</p>}
                {this.state.data && <p>Beroep / Opleiding: {this.state.data.occupation}</p>}
                {this.state.data && <p>Levensovertuiging: {this.state.data.believe}</p>}
                {this.state.data && <p>Burgerlijke staat: {this.state.data.marigeStatus}</p>}
                {this.state.data && <p>Inzetbaarheid: {this.state.data.availability}</p>}
                <br /><br /><br />
                <p><b>1. Waarom wilt u vrijwilligerswerk doen<br /> in het Hospice Amsterdam Zuidoost?</b><br/>
                {this.state.data && this.state.data.motivation }</p>
                <p><b>2. Heeft u ervaring met vrijwilligerswerk?<br /> Zo ja, welk/wat?</b><br />
                {this.state.data && this.state.data.experience}</p>
                <p><b>3. Heeft u ervaring in de zorgsector of zorg voor een ander?<br /> Zo ja, graag een omschrijving wat deze ervaring inhoudt</b><br />
                {this.state.data && this.state.data.healthExper}</p>}
                <p><b>4. Heeft u zelf ervaring met het verliezen van een dierbare?<br /> Welke rol speelt dit bij uw keuze?</b><br />
                {this.state.data && this.state.data.emotionalExper}</p>}
                <p><b>5. Wat zou voor u belangrijk zijn in de laatste levensfase?</b><br />
                {this.state.data && this.state.data.compassion}</p>
                <p><b>6. Wat zou u kunnen bieden binnen het hospice?<br /> Welke werkzaamheden binnen het hospice hebben uw voorkeur?</b><br />
                {this.state.data && this.state.data.workPreferences}</p>
                <p><b>7. Wat verwacht u van het werk binnen het hospice?</b><br />
                {this.state.data && this.state.data.workExpectations}</p>
                <button className="btn btn-secondary" onClick={() => window.print()}>PRINT</button>
                <br />
                <br />
                <br />
                <button className="btn btn-danger" onClick={this.deleteVol}>Delete</button>
                </div>
            </div>
        )
    }
}
