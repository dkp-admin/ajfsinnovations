import React from 'react';
import './ServiceCard.css';

function ServiceCard({ title, description, image }) {
  return (
    <div className="service-card">
      {image && (
        <div className="service-image-wrapper">
          <img src={`/images/${image}`} alt={title} className="service-image" />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;
