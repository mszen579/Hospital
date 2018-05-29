import React, { Component } from 'react'
import axios from 'axios';
import Moment from "react-moment";
import {Link} from 'react-router-dom';



export default class Singlearticle extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: {
                title: '',
                Video: '',
                location: '',
                ShortDescription: '',
                profilePic:""
            }
        }
        
     }
     
      




      componentDidMount() {
        axios.get('http://localhost:8000/Article/profileinfo/'+this.props.match.params.id)
        .then((res)=>{
            this.setState({data: res.data})
        });
      }

      
    
    render() {

        
        return (
     
            <div>
                <div id="print-mount">
                {this.state.data && <h1>{this.state.data.title}</h1>}
                {this.state.data && <p><strong>Video link: </strong> {this.state.data.Video}</p>}<br />
                {this.state.data &&
                <img src={`http://localhost:8000/uploads/${this.state.data.profilePic}`} width="100" height="120" />}<br /><br/><br/>
                <strong>Added on: </strong>   {this.state.data && <Moment className="text-muted" format="Do MMM YYYY">
                        {this.state.data.dateOfBirth}
                    </Moment>}
                {this.state.data && <p><strong>Location: </strong>{this.state.data.location}</p>}
                {this.state.data && <p><strong>Description: </strong>{this.state.data.ShortDescription}</p>}
                <button className="btn btn-secondary" onClick={() => window.print()}>PRINT</button>
                <Link className="btn btn-warning" to="/News">Back</Link>
               
                <br />
                
                <br />
                </div>
              



            </div>
          
        )
    }
}
