import React from 'react';
import '../../styles/gco/FAQ.css';

const FAQ = () => {
  const faqs = [
    { q: "What is Ateion?", a: "" },
    { q: "How is Ateion different from traditional education systems?", a: "" },
    { q: "Who can partner with Ateion?", a: "" },
    { q: "What is the Global Capability Olympiad (GCO)?", a: "" },
    { q: "How are capabilities measured?", a: "" },
    { q: "How can institutions get connected?", a: "" },
  ];

  return (
    <section className="faq-container">
      <h2 className="faq-title">Your Common Questions Answered</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <span className="faq-question">{faq.q}</span>
            <span className="faq-arrow">›</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
