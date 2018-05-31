//Volunteer.js
import React, { Component } from 'react';
import { Link } from "react-router-dom";//this is for routing


class Volunteer extends Component {
  render() {
    return <div className="Volunteer2">
      <div className="col-lg-8 col-md-8 col-sm-8 Volunteer">
          <div className="courseArchive_content">
            <div className="row">
              <div className="col-lg-12 col-12 col-sm-12">
                <div className="single_blog">
                  <div className="blogimg_container">
                    <a href="#" className="blog_img">
                    <br/>
                    <br/>
                      <img alt="img" src="https://www.theaterpantalone.nl/images/algemene_plaatjes/beeld_tbv_vrijwilligers.jpg" />
                    </a>
                  </div>
                  <h2 className="blog_title">
                    <a href='#'> Vrijwilligers gezocht</a>
                  </h2>
                  <div className="blog_commentbox">
                    <p>
                      <i className="fa fa-user" />Muslum GEZGIN
                    </p>
                    <p>
                      <i className="fa fa-phone" /> (06) 442 70 584
                    </p>
                    <a href="#">
                      <i className="fa fa-at" />info@hospiceamsterdamzuidoost.nl
                    </a>
                  </div>
                  <p>
                    Hospice Amsterdam Zuidoost zal, na opening, voornamelijk
                    afhankelijk zijn van vrijwilligers. Naast het team van
                    coördinatoren die de dagelijkse gang van zaken in het
                    hospice runnen, en de professionele zorgverleners,
                    zullen veel werkzaamheden uitgevoerd worden door
                    vrijwilligers. De vrijwilligers voor het Hospice
                    Amsterdam Zuidoost zullen zorg dragen voor het waken bij
                    bewoners, hulp bieden bij lichte lichamelijke
                    verzorging, emotionele steun bieden aan bewoners of
                    naasten en de mantelzorgers bijstaan. Deze werkzaamheden
                    zullen uit diensten van max. 4 aaneengesloten uren
                    bestaan, tussen 7 uur ‘s ochtends en 23 uur ’s avonds.
                    Het werk in het hospice kan zwaar zijn voor de
                    vrijwilligers, omdat het vrijwilligerswerk zich afspeelt
                    in de sfeer van sterven en dood. Daarnaast kan het werk
                    ook verrijkend zijn, omdat de vrijwilliger bijdraagt aan
                    een mooi einde aan het leven van een bewoner van het
                    hospice. Tijdens het vrijwilligerswerk komt de
                    vrijwilliger in contact met verschillende mensen en
                    wordt er kennis vergaard van verschillende culturen.
                    Hospice Amsterdam Zuidoost is daarom op zoek naar een
                    groep van 75 - 100 vrijwilligers die ondersteuning
                    willen bieden na het openen van de deuren van het
                    hospice. Vrijwilligers zijn verzekerd door het hospice
                    tijdens hun werk, krijgen scholing met betrekking tot de
                    werkzaamheden, eventuele onkosten worden vergoed, er
                    wordt zorg gedragen voor het geestelijk en lichamelijk
                    welbevinden, daarnaast worden vervolgcursussen aan
                    vrijwilligers aangeboden die geruime periode naar
                    behoren functioneren.
                  </p>
                  <blockquote>
                    <span className="fa fa-quote-left" />
                    Duis erat purus, tincidunt vel ullamcorper ut, consequat tempus nibh. Proin condimentum risus ligula, dignissim mollis tortor hendrerit vel.
                  </blockquote>

                <Link className="wpcf7-submit" to="/Volform">
                    Be Volunteer,Register With Us
                  </Link>
                <br /> <br /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      <br />
      <br />
      </div>;

  }
}

export default Volunteer;