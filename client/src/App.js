//App.js
import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";//this is for routing


class App extends Component {
  render() {
    return (
      <div className="App">
            <Router>
            <Switch>
 
            <Route render={function(){
                return (
                <p> Not Found
                <br />
                      <Link className='btn nav-link btn-success' to='/'>
                      Back to log and Reg
                      </Link>
                </p>
                )
            }} />
            </Switch>
            </Router>
      </div>
    );
  }
}

export default App;
