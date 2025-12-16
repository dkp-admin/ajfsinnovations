import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spline3DSection from '../components/Spline3DSection';
import ServiceModal from '../components/ServiceModal';
import StrategyCallModal from '../components/StrategyCallModal';
import { serviceDetails } from '../data/serviceDetails';
import './Home.css';

function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleServiceClick = (serviceId) => {
    const service = serviceDetails.find(s => s.id === serviceId);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const keyTakeaways = [
    'End-to-end cloud landing zones, security, and observability in weeks, not months.',
    'Automated CI/CD, infrastructure as code, and DevSecOps baked into every project.',
    'Modernization strategy using the 6R framework—Rehost, Replatform, Refactor, Repurchase, Retire, Retain.',
    'Hands-on experts across GCP, AWS, and Azure—no heavy DevOps hiring required.'
  ];

  const challenges = [
    {
      title: 'Cloud Cost Sprawl & No Visibility',
      description: 'Multi-cloud deployments without cost tracking, governance, or resource optimization.',
      solution: 'We implement automated cost monitoring, chargeback models, and resource optimization strategies.'
    },
    {
      title: 'Manual, Slow Infrastructure Changes',
      description: 'Infrastructure changes take weeks, blocking your engineering velocity and innovation.',
      solution: 'We automate infrastructure with Terraform, GitOps, and CI/CD pipelines for instant deployments.'
    },
    {
      title: 'Security & Compliance Gaps',
      description: 'Uncontrolled cloud environments create audit failures, data exposure, and regulatory risk.',
      solution: 'We establish landing zones, IAM controls, network segmentation, and security baselines.'
    },
    {
      title: 'Legacy Applications Blocking Innovation',
      description: 'Monolithic applications cannot scale, modernize, or leverage cloud capabilities effectively.',
      solution: 'We refactor, containerize, and migrate legacy systems to cloud-native architectures.'
    },
    {
      title: 'Fragmented Observability & Logging',
      description: 'Multiple monitoring tools create blind spots, delayed incident response, and poor visibility.',
      solution: 'We centralize observability with unified dashboards, alerting, and automated incident response.'
    },
    {
      title: 'Lack of DevOps & Automation Expertise',
      description: 'Teams lack in-house expertise to design and operate secure, scalable cloud platforms.',
      solution: 'We provide hands-on DevOps architecture, upskilling, and operational support.'
    }
  ];

  const workSteps = [
    {
      number: '1',
      title: 'Assess Your Current Environment',
      description: 'We analyze your infrastructure, applications, cloud maturity, and business goals to identify optimization opportunities.'
    },
    {
      number: '2',
      title: 'Design Landing Zone & Strategy',
      description: 'Using the 6R framework, we design secure, scalable cloud architectures tailored to your needs.'
    },
    {
      number: '3',
      title: 'Automate Infrastructure & Security',
      description: 'We implement IaC, CI/CD pipelines, and security controls to enable rapid, reliable deployments.'
    },
    {
      number: '4',
      title: 'Operate & Optimize Continuously',
      description: 'We provide observability, cost optimization, and ongoing operational support for sustained success.'
    }
  ];

  const caseStudies = [
    {
      title: 'Reduced Deployment Time by 90%',
      description: 'Automated GCP pipelines cut deployment time from days to minutes, enabling continuous delivery.',
      outcome: 'View Example Engagement'
    },
    {
      title: 'Migrated 50+ Workloads with Zero Downtime',
      description: 'Successfully migrated legacy services to GKE and Cloud Run with automated testing and validation.',
      outcome: 'View Example Engagement'
    },
    {
      title: 'Reduced Cloud Costs by 40%',
      description: 'Optimized VM sizing, storage, and reserved instances across multi-cloud environments.',
      outcome: 'View Example Engagement'
    },
    {
      title: 'Established Enterprise-Grade Security & Compliance',
      description: 'Implemented comprehensive security controls, IAM policies, and compliance frameworks across cloud infrastructure.',
      outcome: 'View Example Engagement'
    }
  ];

  const faqs = [
    {
      question: 'What cloud platforms does AJFS support?',
      answer: 'We specialize in GCP, AWS, and Azure, and can design multi-cloud strategies. Our expertise spans cloud landing zones, migrations, modernization, DevOps, and security across all major platforms.'
    },
    {
      question: 'How is AJFS different from hiring an internal DevOps team?',
      answer: 'We provide immediate expertise, proven processes, and frameworks (like the 6R modernization model) without the hiring, onboarding, and overhead of a full-time team. You get hands-on architects and engineers for specific engagements or ongoing support.'
    },
    {
      question: 'Can you work with our existing security and compliance requirements?',
      answer: 'Yes. We design solutions that align with your regulatory requirements (SOC 2, ISO 27001, HIPAA, PCI-DSS, etc.) and integrate with your existing security tools and policies.'
    },
    {
      question: 'What is your typical project duration?',
      answer: 'Projects vary: Landing Zone Development (8-12 weeks), Cloud Migration (16-24 weeks), Application Modernization (20-28 weeks), Refactoring (10-16 weeks). We tailor timelines to your scope and complexity.'
    },
    {
      question: 'Do you only work with GCP, or also AWS and Azure?',
      answer: 'We support GCP, AWS, and Azure equally. We also design multi-cloud strategies, hybrid approaches, and platform-specific optimizations based on your business needs.'
    },
    {
      question: 'Can you help with cost optimization?',
      answer: 'Absolutely. We implement cloud cost monitoring, right-sizing, reserved instances, spot instances, and architectural changes to reduce cloud bills without sacrificing performance.'
    },
    {
      question: 'Do you provide ongoing support or only project-based work?',
      answer: 'Both. We offer project-based engagements (assessments, migrations, modernizations) and ongoing operational support (DevOps, observability, cost optimization, security).'
    }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <Spline3DSection />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Innovating Your Future with Cloud Solutions</h1>
            <p>We design, build, and operate secure, automated cloud platforms across GCP, AWS, and Azure.</p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => setIsStrategyModalOpen(true)}>
                Book a Cloud Strategy Call
              </button>
              <Link to="/solutions" className="btn btn-secondary">
                View Our Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="key-takeaways-section container">
        <h2>Why Teams Partner with AJFS Innovations</h2>
        <div className="takeaways-grid">
          {keyTakeaways.map((item, index) => (
            <div key={index} className="takeaway-card">
              <div className="takeaway-icon">✓</div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="challenges-section container">
        <h2>Challenges We Solve</h2>
        <p className="section-subtitle">Common cloud and DevOps obstacles that slow down your innovation and increase your costs.</p>
        <div className="challenges-grid">
          {challenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <div className="challenge-icon">⚡</div>
              <h3>{challenge.title}</h3>
              <p className="challenge-desc">{challenge.description}</p>
              <p className="solution-text"><strong>How we help:</strong> {challenge.solution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="key-services-section container">
        <h2>Featured Services</h2>
        <p className="section-subtitle">Explore our core offerings designed to transform your cloud infrastructure and operations.</p>
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

      <section className="how-we-work-section container">
        <h2>How We Work</h2>
        <p className="section-subtitle">A structured approach to transform your cloud platform and operations.</p>
        <div className="work-steps-container">
          {workSteps.map((step, index) => (
            <div key={index} className="work-step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < workSteps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="case-studies-section container">
        <h2>Real-World Outcomes</h2>
        <p className="section-subtitle">See how AJFS helps organizations achieve their cloud transformation goals.</p>
        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <div key={index} className="case-study-card">
              <div className="case-study-icon">📊</div>
              <h3>{study.title}</h3>
              <p>{study.description}</p>
              <Link to="/case-studies" className="case-study-link">{study.outcome} →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section container">
        <h2>Frequently Asked Questions</h2>
        <p className="section-subtitle">Common questions about our services, process, and expertise.</p>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedFAQ === index}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle">{expandedFAQ === index ? '−' : '+'}</span>
              </button>
              {expandedFAQ === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <StrategyCallModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}

export default Home;
