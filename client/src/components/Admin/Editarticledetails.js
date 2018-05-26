import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import AdminNav from './AdminNav';

class Editarticledetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPicture: null,
            studentClasses: null,
            data: {
                firstName: '',
                lastName: '',
                password: '',
                dateOfBirth: '',
                email: '',
                shortDescription: '',
                status: '',
                video: '',
                linkedinLink: '',
                githubLink: '',
                hackerRankLink: '',
                CVlink: '',
              
            },
            error: {
                firstName: '',
                lastName: '',
                password: '',
                dateOfBirth: '',
                email: '',
                shortDescription: '',
                status: '',
                video: '',
                linkedinLink: '',
                githubLink: '',
                hackerRankLink: '',
                CVlink: ''
            },
            success: '',
            loading: true,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
    }


    handleUpdate(event) {
        event.preventDefault();
        let _this = this;

        let formData = new FormData();
        formData.append('firstName', this.state.data.firstName);
        formData.append('lastName', this.state.data.lastName);
        formData.append('password', this.state.data.password);
        formData.append('dateOfBirth', this.state.data.dateOfBirth);
        formData.append('email', this.state.data.email);
        formData.append('shortDescription', this.state.data.shortDescription);
        formData.append('status', this.state.data.status);
        formData.append('video', this.state.data.video);
        
        formData.append('photo', this.state.data.photo);
        formData.append('linkedinLink', this.state.data.linkedinLink);
        formData.append('githubLink', this.state.data.githubLink);
        formData.append('hackerRankLink', this.state.data.hackerRankLink);
        formData.append('CVlink', this.state.data.CVlink);


        axios.post(`http://localhost:8000/api/${this.props.match.params.StudentID}/update`, formData)
            .then(res => {
                console.log('response update', res)
                if (res.data.errors) {
                    let mainErr = res.data.errors;
                    let errMsg = {
                        firstName: mainErr.firstName ? mainErr.firstName.msg : '',
                        lastName: mainErr.lastName ? mainErr.lastName.msg : '',
                        dateOfBirth: mainErr.dateOfBirth ? mainErr.dateOfBirth.msg : '',
                        email: mainErr.email ? mainErr.email.msg : '',
                        shortDescription: mainErr.shortDescription ? mainErr.shortDescription.msg : '',
                        status: mainErr.status ? mainErr.status.msg : '',
                        photo: mainErr.photo ? mainErr.photo.msg : '',
                        linkedinLink: mainErr.linkedinLink ? mainErr.linkedinLink.msg : '',
                        githubLink: mainErr.githubLink ? mainErr.linkedLink.msg : '',
                        hackerRankLink: mainErr.hackerRankLink ? mainErr.hackerRankLink.msg : '',
                        CVlink: mainErr.CVlink ? mainErr.CVlink.msg : ''
                    }
                    _this.setState({
                        error: errMsg
                    });
                } else {
                    _this.setState({

                        success: 'Student details updated successfully'
                    })
                }
            })
            .catch(error => console.log(error))

    }
    handleChange(element) {
        var formData = this.state.data;
        formData[element.target.name] = element.target.value;
        this.setState({
            data: formData
        })
    }

    handlePhotoChange(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];

            var formData = this.state.data;
            formData[event.target.name] = event.target.files[0]

            reader.onloadend = () => {
                this.setState({
                    currentPicture: reader.result, // this is an image url
                    data: formData,
                });
            }

            reader.readAsDataURL(file)
        }
    }

    componentDidMount() {
        let _this = this;
        axios.get(`http://localhost:8000/api/${this.props.match.params.id}/getedititem`)
            .then(function (response) {

                console.log(response.data);

                if (response.data.error) {
                    _this.setState({ loading: false })
                } else {
                    let newData = _this.state.data;
                    newData.firstName = response.data.FirstName;
                    newData.lastName = response.data.LastName;
                    newData.dateOfBirth = response.data.DateOfBirth;
                    newData.email = response.data.Email;
                    newData.shortDescription = response.data.ShortDescription;
                    newData.status = response.data.Status;
                    newData.video = response.data.Video;
                    newData.linkedinLink = response.data.LinkedIn_link;
                    newData.githubLink = response.data.Github_link;
                    newData.hackerRankLink = response.data.hackerRank_link;
                    newData.CVlink = response.data.CV_link;

                    
                    _this.setState({
                        data: newData,
                        currentPicture: `http://localhost:8000/uploads/${response.data.profilePic}`
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            })

    }
    render() {
        console.log('this.state.StudentClass')
        return (
            <div className="editStudentDetails">

                <AdminNav />

                <h3>Edit your message</h3>
                <form onSubmit={this.handleUpdate}>
                    <div className="left-side">
                        <div className="form-group">
                            <label htmlFor="exampleInputFirstName">First Name</label>
                            <input type="text" name="firstName" value={this.state.data.firstName} onChange={this.handleChange} className="form-control" id="exampleInputFirstName" placeholder="First Name" />
                        </div>
                        <p className="text-danger">{this.state.error.firstName}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputLastName">Last Name</label>
                            <input type="text" name="lastName" value={this.state.data.lastName} onChange={this.handleChange} className="form-control" id="exampleInputLastName" placeholder="Last Name" />
                        </div>
                        <p className="text-danger">{this.state.error.lastName}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputDateOfBirth">Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={moment(this.state.data.dateOfBirth).format('YYYY-MM-DD')} onChange={this.handleChange} className="form-control" id="exampleInputDateOfBirth" />
                        </div>
                        <p className="text-danger">{this.state.error.dateOfBirth}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail">Student Email</label>
                            <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail" placeholder="Student Email" />
                        </div>
                        <p className="text-danger">{this.state.error.email}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputShortDescription">Short Description</label>
                            <textarea rows="4" cols="50" type="text" name="shortDescription" value={this.state.data.shortDescription} onChange={this.handleChange} className="form-control" id="exampleInputShortDescription" placeholder="Description" />
                        </div>
                        <p className="text-danger">{this.state.error.shortDescription}</p>


                        <div className="form-group">
                            <label htmlFor="exampleInputStatus">Status</label>

                            <select name="status" id="exampleInputStatus" onChange={this.handleChange} value={this.state.data.status}>
                                <option key={1} value='on probation'>on probation</option>
                                <option key={2} value='graduated'>graduated</option>
                                <option key={3} value='dropout'>dropout</option>
                            </select>
                            <p className="text-danger">{this.state.error.status}</p>

                        </div>

                    </div>

                    <div className="right-side">
                        <div className="form-group">
                            {this.state.currentPicture &&
                                <img src={this.state.currentPicture} width="100" height="100" />}
                            <label htmlFor="exampleInputPhoto">Profile Photo</label>
                            <input type="file" name="photo" accept="image/*" onChange={this.handlePhotoChange} className="form-control" id="exampleInputPhoto" placeholder="Photo" />
                        </div>
                        <p className="text-danger">{this.state.error.photo}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputLindeinLink">Linkedin Link</label>
                            <input type="text" name="linkedinLink" value={this.state.data.linkedinLink} onChange={this.handleChange} className="form-control" id="exampleInputLindeinLink" placeholder="Student Linkedin (optinal)" />
                        </div>
                        <p className="text-danger">{this.state.error.linkedinLink}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputGithubLink">Github Link</label>
                            <input type="text" name="githubLink" value={this.state.data.githubLink} onChange={this.handleChange} className="form-control" id="exampleInputGithubLink" placeholder="Github Link (optinal)" />
                        </div>
                        <p className="text-danger">{this.state.error.githubLink}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputhackerRankLink">HackerRank Link</label>
                            <input type="text" name="hackerRankLink" value={this.state.data.hackerRankLink} onChange={this.handleChange} className="form-control" id="exampleInputhackerRankLink" placeholder="Hacker Rank Link (optinal)" />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <label htmlFor="exampleInputCVlink">CV Link</label>
                            <input type="text" name="CVlink" value={this.state.data.CVlink} onChange={this.handleChange} className="form-control" id="exampleInputCVlink" placeholder="CV Link (optinal)" />
                        </div>
                        <p className="text-danger">{this.state.error.CVlink}</p>

                    </div>
                    <p className="text-success">{this.state.success}</p>
                    <button type="submit" className="btn btn-primary submit">Update</button>
                </form>
            </div>
        )
    }
}

export default Editarticledetails;
