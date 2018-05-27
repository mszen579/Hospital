import React, { Component } from 'react'
import AdminNav from './AdminNav';
import axios from 'axios';




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
        

        this.deleteVol = this.deleteVol.bind(this);
    }
      //deleting vol
      deleteVol(event){
        event.preventDefault();
    
        axios.delete(`http://localhost:8000/api/admin/vol/delete/${this.props.match.params.id}`)
        .then(function (response) {
            window.location.href = "/Admin-panel/Dashboardvolunteers";
        })
        .catch(function (error) {
          console.log(error);
        })
      }

      componentDidMount() {
        axios.get('http://localhost:8000/api/admin/singleVolunteer/'+this.props.match.params.id)
        .then((res)=>{
            this.setState({data: res.data})
        });
      }

      
    
    render() {

        
        return (
            <div>
                <AdminNav />
                <div>
                {this.state.data && <h1>{this.state.data.name}</h1>}
                {this.state.data && <p>{this.state.data.callName}</p>}
                {this.state.data && <p>{this.state.data.dateOfBirth}</p>}
                {this.state.data && <p>{this.state.data.gender}</p>}
                {this.state.data && <p>{this.state.data.address}</p>}
                {this.state.data && <p>{this.state.data.postCode}</p>}
                {this.state.data && <p>{this.state.data.city}</p>}
                {this.state.data && <p>{this.state.data.email}</p>}
                {this.state.data && <p>{this.state.data.phone}</p>}
                {this.state.data && <p>{this.state.data.mobile}</p>}
                {this.state.data && <p>{this.state.data.occupation}</p>}
                {this.state.data && <p>{this.state.data.believe}</p>}
                {this.state.data && <p>{this.state.data.marigeStatus}</p>}
                {this.state.data && <p>{this.state.data.availability}</p>}
                {this.state.data && <p>{this.state.data.motivation}</p>}
                {this.state.data && <p>{this.state.data.experience}</p>}
                {this.state.data && <p>{this.state.data.healthExper}</p>}
                {this.state.data && <p>{this.state.data.emotionalExper}</p>}
                {this.state.data && <p>{this.state.data.compassion}</p>}
                {this.state.data && <p>{this.state.data.workPreferences}</p>}
                {this.state.data && <p>{this.state.data.workExpectations}</p>}
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
