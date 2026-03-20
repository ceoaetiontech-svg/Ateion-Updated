import React from 'react';
import '../../styles/gco/Footer.css';

const GCOFooter = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-company">Ateion Pvt. Ltd.</p>
        </div>

        <div className="footer-address">
          <p>PCMC, Pune, Maharashtra - 500034</p>
          <p className="footer-phone">+91 93569 76878</p>
        </div>

        <div className="footer-links">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Data Collection &amp; Consent</p>
        </div>
      </div>
    </footer>
  );
};

export default GCOFooter;
