import 'react-bootstrap';
import '../UserStyling/home.js';
import '../UserStyling/home.css';
import React, { Component } from 'react';


class Home extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="carousel">
                    
                    <img src={require(`../UserStyling/tiger.jpg`)} width="960" height="560" />
                    <img src={require(`../UserStyling/Nemo-Seagulls.jpg`)} width="960" height="560" />
                    <img src={require(`../UserStyling/MVC.png`)} width="960" height="560" />
                </div>
                <div id="overlay">
                    <div id="description">
                        <h3>Modest Celebration In Grozny</h3>
                        <p>The Chechen leader, Ramzan Kadyrov, has held a star-studded party in his capital Grozny - but denied it was anything to do with his 35th birthday.</p>
                        <p>Oscar-winning actor Hilary Swank and action star Jean-Claude van Damme have been criticised for attending the lavish party. Kadyrov is linked to a grim record of abuse. When stars get paid to turn up to party with him, it trivializes the suffering of countless victims of human rights abuses.</p>
                        <div id="pager"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;