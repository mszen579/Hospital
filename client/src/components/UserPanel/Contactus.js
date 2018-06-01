import React, { Component } from "react";
import axios from "axios";
import Footer from "./Footer"
import Header from "./Header"



//apply confirmation
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);
const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: "btn btn-success",
  cancelButtonClass: "btn btn-danger",
  buttonsStyling: false
});

export default class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        desc: "",
        email: ""
      },
      error: {
        name: "",
        desc: "",
        email: ""
      },
      success: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
  }

  // componentDidMount(){
  //   function myMap() {
  //    var myCenter=new google.maps.LatLng(41.878114, -87.629798);
  //     var mapOptions= {
  //       center:myCenter,
  //       zoom:12, scrollwheel: false, draggable: false,
  //       mapTypeId:google.maps.MapTypeId.ROADMAP
  //     };
  //     var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

  //     var marker = new google.maps.Marker({
  //       position: myCenter,
  //     });
  //     marker.setMap(map);
  //   }
  // }

  handleChange(element) {
    var formData = this.state.data;
    formData[element.target.name] = element.target.value;
    this.setState({
      data: formData
    });
  }

  //send message
  handleSubmitEmail(event) {
    event.preventDefault();

    swalWithBootstrapButtons({
      title: "Notification!!!",
      text: "Your message will be sent!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        let _this = this;
        axios
          .post("http://localhost:8000/api/contactus", this.state.data)
          .then(function (response) { })
          .catch(function (error) {
            console.log(error);
          });
        swalWithBootstrapButtons(
          "Success",
          "Your message has been sent to us. We will get back to you shorlty",
          "success",
          (window.location.href = "/Contactus")
        );
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons(
          "Cancelled",
          "Your message did not sent:)",
          "error"
        );
      }
    });
  }

  render() {
    return <div>

        <section id="contact">
          <div className="container">
            <h1>Neem contact met ons op...</h1>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className="contact_form wow fadeInLeft">
                  <form onSubmit={this.handleSubmitEmail} className="submitphoto_form">
                    <div className="form-group">
                      <label htmlFor="exampleInputname">Naam</label>
                      <input type="text" name="name" value={this.state.data.name} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputname" placeholder="Name" required />
                      <h3 className="text-danger">
                        {this.state.error.name}
                      </h3>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Bericht</label>
                      <textarea type="text" name="desc" row="100" value={this.state.data.desc} onChange={this.handleChange} className="wp-form-control " id="exampleInputdesc" placeholder="Message" required />
                      <h3 className="text-danger">
                        {this.state.error.desc}
                      </h3>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputname">E-mail</label>
                      <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputjobemail" placeholder="Email" required />
                      <h3 className="text-danger">
                        {this.state.error.email}
                      </h3>
                    </div>

                    <button type="submit" className="wpcf7-submit">
                      Bericht Verzenden
                    </button>
                    <div id="googleMap" style={{ height: "400px" }} />
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="contact_address wow fadeInRight">
                  <h3>
                    <b>Adres</b>{" "}
                  </h3>
                  <div className="address_group">
                    <p>Kelbergen 189 1104 LJ Amsterdam</p>
                    <p>
                      <b> Telefoon Nummer</b>: (06) 442 70 584
                    </p>
                    <p>
                      <b> E-mail</b>:info@hospiceamsterdamzuidoost.nl{" "}
                    </p>
                    <h3>
                      <b>Openingstijden</b>
                    </h3>
                    <p>
                      Ma-Vrij: 9:00 - 17:30 (na opening is het hospice 24
                      uur bereikbaar){" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <div id="googleMap">
            <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Kelbergen+189,+1104+LJ+Amsterdam&amp;aq=&amp;sll=30.977609,-95.712891&amp;sspn=42.157377,86.572266&amp;ie=UTF8&amp;hq=&amp;hnear=Kelbergen+189,+1104+LJ+Amsterdam&amp;t=m&amp;z=14&amp;ll=52.310129,4.974043&amp;output=embed" />
          </div>
        </section>

       
      </div>;
  }
}
