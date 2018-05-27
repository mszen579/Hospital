import React, { Component } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

class Addarticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                location: '',
                shortDescription: '',
                video: '',
                photo: null,
            },
            error: {
                title: '',
                location: '',
                shortDescription: '',
                video: '',
                photo: '',
            },
            success: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        }

    handlePhotoChange(event) {
        var formData = this.state.data;
        formData[event.target.name] = event.target.files[0]
        this.setState({ data: formData })

    }
    handleChange(element) {
        var formData = this.state.data;
        formData[element.target.name] = element.target.value;
        this.setState({
            data: formData
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        let _this = this;

        let formData = new FormData();
        formData.append('title', this.state.data.title);
        formData.append('location', this.state.data.location);
        formData.append('shortDescription', this.state.data.shortDescription);
        formData.append('video', this.state.data.video);
        formData.append('photo', this.state.data.photo);


        axios.post("http://localhost:8000/api/Article/register", formData)
            .then(res => {
                console.log(res.data);
                if (res.data.errors) {
                    let mainErr = res.data.errors;
                    let errMsg = {
                        title: mainErr.title ? mainErr.title.msg : '',
                        location: mainErr.location ? mainErr.location.msg : '',
                        shortDescription: mainErr.shortDescription ? mainErr.shortDescription.msg : '',
                        photo: mainErr.photo ? mainErr.photo.msg : ''
                    };
                    _this.setState({
                        error: errMsg
                    });
                } else {
                    _this.setState({
                        data: {
                            title: '',
                            location: '',
                            shortDescription: '',
                            video: '',
                        },
                        error: {
                            title: '',
                            location: '',
                            shortDescription: '',
                            video: '',
                            photo: '',
                        },
                        success: 'Article Registered successfully'
                    })
                }
            })
            .catch(error => console.log(error))
    }

  

    componentDidMount(){
        let _this = this;
        axios.get("http://localhost:8000/api/admin/Article/class/list")
            .then((response) => {
                console.log(response);
                if (response.data.error) {
                    _this.setState({ loading: false })
                } else {
                    let newData = this.state.data;
                    newData.ArticleClass = response.data[0]._id;
                    _this.setState({ ArticleClasses: response.data, loading: false })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <div className="register-std">

                <AdminNav />

                <h1>Article Register</h1>


                {this.state.success && <p>{this.state.success}</p>
                }


                <div>
                    <form onSubmit={this.handleSubmit} className="register-form">
                        <div className="left-side">
                            <div className="form-group">
                                <label htmlFor="exampleInputTitle">Title</label>
                                <input type="text" name="title" value={this.state.data.title} onChange={this.handleChange} className="form-control" id="exampleInputTitle" placeholder="Title" />
                            </div>
                            <p className="text-danger">{this.state.error.title}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputLocation">Location</label>
                                <input type="text" name="location" value={this.state.data.location} onChange={this.handleChange} className="form-control" id="exampleInputLocation" placeholder="Location" />
                            </div>
                            <p className="text-danger">{this.state.error.location}</p>
 
                            <div className="form-group">
                                <label htmlFor="exampleInputShortDescription">Description</label>
                                <textarea type="text" name="shortDescription" value={this.state.data.shortDescription} onChange={this.handleChange} className="form-control" id="exampleInputShortDescription" placeholder="Description"></textarea>
                            </div>
                            <p className="text-danger">{this.state.error.shortDescription}</p>
                            </div>
                        <div className="right-side">
                            <div className="form-group">
                                <label htmlFor="exampleInputPhoto">Photo</label>
                                <input type="file" name="photo"  onChange={this.handlePhotoChange} className="form-control" id="exampleInputPhoto" placeholder="Photo" />
                            </div>
                            <p className="text-danger">{this.state.error.photo}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputVideo">Video Link</label>
                                <input type="text" name="video" value={this.state.video} onChange={this.handleChange} className="form-control" id="exampleInputVideo" placeholder="(Optional) Add video Link" />
                            </div>
                            <p className="text-danger">{this.state.error.video}</p>
                        </div>
                        <p className="text-success">{this.state.success}</p>

                        <button type="submit" className="btn btn-primary subbut">Add news</button>


                    </form>
                </div>

                <br />
                <br />

            </div>
        );
    }
}

export default Addarticle;
