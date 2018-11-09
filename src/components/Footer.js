import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
<footer className="footer" role="contentinfo">
  <div className="container fluid2">     
    <ul className="footer-list">
        <li className="footer-item footer-social-item">
          <a title="Twitter" className="footer-social-link" target="_blank" href="http://twitter.com/">
		  <i class="fa fa-twitter" aria-hidden="true"></i>
		  </a>
        </li>
        <li className="footer-item footer-social-item">
          <a title="Youtube" className="footer-social-link" target="_blank" href="http://youtube.com/user/">
		  <i class="fa fa-youtube" aria-hidden="true"></i>
		  </a>
        </li>
        <li className="footer-item footer-social-item">
          <a title="Facebook" className="footer-social-link" target="_blank" href="http://facebook.com/teamth">
		  <i class="fa fa-facebook" aria-hidden="true"></i>
		  </a>
        </li>
        <li className="footer-item footer-social-item">
          <a title="Google Plus" className="footer-social-link" target="_blank" href="http://plus.google.com/110278003536476194286/posts">
		  <i class="fa fa-calendar" aria-hidden="true"></i>
		  </a>
        </li>
        <li className="footer-item footer-social-item">
          <a title="LinkedIn" className="footer-social-link" target="_blank" href="http://linkedin.com/company/th-island-inc-">
		  <i class="fa fa-linkedin" aria-hidden="true"></i>
		  </a>
        </li>
        <li className="footer-item footer-social-item">
          <a title="Instagram" className="footer-social-link" target="_blank" href="http://instagram.com">
		  <i class="fa fa-instagram" aria-hidden="true"></i>
		  </a>
        </li>
			 
			  <li className="footer-item footer-item-text"><a rel="nofollow" className="footer-item-text-link" href="/privacy">Privacy Policy</a></li>
			  <li className="footer-item footer-item-text"><a rel="nofollow" className="footer-item-text-link" href="/terms">Terms &amp; Conditions</a></li>
			  <li className="footer-item footer-item-copyright">&#169; {new Date().getFullYear()} Timesheet Portal, Inc.</li>
    </ul>
</div></footer>
    );
  }
}

export default Footer;
