import React, { Component } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';


class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.componentWillMount = this.componentWillMount.bind(this);
        
    }
    
    
    componentWillMount() {
        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'SuperAdmin' || res.data.jobTitle === 'Admin') {
                this.setState({ admin: res.data, loading: false })
            } else {
                window.location.href = "/Admin-panel/DashboardArticle"
            }
        });
    }
    

    render() {
        return (
            <div className="Panel">
              <br />
            <br />
      
                <AdminNav />
                <h1>Het Admin Paneel</h1>
                <p>
                    <b>Nieuws Artikelen</b>
                    <p>Hier kunnen de admins all nieuws artikelen zien, die op de publieke kan van de website te zien zijn. <br/>
                    Ze kunnen de artikelen aanpassen en verwijderen door op de Bewerk knop te drukken. <br/>
                    En met de 'Bekijk details' knop kan de admin naar de nieuws artikel gaan en kijken hoe het op <br/>
                    de website er uit ziet en eventueel uit printen.
                    </p><br />
                    <b>Artikel Toevoegen</b>
                    <p>Hier kunnen de admin's een nieuwe artikel toevoegen. <br/>
                    Een foto moet worden toegevoegd.<br/>
                    En een video link is optioneel.
                    </p><br />
                    <b>Admin Lijst</b>
                    <p>Hier kan alleen de SuperAdmin komen. <br/>
                    De SuperAdmin kan all huidige admin accounts zien. <br/>
                    De informatie die bij de admin hoort <br/>
                    en kan ze verwijderen. <br/>
                    </p><br />
                    <b>Admin Toevoegen</b>
                    <p> Hier kan alleen de SuperAdmin komen. <br/>
                    De SuperAdmin kan hier admin accounts aanmaken.
                    </p><br />
                    <b>Lijst van Vrijwilligers</b>
                    <p>Hier kunnen all admins een lijst van vrijwilligers sollicitaties zien. <br/>
                    Op deze pagina ziet u de Naam van de solicitant en de datum waarop het ingevuld is. <br/>
                    Met de 'Bekijk Details' kunt u de gehele sollicitatie zien, uitprinten en verwijderen.
                    </p><br />
                </p>
            </div>
        );
    }
}

export default Panel;