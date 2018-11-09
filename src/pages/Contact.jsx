import React, { Component } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Contact extends Component {
  render() {
    return (
      <div>
   <Header />
        <div className="inner-wrapper">
        <div id="navigation">
        <Navbar />
        <Jumbotron title="Welcome" subtitle="Community Page Hero Image!" />
        <div id="conFluid" className="container-fluid">
        <h2>Contact Page</h2>
            <h1 className="display-3">GOT QUESTIONS?</h1>
        <p>The easiest thing to do is post on
        our <a href="#">forums</a>.
        </p>
        </div>
        <Footer />
      </div>
      </div>
      </div>
    );
  }
}

export default Contact;
