import React from 'react';
import './ServiceCard.css';

function ServiceCard({ title, description, image, onClick }) {
  return (
    <div className="service-card" onClick={onClick} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && onClick()}>
      {image && (
        <div className="service-image-wrapper">
          <img src={`/images/${image}`} alt={title} className="service-image" />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="service-card-overlay">
        <button className="service-card-button">Learn More</button>
      </div>
    </div>
  );
}

export default ServiceCard;
