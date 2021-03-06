//Volform.js
import React, { Component } from "react";
import axios from "axios";





export default class Volform extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: {
                name: '',
                callName: '',
                dateOfBirth: '',
                gender: 'Man',
                address: '',
                postCode: '',
                city: '',
                email: '',
                phone: '',
                mobile: '',
                occupation: '',
                believe: '',
                marigeStatus: 'Getrouwdt',
                availability: '',
                motivation: '',
                experience: '',
                healthExper: '',
                emotionalExper: '',
                compassion: '',
                workPreferences: '',
                workExpectations: ''
            },
            error: {
                name: '',
                callName: '',
                dateOfBirth: '',
                gender: '',
                address: '',
                postCode: '',
                city: '',
                email: '',
                phone: '',
                mobile: '',
                occupation: '',
                believe: '',
                marigeStatus: '',
                availability: '',
                motivation: '',
                experience: '',
                healthExper: '',
                emotionalExper: '',
                compassion: '',
                workPreferences: '',
                workExpectations: ''
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
            .post("http://localhost:8000/api/formRegister", this.state.data)
            .then(res => {
                // console.log("res", res);
                if (res.data.errors) {
                    let mainErrors = res.data.errors;
                    let err_msg = {
                        name: mainErrors.name ? mainErrors.name.msg : "",
                        callName: mainErrors.callName ? mainErrors.callName.msg : "",
                        dateOfBirth: mainErrors.dateOfBirth ? mainErrors.dateOfBirth.msg : "",
                        gender: mainErrors.gender ? mainErrors.gender.msg : "",
                        address: mainErrors.address ? mainErrors.address.msg : "",
                        postCode: mainErrors.postCode ? mainErrors.postCode.msg : "",
                        city: mainErrors.city ? mainErrors.city.msg : "",
                        email: mainErrors.email ? mainErrors.email.msg : "",
                        phone: mainErrors.phone ? mainErrors.phone.msg : "",
                        mobile: mainErrors.mobile ? mainErrors.mobile.msg : "",
                        occupation: mainErrors.occupation ? mainErrors.occupation.msg : "",
                        believe: mainErrors.believe ? mainErrors.believe.msg : "",
                        marigeStatus: mainErrors.marigeStatus ? mainErrors.marigeStatus.msg : "",
                        availability: mainErrors.availability ? mainErrors.availability.msg : "",
                        motivation: mainErrors.motivation ? mainErrors.motivation.msg : "",
                        experience: mainErrors.experience ? mainErrors.experience.msg : "",
                        healthExper: mainErrors.healthExper ? mainErrors.healthExper.msg : "",
                        emotionalExper: mainErrors.emotionalExper ? mainErrors.emotionalExper.msg : "",
                        compassion: mainErrors.compassion ? mainErrors.compassion.msg : "",
                        workPreferences: mainErrors.workPreferences ? mainErrors.workPreferences.msg : "",
                        workExpectations: mainErrors.workExpectations ? mainErrors.workExpectations.msg : "",

                    };
                    _this.setState({
                        error: err_msg,
                        success: ""
                    });
                } else {
                    _this.setState({
                        data: {
                            name: '',
                            callName: '',
                            dateOfBirth: '',
                            gender: '',
                            address: '',
                            postCode: '',
                            city: '',
                            email: '',
                            phone: '',
                            mobile: '',
                            occupation: '',
                            believe: '',
                            marigeStatus: '',
                            availability: '',
                            motivation: '',
                            experience: '',
                            healthExper: '',
                            emotionalExper: '',
                            compassion: '',
                            workPreferences: '',
                            workExpectations: '',
                        },
                        error: {
                            name: '',
                            callName: '',
                            dateOfBirth: '',
                            gender: '',
                            address: '',
                            postCode: '',
                            city: '',
                            email: '',
                            phone: '',
                            mobile: '',
                            occupation: '',
                            believe: '',
                            marigeStatus: '',
                            availability: '',
                            motivation: '',
                            experience: '',
                            healthExper: '',
                            emotionalExper: '',
                            compassion: '',
                            workPreferences: '',
                            workExpectations: '',
                        },
                        success: "Thank you for registring with us. We will contact you within 2 weeks!!!"
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return <div className="volformbody">
            <br />
            <br />
            <br />
            <h1>Vrijwilligers Aanmelding</h1>
            <form onSubmit={this.handleSubmit} className="volform submitphoto_form">
                <div className="form-group">
                    <label htmlFor="exampleInputname">Naam</label>
                    <input type="text" name="name" value={this.state.data.name} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputname" placeholder="(Required) Please add Your Full Name" />
                    <h3 className="text-danger">{this.state.error.name}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputname">Roepnaam</label>
                    <input type="text" name="callName" value={this.state.data.callName} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallName" placeholder="(Required) Please add Your Call Name" />
                    <h3 className="text-danger">{this.state.error.callName}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcalldateOfBirth">Geboorte Datum</label>
                    <input type="date" name="dateOfBirth" value={this.state.data.dateOfBirth} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcalldateOfBirth" placeholder="(Required) please add Your DOB" />
                    <h3 className="text-danger">{this.state.error.dateOfBirth}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputgender">Geslacht</label>
                    <select className="wp-form-control wpcf7-text" name="gender" id="exampleInputgender" onChange={this.handleChange} value={this.state.data.gender}>
                        <option key={1} value="Man">
                            Man
              </option>
                        <option key={2} value="Vrouw">
                            Vrouw
              </option>
                        <option key={3} value="Ander">
                            Ander
              </option>
                    </select>
                    <p className="text-danger">{this.state.error.gender}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcalladdress">Uw Adres</label>
                    <input type="text" name="address" value={this.state.data.address} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcalladdress" placeholder="(Required) please add Your address" />
                    <h3 className="text-danger">{this.state.error.address}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallpostCode">Post Code</label>
                    <input type="text" name="postCode" value={this.state.data.postCode} onChange={this.handleChange} className="wp-form-control wpcf7-textl" id="exampleInputcallpostCode" placeholder="(Required) please add Your postCode" />
                    <h3 className="text-danger">{this.state.error.postCode}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallcity">Plaats</label>
                    <input type="text" name="city" value={this.state.data.city} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallcity" placeholder="(Required) please add Your city" />
                    <h3 className="text-danger">{this.state.error.postCode}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallemail">Email</label>
                    <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} className="wp-form-control wpcf7-email" id="exampleInputcallemail" placeholder="(Required) please add Your email" />
                    <h3 className="text-danger">{this.state.error.postCode}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallphone">Thuis Telefoon</label>
                    <input type="text" name="phone" value={this.state.data.phone} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallphone" placeholder="(optional) please add Your Landline" />
                    <h3 className="text-danger">{this.state.error.phone}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallmobile">Mobiele Telefoon</label>
                    <input type="text" name="mobile" value={this.state.data.mobile} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallmobile" placeholder="(Requried) please add Your mobile" />
                    <h3 className="text-danger">{this.state.error.mobile}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcalloccupation">Beroep</label>
                    <input type="text" name="occupation" value={this.state.data.occupation} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcalloccupation" placeholder="(Requried) please add Your occupation" />
                    <h3 className="text-danger">{this.state.error.occupation}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallbelieve">Levensovertuiging</label>
                    <input type="text" name="believe" value={this.state.data.believe} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallbelieve" placeholder="(optional) please add Your believe" />
                    <h3 className="text-danger">{this.state.error.believe}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputmarigeStatus">Burgerlijke staat</label>
                    <select className="wp-form-control wpcf7-text" name="marigeStatus" id="exampleInputmarigeStatus" onChange={this.handleChange} value={this.state.data.marigeStatus}>
                        <option key={1} value="Getrouwdt">
                            Getrouwd
              </option>
                        <option key={2} value="Ongehuwd">
                            Ongehuwd
              </option>
                        <option key={3} value="Gescheiden">
                            Gescheiden
              </option>
                    </select>
                    <p className="text-danger">{this.state.error.marigeStatus}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallavailability">
                        Inzetbaarheid
            </label>
                    <input type="text" name="availability" value={this.state.data.availability} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallavailability" placeholder="(optional) please add Your availability" />
                    <h3 className="text-danger">{this.state.error.availability}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallmotivation">1. Waarom wilt u vrijwilligerswerk doen in het Hospice Amsterdam Zuidoost?</label>
                    <textarea row="5" cols="100" name="motivation" value={this.state.data.motivation} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallamotivation" placeholder="(optional) please add Your motivation" />
                    <h3 className="text-danger">{this.state.error.motivation}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallexperience">2. Heeft u ervaring met vrijwilligerswerk? Zo ja, welk/wat?</label>
                    <textarea row="5" cols="100" name="experience" value={this.state.data.experience} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallaexperience" placeholder="(optional) please add Your experience" />
                    <h3 className="text-danger">{this.state.error.experience}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallhealthExper">
                        3. Heeft u ervaring in de zorgsector of zorg voor een ander? Zo ja, graag een omschrijving wat deze ervaring inhoudt
            </label>
                    <textarea row="5" cols="100" name="healthExper" value={this.state.data.healthExper} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallahealthExper" placeholder="(optional) please add Your healthExper" />
                    <h3 className="text-danger">{this.state.error.healthExper}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallemotionalExper">
                        4. Heeft u zelf ervaring met het verliezen van een dierbare? Welke rol speelt dit bij uw keuze?
            </label>
                    <textarea row="5" cols="100" name="emotionalExper" value={this.state.data.emotionalExper} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallaemotionalExper" placeholder="(optional) please add Your Emotional Exper" />
                    <h3 className="text-danger">
                        {this.state.error.emotionalExper}
                    </h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallcompassion">5. Wat zou voor u belangrijk zijn in de laatste levensfase? </label>
                    <textarea row="5" cols="100" name="compassion" value={this.state.data.compassion} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallaecompassion" placeholder="(optional) please add Your Compassion" />
                    <h3 className="text-danger">{this.state.error.compassion}</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallworkPreferences">
                        6. Wat zou u kunnen bieden binnen het hospice? Welke werkzaamheden binnen het hospice hebben uw voorkeur?{" "}
                    </label>
                    <textarea row="5" cols="100" name="workPreferences" value={this.state.data.workPreferences} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallaeworkPreferences" placeholder="(optional) please add Your Work Preferences" />
                    <h3 className="text-danger">
                        {this.state.error.workPreferences}
                    </h3>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputcallworkExpectations">
                    7. Wat verwacht u van het werk binnen het hospice?{" "}
                    </label>
                    <textarea row="5" cols="100" name="workExpectations" value={this.state.data.workExpectations} onChange={this.handleChange} className="wp-form-control wpcf7-text" id="exampleInputcallaeworkExpectations" placeholder="(optional) please add Your Work Expectations" />
                    <h3 className="text-danger">
                        {this.state.error.workExpectations}
                    </h3>
                </div>

                <button type="submit" className="wpcf7-submit">
                    Formulier Verzenden
          </button>
            </form>
            {this.state.success === "" ? <p /> : <p className="text-success">
                {this.state.success}
            </p>}
            <br />
            <br />
        </div>;
    }
}