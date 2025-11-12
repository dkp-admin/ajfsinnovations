import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import { serviceDetails } from '../data/serviceDetails';
import './Services.css';

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const servicePillars = [
    {
      title: 'Cloud Foundations & Governance',
      description: 'Establish secure, scalable, and compliant cloud environments from day one.',
      serviceIds: [1, 2, 3]
    },
    {
      title: 'Modernization & DevOps Automation',
      description: 'Transform legacy systems and automate your infrastructure and deployment pipelines.',
      serviceIds: [4, 5, 6]
    },
    {
      title: 'Cloud-Native Engineering',
      description: 'Build and deploy modern applications designed for cloud platforms.',
      serviceIds: [7, 8, 9]
    }
  ];

  const handleServiceClick = (serviceId) => {
    const service = serviceDetails.find(s => s.id === serviceId);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const getServicesByIds = (ids) => {
    return serviceDetails.filter(service => ids.includes(service.id));
  };

  return (
    <div className="services-page">
      <div className="services-header container">
        <h1>Our Cloud Solutions & Services</h1>
        <p>Comprehensive services spanning cloud foundations, modernization, DevOps automation, and cloud-native engineering.</p>
      </div>

      {servicePillars.map((pillar, pillarIndex) => (
        <section key={pillarIndex} className="service-pillar">
          <div className="container">
            <div className="pillar-header">
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </div>

            <div className="services-grid">
              {getServicesByIds(pillar.serviceIds).map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.overview || service.description}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Services;
