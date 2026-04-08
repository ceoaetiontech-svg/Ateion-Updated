import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import SharedNavbar from '../app/components/SharedNavbar';
import SharedFooter from '../app/components/SharedFooter';
import './contact-styles.css';

export default function ContactPage() {

  const API_URL = import.meta.env.VITE_API_BASE_URL || '';

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError('');
  
      if (!validateForm()) {
        return;
      }
  
      if (!formData.agreed) {
        setSubmitError('Please accept the privacy policy before submitting.');
        return;
      }
  
      try {
        setIsSubmitting(true);
  
        const payload = {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email.trim(),
          subject: 'Website Contact Form',
          message: formData.message.trim(),
        };
  
        
        const response = await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
  
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', message: '', agreed: false });
      } catch (error) {
        setSubmitError('Unable to submit your message right now. Please try again.');
        console.error('Contact form submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <>
      <SharedNavbar />
      <div className="bg-[#f7f3eb] w-full min-h-screen overflow-x-hidden relative">
        <main className="contact-page-main pt-[120px] sm:pt-[140px] md:pt-[160px] pb-[48px] sm:pb-[64px] md:pb-[80px] px-[16px] sm:px-[24px]">
          <div className="max-w-[1240px] mx-auto w-full">
            <h1 className="contact-title text-center">Contact Us</h1>
            <p className="contact-description text-center">
              The Global Capability Olympiad is the world's first preparation-free, syllabus-free,
              AI-integrated Master Olympiad designed to measure thinking, not memory.
            </p>

            <div className="contact-action-buttons">
              <button className="btn-outline" onClick={() => navigate('/contact')}>Contact us</button>
              <button className="btn-filled" onClick={() => navigate('/gco')}>Explore more</button>
            </div>

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
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {submitError && <span className="error-message">{submitError}</span>}
          </form>
        )}
          </div>
        </main>
        {/* Large vertical spacing before footer */}
        <div className="contact-footer-spacer w-full h-[80px] sm:h-[120px] md:h-[160px] lg:h-[200px]" />
        <SharedFooter />
      </div>
    </>
  );
}
