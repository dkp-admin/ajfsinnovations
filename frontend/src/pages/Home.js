import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spline3DSection from '../components/Spline3DSection';
import ServiceModal from '../components/ServiceModal';
import { serviceDetails } from '../data/serviceDetails';
import './Home.css';

function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (serviceId) => {
    const service = serviceDetails.find(s => s.id === serviceId);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <Spline3DSection />
      </section>

      <section className="about-section container">
        <h2>About AJFS Innovations</h2>
        <p>At AJFS Innovations, we specialize in transforming businesses through robust cloud strategies, application modernization, and expert software development. Our team is dedicated to delivering scalable, secure, and efficient solutions tailored to your unique needs.</p>
        <p>We believe in harnessing the power of the cloud to unlock new potentials and drive sustainable growth for our clients.</p>
      </section>

      <section className="key-services-section container">
        <h2>Our Key Services</h2>
        <div className="service-grid">
          <div className="service-item" onClick={() => handleServiceClick(2)} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && handleServiceClick(2)}>
            <div className="service-icon">☁️</div>
            <h3>Cloud Adoption</h3>
            <p>Seamlessly integrate cloud technologies into your business operations.</p>
            <div className="service-item-overlay">
              <button className="service-item-button">Learn More</button>
            </div>
          </div>
          <div className="service-item" onClick={() => handleServiceClick(4)} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && handleServiceClick(4)}>
            <div className="service-icon">🚀</div>
            <h3>Application Modernization</h3>
            <p>Revitalize your legacy applications for enhanced performance and scalability.</p>
            <div className="service-item-overlay">
              <button className="service-item-button">Learn More</button>
            </div>
          </div>
          <div className="service-item" onClick={() => handleServiceClick(5)} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && handleServiceClick(5)}>
            <div className="service-icon">⚙️</div>
            <h3>Infrastructure Modernization</h3>
            <p>Upgrade your underlying infrastructure for improved efficiency and resilience.</p>
            <div className="service-item-overlay">
              <button className="service-item-button">Learn More</button>
            </div>
          </div>
        </div>
        <div className="view-all-container">
          <Link to="/services" className="btn btn-tertiary">View All Services</Link>
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Home;
