import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBell,faDollarSign,faUser,faClock, faAddressCard} from '@fortawesome/free-solid-svg-icons'
import {
  Route,
  Link,
  NavLink,
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

//pages
import Home from './pages/Home.jsx';
import Billable from './pages/Billable.jsx';
import Profile from './pages/profile.jsx';
import Timesheet from './pages/Timesheet.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Confirmation from './components/Confirmation';
import Reset from './components/Reset';


library.add(faSearch,faBell,faDollarSign,faUser,faClock, faAddressCard);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact strict component={Home}/>
          <Route path="/contact" exact strict component={Contact}/>
          <Route path="/time" exact strict component={Timesheet}/>
          <Route path="/billable" exact strict component={Billable}/>
          <Route path="/profile" exact strict component={Profile}/>
          <Route path="/login" exact strict component={Login}/>
          <Route path="/register" exact strict component={Register}/>
          <Route path="/confirmation/:id" exact strict component={Confirmation}/>
          <Route path="/reset/:id" exact strict component={Reset}/>
          <Route path="/forgot" exact strict component={Forgot}/>
        </div>
      </Router>
    );
  }
}




export default App;