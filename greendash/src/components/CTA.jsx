import React from 'react';


const CTA = () => {

  return (
    <section id="cta">
      <div className="container cta-inner">
        <div className="fade-up">
          <div className="section-label section-label--light" style={{ textAlign: 'center' }}>Take Action Today</div>
          <h2>Ready to <em>Loop In?</em></h2>
          <p>Join thousands of households, MSMEs, and communities already saving electricity, earning credits, and making
            Odisha greener — one fan at a time.</p>
          <div className="cta-actions">
            <a href="tel:+91-XXXXXXXXXX" className="btn btn--gold">📞 Call Us Now</a>
            <a href="https://wa.me/91XXXXXXXXXX" className="btn btn--outline-light">💬 WhatsApp Us</a>
            <a href="mailto:contact@velotechinnovations.in" className="btn btn--outline-light">✉ Email Us</a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '.85rem', color: 'rgba(183,228,199,.5)' }}>
            📍 IIT Bhubaneswar Campus, Argul, Jatni, Khurda, Odisha 752050 &nbsp;|&nbsp; contact@velotechinnovations.in
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
