import React from 'react';
import ServiceIcon from './ServiceIcon';
import './ServiceCard.css';

function ServiceCard({ title, description, id, onClick }) {
  return (
    <div className="service-card" onClick={onClick} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && onClick()}>
      <div className="service-image-wrapper">
        <ServiceIcon serviceId={id} title={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="service-card-overlay">
        <button className="service-card-button">Learn More</button>
      </div>
    </div>
  );
}

export default ServiceCard;
