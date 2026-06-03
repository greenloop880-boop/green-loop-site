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
          <div className="cta-actions" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'nowrap', overflowX: 'auto' }}>
            <a href="tel:+91-9905705025" className="btn btn--gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', padding: '0', borderRadius: '50%', fontSize: '1.5rem', boxShadow: "none" }}>📞</a>
            <a href="https://wa.me/919905705025" className="btn btn--outline-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', padding: '0', borderRadius: '50%', fontSize: '1.5rem' }}>💬</a>
            <a href="mailto:contact@velotechinnovations.in" className="btn btn--outline-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', padding: '0', borderRadius: '50%', fontSize: '1.5rem' }}>✉</a>
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
