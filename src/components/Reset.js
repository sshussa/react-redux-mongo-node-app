import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Forgot extends Component {

  constructor() {
    super();
    this.state = {
      password: '',
      message: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const token  = this.props.match.params.id;
    const { password } = this.state;

    axios.post('/auth/reset', { password,token })
      .then((result) => {
        this.setState({ message: '' });
        this.props.history.push('/login')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { password, message,token } = this.state;
    return (
      <div className="container-fluid">
      <header><div id="header-info">
      <h1 id="main-title" class="form-signin-heading">Welcome to Timesheet Portal</h1>
      <div id="phone">
      <a href="tel:+16786676885" target="_blank" href="tel:+16786676885">(678) 667-6885 
       &nbsp;<i className="fa fa-phone"></i></a></div>
      </div><div id="bottom"></div>
      </header>
      <div class="headline-container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div class="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <div class="newUserRegistration"><div><a class="btn-newuser" tabindex="-1" href="#" registration-link=""><div class="btn-txt ng-scope" translate=""><Link to="/register"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Not a member? Get started now</Link></div></a></div><div id="separator"><span class="left"></span><h4 translate="" class="ng-scope">OR</h4><span class="right"></span></div></div>
          
          <div class="form-group">
              <label for="email" class="sr-only cols-sm-2 control-label">Password</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                 <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="email" class="sr-only cols-sm-2 control-label">Confirm Password</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                 <input type="password" class="form-control" placeholder="Confirm Password" name="confirm" required/>
                </div>
              </div>
            </div>

          <button class="btn btn-lg btn-primary btn-block" type="submit">Reset Password</button>
        </form>
        </div>
      </div>
    );
  }
}

export default Forgot;
