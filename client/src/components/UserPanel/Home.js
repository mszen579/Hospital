import "react-bootstrap";
import "../UserStyling/home.js";
import "../UserStyling/home.css";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../UserStyling/home.css";
import Moment from "react-moment";

//this is for the slider
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Articles: null,
      loading: true
    };
    // this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/listofArticles")
      .then(response => {
        // console.log(response);
        if (response.data.error) {
          this.setState({ loading: false });
        } else {
          this.setState({ Articles: response.data, loading: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.Articles);
    return <div>
        <h1>All News</h1>
        <div className="table-responsive-md">
          <Carousel autoPlay style={{ height: "530px", textAlign: "center" }}>
            {this.state.Articles && this.state.Articles.slice(0, 3).map(
                function(article) {
                  return (
                    <div style={{ height: "530px", textAlign: "center" }}>
                      <img
                        src={`http://localhost:8000/uploads/${
                          article.profilePic
                        }`}
                      />

                      <Link
                        className="legend titlehome"
                        style={{ fontSize: "30px" }}
                        to={`/${article._id}/SingleArticle`}
                      >
                        {article.title}
                      </Link>
                    </div>
                  );
                }
              )}
          </Carousel>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <section id="aboutUs">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="aboutus_area wow fadeInLeft">
                  <h2 className="titile">Over Ons</h2>

                  <h5>
                    <b> Wie zijn wij?</b>
                  </h5>
                  <p>
                    Stichting Hospice Amsterdam Zuidoost is door 2
                    enthousiaste verpleegkundige uit Amsterdam Zuidoost
                    opgestart, om het verschil te maken in de palliatieve
                    zorg in Amsterdam Zuidoost. Het hospice is gericht op de
                    bewoners van Amsterdam Zuidoost die palliatief terminale
                    zorg behoeven. Amsterdam Zuidoost huisvest een
                    diversiteit aan culturen. In veel niet westerse culturen
                    bestaan uitgebreide rituelen rond sterven en rouw.
                    Kennis van deze verschillen en van de belangrijkste
                    rituelen zijn van belang voor een goede relatie tussen
                    de zorg gevende, stervende en diens rouwende familie.
                  </p>
                  <h5>
                    <b>Wat bieden wij?</b>{" "}
                  </h5>
                  <p>
                    Hospice Amsterdam Zuidoost wilt steun bieden aan mensen
                    in hun laatste levensfase en aan hun naasten. Soms is
                    het niet mogelijk deze laatste fase thuis door te
                    brengen. Daarom beschikt Hospice Amsterdam Zuidoost over
                    een 'bijna-thuis' huis met 6 plaatsen (in het begin
                    starten wij met 3 plaatsen) voor zorg in de laatste
                    levensfase voor volwassenen vanaf 18 jaar voor een
                    periode van 3 maanden. Hospice Amsterdam Zuidoost biedt
                    een kleinschalige voorziening met een warme en
                    huiselijke uitstraling waar men zichzelf kan zijn en
                    samen met de naasten in vrijheid invulling kan geven aan
                    de wensen en behoeften. Daarnaast biedt Hospice
                    Amsterdam Zuidoost tijdelijk verblijf aan voor mensen in
                    respijtzorg. Dit verblijf zal tijdelijk zijn omdat
                    verblijf in de thuissituatie op dat moment niet mogelijk
                    is.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="newsfeed_area wow fadeInRight">
                  <ul className="nav nav-tabs feed_tabs" id="myTab2">
                    <li className="active">
                      <a href="#news" data-toggle="tab">
                        Nieuws
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane fade in active" id="news">
                      <ul className="news_tab">
                        {this.state.Articles && this.state.Articles.slice(0, 5).map(
                            function(article) {
                              return (
                                <li>
                                  <div className="media">
                                    <div className="media-left">
                                      <a className="news_img" href="#">
                                        <img
                                          className="media-object"
                                          src={`http://localhost:8000/uploads/${
                                            article.profilePic
                                          }`}
                                          alt="img"
                                        />
                                      </a>
                                    </div>

                                    <div className="media-body">
                                      <Link
                                        className="legend titlehome"
                                        style={{ fontSize: "22px" }}
                                        to={`/${article._id}/SingleArticle`}
                                      >
                                        {article.title}
                                      </Link>
                                      <Moment
                                        className="text-muted"
                                        format="Do MMM YYYY"
                                      >
                                        {article.createdAt}
                                      </Moment>
                                    </div>
                                  </div>
                                </li>
                              );
                            }
                          )}
                      </ul>
                      <Link className="see_all" style={{ fontSize: "22px" }} to="/News">
                        Alles Zien
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
      </div>;
  }
}

export default Home;
