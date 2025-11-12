import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AJFS Innovations</h4>
            <p>Transforming enterprises through cloud solutions, DevOps automation, and strategic modernization.</p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">Twitter</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/solutions">Cloud Foundations</Link></li>
              <li><Link to="/solutions">Modernization</Link></li>
              <li><Link to="/solutions">DevOps & Automation</Link></li>
              <li><Link to="/solutions">Cloud-Native Engineering</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/resources">Blog</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/">Documentation</Link></li>
              <li><Link to="/">Architecture Guide</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/team">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get In Touch</h4>
            <p>Ready to transform your cloud infrastructure?</p>
            <Link to="/" className="btn btn-primary">Schedule a Call</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AJFS Innovations Pvt Ltd. All rights reserved. | <a href="/">Privacy Policy</a> | <a href="/">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
