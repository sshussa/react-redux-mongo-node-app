import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navbar extends Component {
     logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  render() {
    return (
<nav class="navbar navbar-expand-lg navbar-light nav" id="nav-container">
<div class="container-fluid">
<a class="navbar-brand" href="#"><FontAwesomeIcon icon="clock" size="lg"/></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-md-center" id="navbarSupportedContent">
    <ul class="navbar-nav menu-inner">
      <li class="nav-item active nvsty">
        <NavLink class="nav-link" to="/" >Home <span class="sr-only">(current)</span></NavLink>
      </li>
      <li class="nav-item nvsty">
        <NavLink class="nav-link" to="/time" >Timesheet</NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" to="/billable" >Billable</NavLink>
      </li>
    </ul>
    <ul class="navbar-nav my-2 my-md-0 menu-inner pulRtSty">
    <li class="nav-item nvsty">
        <NavLink class="nav-link" to="/"><FontAwesomeIcon icon="bell" size="md"/></NavLink>
      </li>
    <li class="nav-item dropdown">
       <NavLink class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <FontAwesomeIcon icon="user" size="md"/>
        </NavLink>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <NavLink class="dropdown-item" to="/profile" >Profile</NavLink>
          <div class="dropdown-divider"></div>
          <NavLink class="dropdown-item" to="/login">
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>LOG OUT</button>
              }
          </NavLink>
        </div>
      </li>
    </ul>
  </div>
  </div>
</nav>           
           );
  }
}

class TimeSubMenu extends Component {
  render() {
    return (
       <div>
       <ul className="nav__submenu">
        <li className="nav__submenu-item ">
          <Link to="/time/billable">Billable Details</Link>
        </li>
      </ul>
      </div>
      );
  }
}

class ProfileSubMenu extends Component {
    logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  render() {
    return (
       <div>
       <ul className="nav__submenu atWdth">
        <li className="nav__submenu-item ">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav__submenu-item">
          {localStorage.getItem('jwtToken') &&
                <button class="btn btn-default lgbtn" onClick={this.logout}>Logout</button>
              }
        </li>
      </ul>
      </div>
      );
  }
}

export default Navbar;