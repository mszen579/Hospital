import React, { Component } from "react";
import axios from "axios";

//apply confirmation
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);
const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
})




export default class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      data: {
        name: "",
        desc: "",
        email: "",

      },
      error: {
        
        name: "",
        desc: "",
        email: "",
  
      },
      success: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    
  }

 
  handleChange(element) {
    var formData = this.state.data;
    formData[element.target.name] = element.target.value;
    this.setState({
      data: formData
    });
  }

 

  //send message
  handleSubmitEmail(event){
    event.preventDefault();
     
    
      swalWithBootstrapButtons({
          title: 'Notification!!!',
          text: "Your message will be sent!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
         
      }).then((result) => {
          if (result.value) {
               let _this = this;
                      axios
                        .post("http://localhost:8000/api/contactus", this.state.data).then(function (response) {
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
              swalWithBootstrapButtons(
                  'Success',
                  'Your message has been sent to us. We will get back to you shorlty',
                  'success',
                  window.location.href = '/Contactus'
              )
          } else if 
          (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
          ) {
              swalWithBootstrapButtons(
                  'Cancelled',
                  'Your message did not sent:)',
                  'error'
              )
          }
      })
  }

  render() {
    return (
      <div>
        <br />
        <h1>Contact us...</h1>
        <form onSubmit={this.handleSubmitEmail}>
          <div className="form-group">
            <label htmlFor="exampleInputname">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.data.name}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputname"
              placeholder="Name" required
            />
            <h3 className="text-danger">{this.state.error.name}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Message</label>
            <textarea
              type="text"
              name="desc"
              value={this.state.data.desc}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputdesc"
              placeholder="Message" required
            />
            <h3 className="text-danger">{this.state.error.desc}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputname">email</label>
            <input
              type="text"
              name="email"
              value={this.state.data.email}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputjobemail"
              placeholder="Email" required
            />
            <h3 className="text-danger">{this.state.error.email}</h3>
          </div>
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
        </form>
        <br/>
              <table style={{width:"100%"}}>
              <tr>
              <th>Address</th>
              <th>Contact</th> 
              <th>Opening hours</th>
              <th>Social Media</th>
              </tr>
              <tr>
                          <td>Kelbergen 189 1104 LJ Amsterdam</td>
                          <td>(06) 442 70 584
                          info@hospiceamsterdamzuidoost.nl </td> 
                          <td>Mon-Fri: 9:00 am to 5:30 pm
                          (after opening the hospice is available 24 hours)</td>
                          <td></td>
              </tr>
              </table>
              <br/>
        <section id="googleMap">
          <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Kelbergen+189,+1104+LJ+Amsterdam&amp;aq=&amp;sll=30.977609,-95.712891&amp;sspn=42.157377,86.572266&amp;ie=UTF8&amp;hq=&amp;hnear=Kelbergen+189,+1104+LJ+Amsterdam&amp;t=m&amp;z=14&amp;ll=52.310129,4.974043&amp;output=embed"></iframe>
        </section>
            </div>
    );
  }
}