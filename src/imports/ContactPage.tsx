import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../app/components/Navbar';
import SharedFooter from './SharedFooter';
import './contact-styles.css';

export default function ContactPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreed: false,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const e = { firstName: '', lastName: '', email: '', message: '' };
    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    else if (formData.firstName.trim().length < 2) e.firstName = 'Minimum 2 characters';
    else if (!/^[a-zA-Z\s'-]+$/.test(formData.firstName)) e.firstName = 'Letters only';

    if (!formData.lastName.trim()) e.lastName = 'Last name is required';
    else if (formData.lastName.trim().length < 2) e.lastName = 'Minimum 2 characters';
    else if (!/^[a-zA-Z\s'-]+$/.test(formData.lastName)) e.lastName = 'Letters only';

    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!validateEmail(formData.email)) e.email = 'Enter a valid email address';

    if (!formData.message.trim()) e.message = 'Message is required';
    else if (formData.message.trim().length < 10) e.message = 'Minimum 10 characters';

    setErrors(e);
    return Object.values(e).every(v => v === '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '', agreed: false });
    }
  };

  return (
    <div className="bg-[#f7f3eb] w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="-mt-[80px]">
        {/* Main Content */}
        <main className="contact-main-content">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            The Global Capability Olympiad is the world's first preparation-free, syllabus-free,
            AI-integrated Master Olympiad designed to measure thinking, not memory.
          </p>

          {/* Action Buttons */}
          <div className="contact-action-buttons">
            <button className="btn-outline">Contact us</button>
            <button className="btn-filled" onClick={() => navigate('/gco')}>Explore more</button>
          </div>

          {/* Success Card */}
          {submitted ? (
            <div className="contact-success-card">
              <div className="contact-success-icon">✓</div>
              <h2 className="contact-success-title">Message Sent!</h2>
              <p className="contact-success-body">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <button className="contact-success-btn" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name *"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'input-error' : ''}
                    aria-label="First name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name *"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'input-error' : ''}
                    aria-label="Last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                    aria-label="Email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`message-textarea${errors.message ? ' input-error' : ''}`}
                  aria-label="Message"
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <div className="form-footer">
                <label className="privacy-label">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                  />
                  I understand that Ateion will securely hold my data in accordance with their privacy policy
                </label>
                <button type="submit" className="submit-btn">Submit</button>
              </div>
            </form>
          )}
        </main>
        <div className="shared-navbar-spacer" />
        <SharedFooter />
      </div>
    </div>
  );
}
