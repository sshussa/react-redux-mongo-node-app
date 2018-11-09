import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      userfirstname: '',
      userlastname: '',
      userrate: '',
      userlocation: '',
      username: '',
      password: '',
      message:''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { userfirstname, userlastname, userrate, userlocation, username, password } = this.state;

    axios.post('/auth/register', { userfirstname, userlastname, userrate, userlocation, username, password })
      .then((result) => {
        this.setState({message:'A verification email has been sent to '+username})
      })
       .catch(function (error) {
      if(error.response.status === 401) {
         this.setState({ message: 'We were unable to find a valid token. Your token my have expired.'}),
         this.props.history.push("/register");
        }
  });
  }

  render() {
    const { userfirstname, userlastname, userrate, userlocation, username, password,message } = this.state;
    return (
      <div class="container">
      <header><div id="header-info">
      <h1 id="main-title" class="form-signin-heading">Welcome to Timesheet Portal</h1>
      <div id="phone">
      <a href="tel:+16786676885" target="_blank" href="tel:+16786676885">(678) 667-6885 &nbsp; <i className="fa fa-phone"></i></a></div>
      </div><div id="bottom"></div>
      </header>
      <div class="headline-container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">SIGN UP</h2>


<div class="form-group">
  
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" placeholder="First Name" name="userfirstname" value={userfirstname} onChange={this.onChange} required/>
                </div>
              </div>
            </div>
            <div class="form-group">
              
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" placeholder="Last Name" name="userlastname" value={userlastname} onChange={this.onChange} required/>
                </div>
              </div>
            </div>

  <div class="form-group">
              
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                  <input type="email" class="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
                </div>
              </div>
            </div>
            <div class="form-group">
              
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                </div>
              </div>
            </div>
            <div class="form-group">
            
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" placeholder="Location" name="userlocation" value={userlocation} onChange={this.onChange} required/>
                </div>
              </div>
            </div>
            <div class="form-group">
              
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-dollar fa-lg" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" placeholder="Rate" name="userrate" value={userrate} onChange={this.onChange} required/>
                </div>
              </div>
            </div>
    <div class="form-group ">
          <button class="btn btn-lg btn-success btn-block" type="submit">Register</button>
        </div>
        <div className="mrgnBtn">
        {message !== '' &&
            <div class="alert alert-success alert-dismissible" role="alert">
              <h4 class="alert-heading">Success !</h4>
              { message }
            </div>
          }
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Create;
