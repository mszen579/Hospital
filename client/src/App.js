//App.js

//importing packages
import React, { Component } from 'react';
import './index.css';
import { BrowserRouter, Router, Route, Switch, Link } from "react-router-dom";//this is for routing


//importing components cleint
import Home from './components/UserPanel/Home';
import Donation from './components/UserPanel/Donation';
import Volunteer from './components/UserPanel/Volunteer';
import Articles from './components/UserPanel/Articles';
import Volunteerform from './components/UserPanel/Volunteerform';
import Aboutus from './components/UserPanel/Aboutus';
import Header from './components/UserPanel/Header';
import Footer from './components/UserPanel/Footer';

//importing components admin
import Login from './components/Admin/Login';
import Register from './components/Admin/Register';
import Panel from './components/Admin/Panel';
import Addarticle from './components/Admin/Addarticle';
import Dashboardarticle from './components/Admin/Dashboardarticle';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <div className="App">
      <Header/>
        
            <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Donation' component={Donation} />
            <Route path='/Volunteer' component={Volunteer} />
            <Route path='/Volunteerform' component={Volunteerform} />
            <Route path='/News' component={Articles} />
            <Route path='/Aboutus' component={Aboutus} />
            <Route path='/Adminwsq' component={Login} />
            <Route exact path='/Admin-panel' component={Panel} />
            <Route path='/Admin-panel/register' component={Register} />
            <Route path='/Admin-panel/Add-article' component={Addarticle} />
            <Route path='/Admin-panel/Dashboard-article' component={Dashboardarticle} />
            <Route render={function(){
                return (
                <p> Not Found
                <br />
                      <Link className='btn nav-link btn-success' to='/'>
                      Back to Homepage
                      </Link>
                </p>
                )
            }} />
            </Switch> 
            <Footer/>    
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
