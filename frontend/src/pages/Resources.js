import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StrategyCallModal from '../components/StrategyCallModal';
import './Resources.css';

function Resources() {
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  const blogPosts = [
    {
      id: 1,
      slug: 'building-production-ready-gcp-landing-zone',
      title: 'Building a Production-Ready GCP Landing Zone in 2025',
      author: 'AJFS Team',
      date: 'January 15, 2025',
      category: 'Cloud Foundations',
      excerpt: 'Learn how to design and deploy a secure, scalable, and compliant GCP landing zone that serves as the foundation for your entire cloud infrastructure. We cover organizational structure, IAM setup, networking, security baselines, and monitoring.',
      image: '🏗️'
    },
    {
      id: 2,
      slug: 'multi-cloud-vs-single-cloud',
      title: 'Multi-Cloud vs Single-Cloud: How to Choose the Right Strategy',
      author: 'AJFS Team',
      date: 'January 8, 2025',
      category: 'Cloud Strategy',
      excerpt: 'Explore the trade-offs between multi-cloud and single-cloud approaches. Understand when multi-cloud makes sense, the hidden costs of cloud sprawl, and how to balance flexibility with operational complexity.',
      image: '☁️'
    },
    {
      id: 3,
      slug: 'legacy-to-cloud-native-6r-framework',
      title: 'From Legacy to Cloud-Native: Applying the 6R Framework in Real Projects',
      author: 'AJFS Team',
      date: 'January 1, 2025',
      category: 'Modernization',
      excerpt: 'Deep dive into the AWS 6R migration framework (Rehost, Replatform, Refactor, Repurchase, Retire, Retain). See real-world examples of how to apply each R to legacy applications and choose the right modernization path.',
      image: '🚀'
    },
    {
      id: 4,
      slug: 'devops-automation-cicd-pipelines',
      title: 'DevOps Automation: Building Robust CI/CD Pipelines',
      author: 'AJFS Team',
      date: 'December 20, 2024',
      category: 'DevOps',
      excerpt: 'Master the fundamentals of CI/CD pipeline design. Learn how to automate testing, deployment, and infrastructure changes using GitHub Actions, GitLab CI, and Cloud Build on GCP.',
      image: '⚙️'
    },
    {
      id: 5,
      slug: 'cloud-security-best-practices',
      title: 'Cloud Security Best Practices: Securing Your GCP Environment',
      author: 'AJFS Team',
      date: 'December 12, 2024',
      category: 'Security',
      excerpt: 'Comprehensive guide to securing your Google Cloud Platform infrastructure. Topics include IAM policies, VPC security, encryption, compliance, and threat detection.',
      image: '🔒'
    },
    {
      id: 6,
      slug: 'cloud-cost-optimization-strategies',
      title: 'Cloud Cost Optimization: Strategies to Reduce Your Cloud Bill',
      author: 'AJFS Team',
      date: 'December 5, 2024',
      category: 'Cost Optimization',
      excerpt: 'Practical strategies to optimize your cloud spending. Learn about VM right-sizing, committed use discounts, storage optimization, and implementing a chargeback model.',
      image: '💰'
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="resources-page">
      <div className="resources-hero">
        <div className="container">
          <h1>Cloud Insights & Best Practices</h1>
          <p>Expert guidance, case studies, and technical deep dives to help you master cloud architecture, DevOps automation, and modernization.</p>
        </div>
      </div>

      <div className="resources-content container">
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

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-link">
                <div className="blog-image">{post.image}</div>
                <div className="blog-content">
                  <span className="blog-category">{post.category}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-author">{post.author}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <span className="blog-read-more">Read Article →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="resources-cta container">
        <h2>Ready to Transform Your Cloud Infrastructure?</h2>
        <p>Get expert guidance from AJFS Innovations. Book a free consultation to discuss your cloud goals and strategy.</p>
        <button className="btn btn-primary" onClick={() => setIsStrategyModalOpen(true)}>
          Book a Cloud Strategy Call
        </button>
      </div>

      <StrategyCallModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}

export default Resources;
