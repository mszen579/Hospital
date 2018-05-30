import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import AdminNav from './AdminNav';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(Swal);
const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
})


class Editarticledetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPicture: null,
            data: {
                title: '',
                location: '',
                ShortDescription: '',
                Video: ''
               
            },
            error: {
                title: '',
                location: '',
                ShortDescription: '',
                Video: ''                
            },
            success: '',
            loading: true,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.deleteArt = this.deleteArt.bind(this);
    }




    //deleting Article
    deleteArt(event) {
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
                    .delete(`http://localhost:8000/api/admin/article/delete/${this.props.match.params.id}`)
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                swalWithBootstrapButtons(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                     window.location.href = "/Admin-panel/DashboardArticle"
                    // this.props.history.push(`/Admin-panel/DashboardArticle`)
                )
            } else if
            (
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






    handleUpdate(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('title', this.state.data.title);
        formData.append('location', this.state.data.location);
        formData.append('ShortDescription', this.state.data.ShortDescription);
        formData.append('Video', this.state.data.Video);
        formData.append("photo", this.state.data.photo);

        axios.post(`http://localhost:8000/api/${this.props.match.params.id}/update`, formData)
            .then(res => {
                console.log('response update', res)
                if (res.data.errors) {
                    let mainErr = res.data.errors;
                    let errMsg = {
                        title: mainErr.title ? mainErr.title.msg : '',
                        location: mainErr.location ? mainErr.location.msg : '',
                        ShortDescription: mainErr.ShortDescription ? mainErr.ShortDescription.msg : '',
                        photo: mainErr.photo ? mainErr.photo.msg : ''
                    }
                    this.setState({
                        error: errMsg
                    });
                } else {
                    this.setState({

                        success: 'Article details updated successfully'
                        
                    })
                } window.location.href = "/Admin-panel/DashboardArticle"
                // this.props.history.push(`/Admin-panel/DashboardArticle`)

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


        axios.get(`http://localhost:8000/api/update/${this.props.match.params.id}`)
            .then( (res)=> {
                console.log(res.data);
                // _this.setState({data:response.data})
                if (res.data.error) {
                    this.setState({ loading: false });
                } else {
                  

                    this.setState({
                        data: res.data,
                        currentPicture: `http://localhost:8000/uploads/${
                            res.data.profilePic
                            }`
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
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

        return <div className="editArticleDetails">
            <AdminNav />
            <h3>Nieuws Artikel Bijwerken</h3>
            <form onSubmit={this.handleUpdate}>
                <div className="left-side">
                    <div className="form-group">
                        <label htmlFor="exampleInputtitle">Titel</label>
                        <input type="text" name="title" value={this.state.data.title} onChange={this.handleChange} className="form-control" id="exampleInputtitle" placeholder="Titel" />
                    </div>
                    <p className="text-danger">{this.state.error.title}</p>
                    <div className="form-group">
                        <label htmlFor="exampleInputLocation">Locatie</label>
                        <input type="text" name="location" value={this.state.data.location} onChange={this.handleChange} className="form-control" id="exampleInputLocation" placeholder="Locatie" />
                    </div>
                    <p className="text-danger">
                        {this.state.error.location}
                    </p>

                    <div className="form-group">
                        <label htmlFor="exampleInputShortDescription">
                            Nieuwsartikel
                  </label>
                        <textarea rows="4" cols="50" type="text" name="ShortDescription" value={this.state.data.ShortDescription} onChange={this.handleChange} className="form-control" id="exampleInputShortDescription" placeholder="Nieuwsartikel" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputtitle">Video</label>
                        <input type="text" name="Video" value={this.state.data.Video} onChange={this.handleChange} className="form-control" id="exampleInputtitle" placeholder="Video" />
                    </div>

                    <p className="text-danger">
                        {this.state.error.ShortDescription}
                    </p>
                </div>


                <div>
                    <div className="form-group">
                        {this.state.currentPicture && <img src={this.state.currentPicture} width="100" height="100" />}
                        <label class="custom-file-upload" htmlFor="exampleInputPhoto">
                        <i class="fa fa-cloud-upload"></i> Foto
                        <input type="file" name="photo" onChange={this.handlePhotoChange} id="exampleInputPhoto" placeholder="Photo" />
                        </label>
                    </div>
                    <p className="text-danger">
                        {this.state.error.profilePic}
                    </p>
                </div>
                <p className="text-success">{this.state.success}</p>



            <button type="submit" className="btn btn-primary submit">
                    Bijwerken
              </button>
                <button className="btn btn-danger" onClick={this.deleteArt}>Verwijder</button>
            </form>
        </div>;
    }
}

export default Editarticledetails;
