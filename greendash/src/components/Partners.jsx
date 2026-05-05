import React from 'react';


const Partners = () => {

  return (
    <section id="partners">
      <div className="container">
        <div className="fade-up" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1rem' }}>
          <div className="section-label" style={{ textAlign: 'center' }}>Government Aligned</div>
          <div className="divider divider--center"></div>
          <h2 className="display" style={{ textAlign: 'center' }}>Backed by <em>Policy</em></h2>
          <p className="lead" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>Green Loop is fully aligned with Government of
            India schemes — so your upgrade earns subsidies, not just savings.</p>
        </div>
        <div className="schemes-grid stagger">
          <div className="scheme-card">
            <div className="scheme-icon">🏛️</div>
            <h4>MSE-SPICE Scheme</h4>
            <p>Ministry of MSME — 25% Capital Subsidy on machinery and hub infrastructure</p>
            <div className="scheme-benefit">25% Subsidy</div>
          </div>
          <div className="scheme-card">
            <div className="scheme-icon">💰</div>
            <h4>GIFT Scheme</h4>
            <p>SIDBI — Interest subvention (3–5%) on green machinery loans for hub setup</p>
            <div className="scheme-benefit">3–5% Off Rate</div>
          </div>
          <div className="scheme-card">
            <div className="scheme-icon">📋</div>
            <h4>EPR Compliance</h4>
            <p>MoEFCC — Extended Producer Responsibility creates demand for certified refurbishers</p>
            <div className="scheme-benefit">Regulatory Tailwind</div>
          </div>
          <div className="scheme-card">
            <div className="scheme-icon">⚡</div>
            <h4>BEE / UJALA</h4>
            <p>Bureau of Energy Efficiency — Co-branded energy efficiency programme access</p>
            <div className="scheme-benefit">National Programme</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
