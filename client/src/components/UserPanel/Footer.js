import React, { Component } from "react";
import axios from 'axios';
export default class Footer extends Component {

  constructor(props){
    super(props);

    this.state = {
        Articles: null,
        loading: true,
        admin: ""

    }
    axios.get('http://localhost:8000/api/isloggedin')
    .then((res) => {
        if (res.data.error) {
            this.setState({ loading: false })
        } else if (res.data.jobTitle === 'Admin' || res.data.jobTitle === 'SuperAdmin') {
            
          this.setState({ admin: res.data, loading: false })
        } 
    });

  }




  render() {
    return    !this.state.admin ?(<div>
 

        <footer id="footer">
          <div className="footer_top">
            <div className="container">
              <div className="row">
                <div className="col-ld-3  col-md-3 col-sm-3">
                  <div className="single_footer_widget">
                    <h3>Over Ons</h3>
                    <p>
                      Stichting Hospice Amsterdam Zuidoost is door 2
                      enthousiaste verpleegkundige uit Amsterdam Zuidoost
                      opgestart, om het verschil te maken in de palliatieve
                      zorg in Amsterdam Zuidoost. Het hospice is gericht op
                      de bewoners van Amsterdam Zuidoost die palliatief
                      terminale zorg behoeven.
                    </p>
                  </div>
                </div>
                <div className="col-ld-3  col-md-3 col-sm-3">
                  <div className="single_footer_widget">
                    <h3>Gemeenschap</h3>
                    <ul className="footer_widget_nav">
                      <li>
                        <a href="#">Our Tutors</a>
                      </li>
                      <li>
                        <a href="#">Our Students</a>
                      </li>
                      <li>
                        <a href="#">Our Team</a>
                      </li>
                      <li>
                        <a href="#">Forum</a>
                      </li>
                      <li>
                        <a href="#">News &amp; Media</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-ld-3  col-md-3 col-sm-3">
                  <div className="single_footer_widget">
                    <h3>Overig</h3>
                    <ul className="footer_widget_nav">
                      <li>
                        <a href="#">Link 1</a>
                      </li>
                      <li>
                        <a href="#">Link 2</a>
                      </li>
                      <li>
                        <a href="#">Link 3</a>
                      </li>
                      <li>
                        <a href="#">Link 4</a>
                      </li>
                      <li>
                        <a href="#">Link 5</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-ld-3  col-md-3 col-sm-3">
                  <div className="single_footer_widget">
                    <h3></h3>
                    <ul style={{'color':'whitte'}} className="footer_social">
                                    <li style={{ 'color': 'whitte' }}>
                                        <a data-toggle="tooltip" data-placement="top" title="Facebook" className="soc_tooltip" href="https://www.facebook.com/hospiceamsterdamzuidoost/">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                    
                                    <li>
                                        <a data-toggle="tooltip" data-placement="top" title="Twitter" className="soc_tooltip" href="https://twitter.com/adamzuidoost?lang=en">
                                            <i className="fa fa-twitter" />
                                        </a>
                                    </li>
                    
                      <li>
                                        <a data-toggle="tooltip" data-placement="top" title="Linkedin" className="soc_tooltip" href="https://nl.linkedin.com/company/hospice-amsterdam-zuidoost">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                      <li>
                                        <a data-toggle="tooltip" data-placement="top" title="Youtube" className="soc_tooltip" href="https://www.youtube.com">
                          <i classNameName="fa fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>}
      </div>): (<div></div>)
  }
}
