import React from 'react';
import './ServiceModal.css';
import DiagramRenderer from './DiagramRenderer';

function ServiceModal({ service, isOpen, onClose }) {
  if (!isOpen || !service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span>&times;</span>
        </button>

        <div className="modal-content">
          <h2 className="modal-title">{service.title}</h2>

          <div className="modal-diagram-section">
            <DiagramRenderer diagramType={service.diagram} />
          </div>

          <div className="modal-body">
            <section className="modal-section">
            <h3>Overview</h3>
            <p>{service.overview}</p>
          </section>

          {service.sixRFramework && (
            <section className="modal-section">
              <h3>{service.sixRFramework.title}</h3>
              <p>{service.sixRFramework.description}</p>

              <div className="six-r-container">
                {service.sixRFramework.strategies.map((strategy, index) => (
                  <div key={index} className="six-r-card">
                    <h4>{strategy.name}</h4>
                    <p className="six-r-subtitle">{strategy.subtitle}</p>
                    <p className="six-r-description">{strategy.description}</p>
                  </div>
                ))}
              </div>

              <div className="six-r-diagram-section">
                <DiagramRenderer diagramType={service.sixRFramework.diagram} />
              </div>
            </section>
          )}

          <section className="modal-section">
            <h3>Key Benefits</h3>
              <ul className="benefits-list">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>

            <section className="modal-section">
              <h3>Implementation Phases</h3>
              <div className="phases-container">
                {service.phases.map((phase, index) => (
                  <div key={index} className="phase-box">
                    <h4>{phase.phase}</h4>
                    <p>{phase.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="modal-section">
              <h3>Real-World Use Cases</h3>
              <ul className="use-cases-list">
                {service.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </section>

            {service.fitsInModel && (
              <section className="modal-section fits-in-model-section">
                <h3>Where IaaS Refactoring Fits in the 6R Model</h3>
                <p>{service.fitsInModel}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;
