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
                     

                <section id="courseArchive">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <div className="courseArchive_content">
                                    <div className="row">
                                        <div className="col-lg-12 col-12 col-sm-12">
                                            <div className="single_blog_archive wow fadeInUp">
                                                <div className="blogimg_container">
                                                    <a href="#" className="blog_img">
                                                        <img alt="img" src={`http://localhost:8000/uploads/${this.state.data.profilePic}`} />
                                                    </a>
                                                </div>
                                                <h2 className="blog_title">
                                                    <a href="events-single.html">
                                                        {" "}
                                                        {this.state.data && <h1>{this.state.data.title}</h1>}
                                                    </a>
                                                </h2>
                                                <div className="blog_commentbox">
                                                    <p>
                                                        <i className="fa fa-clock-o" />
                                                             <strong>Added on: </strong>   {this.state.data && <Moment className="text-muted" format="Do MMM YYYY">
                                                            {this.state.data.dateOfBirth}
                                                        </Moment>}
                                                    </p>
                                                    <p>
                                                        <i className="fa fa-map-marker" /> {this.state.data.location}
                                                    </p>
                                                    <br/>
                                                    <p>
                                                        <i className="fa fa-video-camera" /> {this.state.data && <p>{this.state.data.Video}</p>}<br />
                                                    </p>
                                                </div>
                                                <p className="blog_summary">

                                                        {this.state.data && <p><strong>Description: </strong>{this.state.data.ShortDescription}</p>}
                                                </p>

                                                <button className="btn btn-secondary" onClick={() => window.print()}>PRINT</button>
                                                <Link className="btn btn-warning" to="/News">Back to News</Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>











            </div>
          
        )
    }
}
