import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} AJFS Innovations Pvt Ltd. All rights reserved.</p>
        <p>Innovating Your Future with Cloud Solutions</p>
      </div>
    </footer>
  );
}

export default Footer;
