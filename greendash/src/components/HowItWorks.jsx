import React from 'react';


const HowItWorks = () => {

  return (
    <section id="how">
      <div className="container">
        <div className="fade-up" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1rem' }}>
          <div className="section-label" style={{ textAlign: 'center' }}>Simple Process</div>
          <div className="divider divider--center"></div>
          <h2 className="display" style={{ textAlign: 'center' }}>How Green Loop <em>Works</em></h2>
          <p className="lead" style={{ textAlign: 'center', margin: '0 auto' }}>Four steps from your old fan to fresh savings — and a
            cleaner planet.</p>
        </div>
        <div className="how-grid stagger">
          <div className="how-step">
            <div className="step-num">1</div>
            <div className="step-icon">📱</div>
            <h4>Sign Up</h4>
            <p>WhatsApp "GREENLOOP" to our number, or walk into any Green Loop Desk in your society or dealer shop. Takes
              5 minutes.</p>
          </div>
          <div className="how-step">
            <div className="step-num">2</div>
            <div className="step-icon">🏠</div>
            <h4>We Visit</h4>
            <p>A certified Hub Technician visits your home within 48 hours. Old fan collected. Buy-back credit issued on
              the spot.</p>
          </div>
          <div className="how-step">
            <div className="step-num">3</div>
            <div className="step-icon">🌀</div>
            <h4>New Fan Installed</h4>
            <p>Your VELORA BLDC fan is installed and running. Remote control configured. Tested before the technician
              leaves.</p>
          </div>
          <div className="how-step">
            <div className="step-num">4</div>
            <div className="step-icon">🌿</div>
            <h4>Save & Earn</h4>
            <p>Next electricity bill: 62% lower for that fan. Your society gets a Carbon Credit logged. Everyone wins.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
