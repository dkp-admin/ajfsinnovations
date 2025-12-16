import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StrategyCallModal from './StrategyCallModal';
import './Header.css';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F5055d9dc12a5430998bdc8b18f3f6927%2F7ae2f64c66fa4a2d9badad510d4de1b5?format=webp&width=800"
              alt="AJFS Innovations Logo"
              className="logo-image"
            />
          </Link>
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/team">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
          <button className="cta-button" onClick={() => setIsModalOpen(true)}>
            Book a Strategy Call
          </button>
        </div>
      </header>

      <StrategyCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default Header;
