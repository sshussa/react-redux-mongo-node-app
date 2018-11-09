import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import './Profile.css';
import userlogo from '../images/userlogo.png'; 

const userName=localStorage.getItem('jwtUser');
const emailName=localStorage.getItem('jwtEmail');
const locationName=localStorage.getItem('jwtLocation');
const rateName=localStorage.getItem('jwtRate');
class Profile extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book')
      .then(res => {
        this.setState({ books: res.data });
        console.log(this.state.books);
      })
      .catch((error) => {
          this.props.history.push("/login");
      });
  }
    render() {
    return (
      <div>
      <div className="inner-wrapper">

        <div id="navigation">
        <Navbar />
        <Jumbotron title="Welcome" subtitle="Home Page Hero Image!" />
        <div id="conFluid" className="container-fluid">
          <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 toppad" >
          <div class="panel panel-info">
            <div class="panel-heading">
            <h3 class="panel-title"> <FontAwesomeIcon icon="address-card" size="lg"/> Hello,  {userName}</h3>
            </div>
            <div class="panel-body mt-20">
              <div class="row">    
                <div class=" col-md-12 col-lg-12 "> 
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>User Name:</td>
                        <td>{emailName}</td>
                      </tr>

                        <tr>
                        <td>Location</td>
                        <td>{locationName}</td>
                      </tr>
                      <tr>
                        <td>Rate:</td>
                        <td>{rateName}</td>
                      </tr>
                      <tr>
                        <td>Support</td>
                        <td><a href="mailto:timeportal.admn@gmail.com">info@support.com</a></td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
        <Footer />
        </div>
        </div>
      </div>
    );
  }
}

export default Profile;
