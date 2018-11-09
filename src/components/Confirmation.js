import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Confirmation extends Component {

constructor() {
    super();
    this.state = {
      message: ''
    };
  }

componentDidMount() {
const token  = this.props.match.params.id;
axios.post('/auth/confirmation', { token })
      .then(res => res.json(),
      this.setState({ message: 'The account has been verified.' })
      )
      .catch(function (error) {
      
         this.setState({ message: 'Username already exists.'}),
         this.props.history.push("/register");
        
  });
  }

  render() {
    const { message } = this.state;
    return (
      <div className="container">
      <header><div id="header-info">
      <h1 id="main-title" class="form-signin-heading">Welcome to Timesheet Portal</h1>
      <div id="phone">
      <a href="tel:+16786676885" target="_blank" href="tel:+16786676885">(678) 667-6885 &nbsp;<i className="fa fa-phone"></i></a></div>
      </div><div id="bottom"></div>
      </header>
      <div class="headline-container">
      <div>
        {message !== '' &&
            <div class="alert alert-success alert-dismissible" role="alert">
            <h4 class="alert-heading">Well done!</h4>
              { message }
            </div>
          }
  <div class="newUserRegistration">
  <div><a class="btn-newuser" tabindex="-1" href="#" registration-link="">
  <div class="btn-txt ng-scope" translate="">
  <Link to="/login">
  <i className="fa fa-sign-in" aria-hidden="true"></i> Please log in</Link>
  </div></a></div></div></div>
        </div>
      </div>
    );
  }
}

export default Confirmation;
