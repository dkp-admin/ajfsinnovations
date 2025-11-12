import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StrategyCallModal from '../components/StrategyCallModal';
import './CaseStudies.css';

function CaseStudies() {
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const caseStudies = [
    {
      id: 1,
      title: 'E-Commerce Platform: 90% Faster Deployments',
      category: 'DevOps & Automation',
      company: 'Global E-Commerce Company',
      challenges: [
        'Manual deployments took 4-6 hours with frequent human errors',
        'No automated testing or validation',
        'Downtime during releases impacted customer experience'
      ],
      solution: 'Implemented CI/CD pipelines with Cloud Build, automated testing, and blue-green deployments on GKE',
      results: [
        'Reduced deployment time from 4+ hours to 15 minutes',
        '99.9% uptime during deployments',
        '50% reduction in deployment-related incidents'
      ],
      metrics: [
        { label: 'Deployment Time', before: '4-6 hours', after: '15 min', improvement: '96%' },
        { label: 'Release Frequency', before: 'Monthly', after: 'Daily', improvement: '∞' },
        { label: 'Incident Rate', before: '8/month', after: '1/month', improvement: '87.5%' }
      ]
    },
    {
      id: 2,
      title: 'Legacy Monolith to Cloud-Native: 50 Microservices',
      category: 'Application Modernization',
      company: 'Fortune 500 Financial Services',
      challenges: [
        '15-year-old monolithic application blocking innovation',
        'Inability to scale individual components independently',
        'Tightly coupled code base with 6+ month deployment cycles'
      ],
      solution: 'Applied 6R framework (Refactor) to decompose monolith into microservices, containerized with Docker/GKE',
      results: [
        'Successfully migrated 50+ microservices to GKE',
        'Deployment cycles reduced from 6 months to 2 weeks',
        'Team velocity increased by 300%'
      ],
      metrics: [
        { label: 'Microservices Deployed', before: '1 monolith', after: '50 services', improvement: 'N/A' },
        { label: 'Deployment Cycle', before: '6 months', after: '2 weeks', improvement: '93%' },
        { label: 'Team Velocity', before: '100%', after: '300%', improvement: '200%' }
      ]
    },
    {
      id: 3,
      title: 'Multi-Cloud Cost Optimization: $2.5M Annual Savings',
      category: 'Cost Optimization',
      company: 'SaaS Technology Company',
      challenges: [
        'Operating across GCP, AWS, and Azure with no cost visibility',
        'Over-provisioned resources without proper right-sizing',
        'No reserved instance or commitment discount strategy'
      ],
      solution: 'Implemented cost monitoring, right-sizing analysis, reserved instances, and workload optimization',
      results: [
        'Reduced cloud spend by 40% (~$2.5M annually)',
        'Implemented FinOps culture with cost accountability',
        'Maintained performance while reducing infrastructure costs'
      ],
      metrics: [
        { label: 'Annual Cloud Costs', before: '$6.2M', after: '$3.7M', improvement: '40%' },
        { label: 'Compute Waste', before: '35%', after: '8%', improvement: '77%' },
        { label: 'Reserved Discount Utilization', before: '15%', after: '85%', improvement: 'N/A' }
      ]
    },
    {
      id: 4,
      title: 'Security & Compliance: Zero Audit Findings',
      category: 'Security & Compliance',
      company: 'Healthcare Technology Provider',
      challenges: [
        'Failed security audit with 15+ critical findings',
        'Non-compliant with HIPAA and SOC 2 requirements',
        'Manual compliance tracking and documentation'
      ],
      solution: 'Designed secure landing zone, implemented network segmentation, encryption, audit logging, and automated compliance monitoring',
      results: [
        'Achieved full SOC 2 Type II compliance',
        'HIPAA audit passed with zero findings',
        'Automated compliance monitoring eliminates manual checks'
      ],
      metrics: [
        { label: 'Security Findings', before: '15 critical', after: '0', improvement: '100%' },
        { label: 'Compliance Score', before: '35%', after: '100%', improvement: 'N/A' },
        { label: 'Audit Preparation Time', before: '6 weeks', after: 'Automated', improvement: 'N/A' }
      ]
    },
    {
      id: 5,
      title: 'Data Center Migration: Zero-Downtime cutover',
      category: 'Cloud Migration',
      company: 'Enterprise Software Provider',
      challenges: [
        'Moving 200+ VMs with custom applications',
        'Cannot afford production downtime',
        'Complex dependencies between systems'
      ],
      solution: 'Developed comprehensive migration strategy, network connectivity via VPN, staged cutover with validation',
      results: [
        'Migrated 200+ VMs to GCP with zero downtime',
        'Completed in 6 weeks ahead of schedule',
        'Post-migration performance improved by 25%'
      ],
      metrics: [
        { label: 'VMs Migrated', before: '0 in cloud', after: '200+ in GCP', improvement: 'N/A' },
        { label: 'Production Downtime', before: 'Expected 24h', after: '0 minutes', improvement: '100%' },
        { label: 'Performance Improvement', before: 'Baseline', after: '+25%', improvement: 'N/A' }
      ]
    },
    {
      id: 6,
      title: 'Observability Platform: From Blind to Insights',
      category: 'Observability & Monitoring',
      company: 'B2B SaaS Platform',
      challenges: [
        'No centralized monitoring or logging',
        'Average incident detection time: 2+ hours',
        'No visibility into application performance'
      ],
      solution: 'Implemented centralized observability with Cloud Logging, Cloud Monitoring, and distributed tracing',
      results: [
        'Automated incident detection within 5 minutes',
        'MTTR (Mean Time to Recovery) reduced by 80%',
        'Proactive alerting prevents user impact'
      ],
      metrics: [
        { label: 'Incident Detection Time', before: '120+ min', after: '5 min', improvement: '96%' },
        { label: 'MTTR', before: '45 min', after: '9 min', improvement: '80%' },
        { label: 'User Impact Incidents', before: '8/month', after: '1/month', improvement: '87.5%' }
      ]
    }
  ];

  const categories = ['All', ...new Set(caseStudies.map(study => study.category))];
  const filteredStudies = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter(study => study.category === selectedCategory);

  return (
    <div className="case-studies-page">
      <div className="case-studies-hero">
        <div className="container">
          <h1>Real-World Success Stories</h1>
          <p>See how AJFS Innovations helped organizations transform their cloud infrastructure, modernize applications, and achieve measurable business outcomes.</p>
        </div>
      </div>

      <div className="case-studies-content container">
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="case-studies-grid">
          {filteredStudies.map((study) => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-header">
                <span className="case-category">{study.category}</span>
                <h3>{study.title}</h3>
                <p className="company-name">{study.company}</p>
              </div>

              <div className="case-section">
                <h4>Challenges</h4>
                <ul className="challenge-list">
                  {study.challenges.map((challenge, idx) => (
                    <li key={idx}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="case-section">
                <h4>Solution</h4>
                <p>{study.solution}</p>
              </div>

              <div className="case-section">
                <h4>Results</h4>
                <ul className="results-list">
                  {study.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </div>

              <div className="metrics-grid">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-box">
                    <p className="metric-label">{metric.label}</p>
                    <div className="metric-comparison">
                      <span className="metric-before">{metric.before}</span>
                      <span className="metric-arrow">→</span>
                      <span className="metric-after">{metric.after}</span>
                    </div>
                    {metric.improvement !== 'N/A' && (
                      <span className="metric-improvement">{metric.improvement} improvement</span>
                    )}
                  </div>
                ))}
              </div>

              <Link to="/contact" className="case-study-link">
                Discuss Similar Project →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="case-studies-cta container">
        <h2>Ready to Achieve Similar Results?</h2>
        <p>Let's discuss how AJFS can help transform your cloud infrastructure and deliver measurable business outcomes.</p>
        <button className="btn btn-primary" onClick={() => setIsStrategyModalOpen(true)}>
          Schedule a Strategy Call
        </button>
      </div>

      <StrategyCallModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}

export default CaseStudies;
