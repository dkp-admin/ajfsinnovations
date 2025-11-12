import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StrategyCallModal from '../components/StrategyCallModal';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const blogContent = {
    'building-production-ready-gcp-landing-zone': {
      title: 'Building a Production-Ready GCP Landing Zone in 2025',
      author: 'AJFS Team',
      date: 'January 15, 2025',
      readTime: '12 min read',
      category: 'Cloud Foundations',
      image: '🏗️',
      excerpt: 'Learn how to design and deploy a secure, scalable, and compliant GCP landing zone that serves as the foundation for your entire cloud infrastructure.',
      tableOfContents: [
        { id: 'what-is-landing-zone', title: 'What is a Cloud Landing Zone?' },
        { id: 'key-components', title: 'Key Components of a GCP Landing Zone' },
        { id: 'organization-structure', title: 'Designing Your Organization Structure' },
        { id: 'iam-setup', title: 'IAM Setup and Access Control' },
        { id: 'networking', title: 'Network Architecture and Security' },
        { id: 'security-baselines', title: 'Security Baselines and Policies' },
        { id: 'monitoring', title: 'Monitoring and Observability' },
        { id: 'best-practices', title: 'Best Practices and Common Pitfalls' }
      ],
      faqs: [
        {
          question: 'How long does it take to build a landing zone?',
          answer: 'Typically 8-12 weeks depending on complexity, compliance requirements, and organizational structure. We work in phases to minimize disruption.'
        },
        {
          question: 'Can I retrofit a landing zone into existing GCP projects?',
          answer: 'Yes, but it requires careful planning. We can migrate existing resources into a proper landing zone structure with minimal downtime.'
        },
        {
          question: 'What cloud platforms can use landing zones?',
          answer: 'Landing zones are available on GCP, AWS, and Azure. The principles are similar, but implementation details vary by platform.'
        },
        {
          question: 'How do we handle multi-team access?',
          answer: 'Landing zones support multi-team structures through organizational policies, IAM roles, and resource hierarchies. Each team gets appropriate access while maintaining security.'
        }
      ],
      keyTakeaways: [
        'A landing zone provides the foundational infrastructure, security controls, and governance framework for cloud operations.',
        'Key components include organization structure, IAM setup, VPC design, security baselines, and observability.',
        'Proper planning and automation upfront reduce operational overhead and security risks later.',
        'Landing zones enable self-service provisioning while maintaining central governance and compliance.'
      ]
    },
    'multi-cloud-vs-single-cloud': {
      title: 'Multi-Cloud vs Single-Cloud: How to Choose the Right Strategy',
      author: 'AJFS Team',
      date: 'January 8, 2025',
      readTime: '10 min read',
      category: 'Cloud Strategy',
      image: '☁️',
      excerpt: 'Explore the trade-offs between multi-cloud and single-cloud approaches.',
      tableOfContents: [
        { id: 'single-cloud-benefits', title: 'Benefits of Single-Cloud Strategy' },
        { id: 'single-cloud-challenges', title: 'Challenges of Single-Cloud' },
        { id: 'multi-cloud-benefits', title: 'Benefits of Multi-Cloud' },
        { id: 'multi-cloud-challenges', title: 'Challenges of Multi-Cloud' },
        { id: 'hybrid-approach', title: 'The Hybrid Approach' },
        { id: 'decision-framework', title: 'Decision Framework for Your Organization' }
      ],
      faqs: [
        {
          question: 'Is multi-cloud always more expensive?',
          answer: 'Not necessarily. While multi-cloud adds operational complexity, it can reduce vendor lock-in and provide cost optimization opportunities through platform competition.'
        },
        {
          question: 'How do we manage data across multiple clouds?',
          answer: 'Data replication strategies, API integrations, and careful workload placement are key. Tools like cloud data warehouses can centralize analytics across clouds.'
        },
        {
          question: 'Can we start with single-cloud and move to multi-cloud later?',
          answer: 'Yes, this is a common approach. Start with one cloud, build expertise, then expand if business needs require multiple platforms.'
        }
      ],
      keyTakeaways: [
        'Single-cloud offers simplicity and cost optimization but risks vendor lock-in.',
        'Multi-cloud provides flexibility and resilience but increases operational complexity.',
        'Many organizations adopt a hybrid approach with a primary cloud and secondary platforms for specific workloads.',
        'The right choice depends on your risk tolerance, budget, compliance requirements, and technical expertise.'
      ]
    },
    'legacy-to-cloud-native-6r-framework': {
      title: 'From Legacy to Cloud-Native: Applying the 6R Framework in Real Projects',
      author: 'AJFS Team',
      date: 'January 1, 2025',
      readTime: '14 min read',
      category: 'Modernization',
      image: '🚀',
      excerpt: 'Deep dive into the 6R migration framework and how to apply it to legacy applications.',
      tableOfContents: [
        { id: 'what-is-6r', title: 'Understanding the 6R Framework' },
        { id: 'rehost', title: 'Rehost (Lift-and-Shift)' },
        { id: 'replatform', title: 'Replatform (Lift-and-Optimize)' },
        { id: 'refactor', title: 'Refactor (Re-architect)' },
        { id: 'repurchase', title: 'Repurchase (SaaS Adoption)' },
        { id: 'retire', title: 'Retire (Decommission)' },
        { id: 'retain', title: 'Retain (Keep As-Is)' },
        { id: 'real-examples', title: 'Real-World Examples' }
      ],
      faqs: [
        {
          question: 'Which R is the best choice for most applications?',
          answer: 'There is no one-size-fits-all answer. Most organizations use a mix of Rs based on application characteristics, business value, and complexity.'
        },
        {
          question: 'How do we choose between Refactor and Repurchase?',
          answer: 'Evaluate: Is a good SaaS alternative available? What is the total cost of ownership? How strategic is this application? Refactor if custom functionality is critical; Repurchase if SaaS is sufficient.'
        },
        {
          question: 'Can we migrate applications in phases using different Rs?',
          answer: 'Absolutely. In fact, phased migrations using different Rs for different workloads is the most pragmatic approach for large organizations.'
        }
      ],
      keyTakeaways: [
        'The 6R framework (Rehost, Replatform, Refactor, Repurchase, Retire, Retain) provides a structured approach to migration decisions.',
        'Rehost and Replatform offer quick wins but may not deliver full cloud benefits.',
        'Refactor delivers maximum value but requires the most effort and expertise.',
        'Most organizations adopt a hybrid approach, using multiple Rs for different workloads based on business value and complexity.'
      ]
    }
  };

  const currentPost = blogContent[slug] || blogContent['building-production-ready-gcp-landing-zone'];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="blog-post-page">
      <article className="blog-post-container">
        <div className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-category">{currentPost.category}</span>
            <span className="blog-date">{currentPost.date}</span>
            <span className="blog-read-time">{currentPost.readTime}</span>
          </div>
          <h1>{currentPost.title}</h1>
          <p className="blog-excerpt">{currentPost.excerpt}</p>
          <div className="blog-author-info">
            <span className="blog-author-name">By {currentPost.author}</span>
          </div>
        </div>

        <div className="blog-post-image">{currentPost.image}</div>

        <div className="blog-post-content">
          <div className="blog-sidebar">
            <div className="toc-widget">
              <h3>Table of Contents</h3>
              <ul className="toc-list">
                {currentPost.tableOfContents.map((item, index) => (
                  <li key={index}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="key-takeaways-widget">
              <h3>Key Takeaways</h3>
              <ul className="takeaways-list">
                {currentPost.keyTakeaways.map((takeaway, index) => (
                  <li key={index}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="blog-main-content">
            <section id="what-is-landing-zone">
              <h2>Introduction</h2>
              <p>
                This comprehensive guide walks you through the entire process of building a production-ready cloud landing zone. Whether you're starting fresh or optimizing an existing setup, these principles and practices will help you establish a secure, scalable, and compliant foundation for your cloud operations.
              </p>
            </section>

            <section id="key-components">
              <h2>Key Components</h2>
              <p>
                A successful landing zone implementation requires careful attention to several critical areas:
              </p>
              <ul>
                <li>Organization structure and resource hierarchy</li>
                <li>Identity and Access Management (IAM) setup</li>
                <li>Network architecture and security</li>
                <li>Security baselines and compliance controls</li>
                <li>Monitoring, logging, and observability</li>
                <li>Cost management and billing allocation</li>
              </ul>
            </section>

            <section id="organization-structure">
              <h2>Organization Structure</h2>
              <p>
                The foundation of a landing zone is a well-designed organizational structure. This determines how resources are grouped, how access is controlled, and how costs are tracked.
              </p>
            </section>

            <section id="iam-setup">
              <h2>IAM and Access Control</h2>
              <p>
                Identity and Access Management is critical for security and compliance. Implement the principle of least privilege and use role-based access control (RBAC).
              </p>
            </section>

            <div className="blog-cta-box">
              <h3>Ready to Build Your Cloud Landing Zone?</h3>
              <p>Our experts can guide you through the entire process, from assessment to implementation and optimization.</p>
              <button className="btn-cta" onClick={() => setIsStrategyModalOpen(true)}>
                Schedule a Free Consultation
              </button>
            </div>

            <section id="faq-section" className="blog-faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {currentPost.faqs.map((faq, index) => (
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
          </div>
        </div>
      </article>

      <div className="blog-navigation container">
        <Link to="/resources" className="btn btn-secondary">← Back to Resources</Link>
      </div>

      <StrategyCallModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}

export default BlogPost;
