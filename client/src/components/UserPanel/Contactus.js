import React, { Component } from "react";
import axios from "axios";





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
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }




  handleChange(element) {
    var formData = this.state.data;
    formData[element.target.name] = element.target.value;
    this.setState({
      data: formData
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let _this = this;
    axios
      .post("https://formspree.io/ibrahimwho579@gmail.com", this.state.data)
      .then(res => {
        console.log("res", res);
        if (res.data.errors) {
          let mainErrors = res.data.errors;
          let err_msg = {
            name: mainErrors.name ? mainErrors.name.msg : "",
            desc: mainErrors.desc ? mainErrors.desc.msg : "",
            email: mainErrors.email ? mainErrors.email.msg : "",

          };
          _this.setState({
            error: err_msg,
            success: ""
          });
        } else {
          _this.setState({
           
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
            success: "Thank you"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
       
        <br />
        <h1>Contact us...</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputname">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.data.name}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputname"
              placeholder="Name"
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
              placeholder="Message"
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
              placeholder="Email"
            />
            <h3 className="text-danger">{this.state.error.email}</h3>
          </div>
        
          <button type="submit" className="btn btn-primary">
            Post listing
          </button>
        </form>
        {this.state.success === "" ? (
          <p />
        ) : (
          <p className="text-success">{this.state.success}</p>
        )}
        <br />
        <br />
      
      </div>
    );
  }
}