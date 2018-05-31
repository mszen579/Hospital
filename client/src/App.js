//App.js

//importing packages
import React, { Component } from 'react';
//importing css files
import "./components/UserPanel/css/bootstrap.min.css";
import "./components/UserPanel/css/font-awesome.min.css";
import "./components/UserPanel/css/superslides.css";
import "./components/UserPanel/css/slick.css";

import "./components/UserPanel/css/animate.css";
import "./components/UserPanel/css/jquery.tosrus.all.css";
import "./components/UserPanel/css/themes/default-theme.css";
import "./components/UserPanel/style.css";




import './index.css';
import { BrowserRouter, Router, Route, Switch, Link } from "react-router-dom";//this is for routing






//importing components client
import Home from './components/UserPanel/Home';
import Donation from './components/UserPanel/Donation';
import Volunteer from './components/UserPanel/Volunteer';
import Volform from './components/UserPanel/Volform';
import Articles from './components/UserPanel/Articles';

import Header from './components/UserPanel/Header';
import Footer from './components/UserPanel/Footer';
import Singlearticle from './components/UserPanel/Singlearticle';

//importing javascript
import Script from "react-load-script";
//importing components admin
import Login from './components/Admin/Login';
import Register from './components/Admin/Register';
import Panel from './components/Admin/Panel';
import Addarticle from './components/Admin/Addarticle';
import Dashboardarticle from './components/Admin/Dashboardarticle';
import Dashboardvolunteers from './components/Admin/Dashboardvolunteers';
import Editarticledetails from './components/Admin/Editarticledetails';
import Listofadmins from './components/Admin/Listofadmins';
import Singlevolunteer from './components/Admin/Singlevolunteer';
import Contactus from './components/UserPanel/Contactus';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scriptError: "", scriptLoaded: "" };


    this.handleScriptError = this.handleScriptError.bind(this);
    this.handleScriptCreate = this.handleScriptCreate.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);

  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }



  render() {
    return (
      <BrowserRouter>
       <div className="App">
      <Header/>
        
            <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Donation' component={Donation} />
            <Route path='/Volunteer' component={Volunteer} />
            <Route path='/Volform' component={Volform} />
            <Route path='/News' component={Articles} />
         
            <Route path='/Contactus' component={Contactus} />
            <Route path='/Adminwsq' component={Login} />
            <Route exact path='/Admin-panel' component={Panel} />
            <Route path='/Admin-panel/Register' component={Register} />
            <Route path='/Admin-panel/AddArticle' component={Addarticle} />
            <Route path='/Admin-panel/DashboardArticle' component={Dashboardarticle} />
            <Route path='/Admin-panel/Dashboardvolunteers' component={Dashboardvolunteers} />
            <Route path='/Admin-panel/:id/EditArticle' component={Editarticledetails} />
            <Route path='/:id/SingleArticle' component={Singlearticle} />
            <Route path='/Admin-panel/allAdmins' component={Listofadmins} />
            <Route path='/Admin-panel/:id/Singlevolunteer' component={Singlevolunteer} />
            
            <Route render={function(){
                return (
                <p> 404 Page Not Found
                <br />
                      <Link className='btn nav-link btn-success' to='/'>
                      Back to Homepage
                      </Link>
                </p>
                )
            }} />
            </Switch>
        <Footer/>
          <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}

          />

          <Script url="components/UserPanel/js/queryloader2.min.js" type="text/javaScript"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />

          <Script url="components/UserPanel/js/wow.min.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}

          />

          <Script url="components/UserPanel/js/bootstrap.min.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}


          />

          <Script url="components/UserPanel/js/slick.min.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}

          />

          <Script url="components/UserPanel/js/jquery.easing.1.3.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)} />
          <Script url="components/UserPanel/js/jquery.animate-enhanced.min.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)} />
          <Script url="components/UserPanel/js/jquery.superslides.min.js" type="text/javascript" charset="utf-8"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />

          <Script url="https://cdn.rawgit.com/pguso/jquery-plugin-circliful/master/js/jquery.circliful.min.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />

          <Script type="text/javascript" language="javascript" url="components/UserPanel/js/jquery.tosrus.min.all.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}

          />
          <Script url="components/UserPanel/js/custom.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}

          /> 



                
            
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
