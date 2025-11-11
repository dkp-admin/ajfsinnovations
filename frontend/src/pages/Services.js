import React from 'react';
import ServiceCard from '../components/ServiceCard';
import './Services.css';

function Services() {
  const services = [
    {
      title: 'Landing Zone Development',
      description: 'Establish a secure, scalable, and compliant foundational environment for your cloud operations in GCP. We set up core accounts, networking, security controls, and identity management to ensure a robust starting point for your cloud journey.',
      image: 'placeholder_landing_zone.jpg'
    },
    {
      title: 'Cloud Adoption',
      description: 'Guide your organization through the strategic adoption of cloud services. From initial assessments to governance and operational frameworks, we ensure a smooth transition and maximize the benefits of cloud computing.',
      image: 'placeholder_cloud_adoption.jpg'
    },
    {
      title: 'Cloud Migration',
      description: 'Efficiently move your existing applications and data to the cloud. We handle everything from discovery and planning to execution and optimization, minimizing downtime and risk during the migration process.',
      image: 'placeholder_cloud_migration.jpg'
    },
    {
      title: 'Application Modernization',
      description: 'Transform your legacy applications into modern, cloud-native solutions. This includes re-platforming, re-factoring, re-architecting, and containerization to improve performance, scalability, and maintainability.',
      image: 'placeholder_app_modernization.jpg'
    },
    {
      title: 'Infrastructure Modernization',
      description: 'Upgrade your underlying IT infrastructure with modern cloud technologies. We help you move from traditional on-premise setups to agile, scalable, and cost-effective cloud-based infrastructure-as-a-Service (IaaS) and platform-as-a-Service (PaaS) solutions.',
      image: 'placeholder_infra_modernization.jpg'
    },
    {
      title: 'Refactoring using IaaS Approach',
      description: 'Optimize your applications by re-architecting them to leverage Infrastructure as a Service (IaaS) capabilities. This involves breaking down monolithic applications into smaller, manageable components deployed on virtual machines or containers, enhancing flexibility and resource utilization.',
      image: 'placeholder_refactoring_iaas.jpg'
    },
    {
      title: 'Cloud Frontend Development',
      description: 'Develop dynamic, user-friendly frontend applications that seamlessly integrate with cloud backends. We focus on creating responsive, performant, and scalable web and mobile interfaces using modern JavaScript frameworks.',
      image: 'placeholder_cloud_frontend.jpg'
    },
    {
      title: 'Cloud Backend Development',
      description: 'Design and build robust, scalable, and secure backend systems hosted on cloud platforms. Our expertise includes API development, database management, serverless functions, and microservices architecture to power your applications.',
      image: 'placeholder_cloud_backend.jpg'
    },
    {
      title: 'Software Development',
      description: 'Comprehensive custom software development services tailored to your business needs. From conceptualization to deployment and maintenance, we build high-quality, innovative software solutions across various industries and platforms.',
      image: 'placeholder_software_dev.jpg'
    },
  ];

  return (
    <div className="services-page container">
      <div className="services-header">
        <h1>Our Comprehensive Services</h1>
        <p>AJFS Innovations Pvt Ltd offers a wide range of cloud and software development services to help your business thrive in the digital era.</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}

export default Services;
