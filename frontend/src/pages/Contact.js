import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual backend URL after deployment
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
      
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus(`error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error: An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please fill out the form below or reach out to us directly.</p>
      </div>

      <div className="contact-content">
        <div className="contact-details">
          <h3>AJFS Innovations Pvt Ltd</h3>
          <div className="contact-info">
            <div className="contact-info-item">
              <strong>📍 Address:</strong>
              <p>Your Company Address Here<br/>City, State, PIN Code</p>
            </div>
            <div className="contact-info-item">
              <strong>📞 Phone:</strong>
              <p>+91 XXX XXX XXXX</p>
            </div>
            <div className="contact-info-item">
              <strong>✉️ Email:</strong>
              <p>info@ajfsindia.com</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {status === 'success' && (
            <p className="form-status success">Message sent successfully! We'll get back to you soon.</p>
          )}
          {status.startsWith('error') && (
            <p className="form-status error">{status.replace('error: ', '')}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;
