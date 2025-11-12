import React, { useState } from 'react';
import './StrategyCallModal.css';

function StrategyCallModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    cloudPlatform: '',
    primaryChallenge: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          type: 'strategy-call'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          company: '',
          phone: '',
          cloudPlatform: '',
          primaryChallenge: '',
          message: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="strategy-call-overlay" onClick={onClose}>
      <div className="strategy-call-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <span>&times;</span>
        </button>

        <div className="modal-header">
          <h2>Book Your Cloud Strategy Call</h2>
          <p>Let's discuss your cloud transformation goals. 30 minutes, no commitment.</p>
        </div>

        {submitSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>We've received your request. Our team will contact you shortly.</p>
          </div>
        ) : (
          <form className="strategy-call-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cloudPlatform">Primary Cloud Platform</label>
                <select
                  id="cloudPlatform"
                  name="cloudPlatform"
                  value={formData.cloudPlatform}
                  onChange={handleInputChange}
                >
                  <option value="">Select a platform...</option>
                  <option value="gcp">Google Cloud Platform (GCP)</option>
                  <option value="aws">Amazon Web Services (AWS)</option>
                  <option value="azure">Microsoft Azure</option>
                  <option value="multi">Multi-Cloud</option>
                  <option value="undecided">Undecided</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="primaryChallenge">Primary Challenge</label>
                <select
                  id="primaryChallenge"
                  name="primaryChallenge"
                  value={formData.primaryChallenge}
                  onChange={handleInputChange}
                >
                  <option value="">Select a challenge...</option>
                  <option value="cloud-migration">Cloud Migration</option>
                  <option value="cost-optimization">Cost Optimization</option>
                  <option value="modernization">Application Modernization</option>
                  <option value="security">Security & Compliance</option>
                  <option value="devops">DevOps & Automation</option>
                  <option value="infrastructure">Infrastructure Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Additional Context</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your current setup and goals..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule My Call'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default StrategyCallModal;
