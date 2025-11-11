import React from 'react';
import { Link } from 'react-router-dom';
import Spline3D from '../components/Spline3D';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <Spline3D />
        <div className="container">
          <h1>Innovating Your Future with Cloud Solutions</h1>
          <p>AJFS Innovations Pvt Ltd offers cutting-edge cloud and software development services to propel your business forward.</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary">Our Services</Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>

      <section className="about-section container">
        <h2>About AJFS Innovations</h2>
        <p>At AJFS Innovations, we specialize in transforming businesses through robust cloud strategies, application modernization, and expert software development. Our team is dedicated to delivering scalable, secure, and efficient solutions tailored to your unique needs.</p>
        <p>We believe in harnessing the power of the cloud to unlock new potentials and drive sustainable growth for our clients.</p>
      </section>

      <section className="key-services-section container">
        <h2>Our Key Services</h2>
        <div className="service-grid">
          <div className="service-item">
            <div className="service-icon">☁️</div>
            <h3>Cloud Adoption</h3>
            <p>Seamlessly integrate cloud technologies into your business operations.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">🚀</div>
            <h3>Application Modernization</h3>
            <p>Revitalize your legacy applications for enhanced performance and scalability.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">⚙️</div>
            <h3>Infrastructure Modernization</h3>
            <p>Upgrade your underlying infrastructure for improved efficiency and resilience.</p>
          </div>
        </div>
        <div className="view-all-container">
          <Link to="/services" className="btn btn-tertiary">View All Services</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
