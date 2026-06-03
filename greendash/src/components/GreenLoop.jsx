import React from 'react';

const GreenLoop = () => {
  return (
    <section id="greenloop">
      <div className="gl-hero fade-up">
        <div className="container--hero">
          <div className="eyebrow">🌿 The Green Loop — Our Flagship Initiative</div>
          <h2>India's First <em>Electric Motor Based Circular Economy</em></h2>
          <p>The Green Loop is Velotech Innovations' mission-driven initiative to transform every conventional old induction motor into a highly energy-efficient, revenue-generating, and carbon-offsetting asset. We don't just sell or upgrade new motors — we measure, monitor, and monetise. We close the loop entirely.</p>
          <div className="gl-flow" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div className="gl-step"><span className="dot"></span> Upgrade</div>
            <span className="gl-arrow">→</span>
            <div className="gl-step"><span className="dot"></span> Buy Back</div>
            <span className="gl-arrow">→</span>
            <div className="gl-step"><span className="dot"></span> Refurbish</div>
            <span className="gl-arrow">→</span>
            <div className="gl-step"><span className="dot"></span> Resell</div>
            <span className="gl-arrow">→</span>
            <div className="gl-step"><span className="dot"></span> Earn Carbon Credits</div>
          </div>
          <button type="button" onClick={() => window.setModalOpen('quoteModal')} className="btn btn--gold">Join The Green Loop →</button>
        </div>
      </div>

      <div className="container--wide">
        <div className="gl-streams stagger">
          <div className="stream-card">
            <div className="stream-num">01</div>
            <h4>New Motor Sales Margin</h4>
            <p>Every new energy efficient motor sold through the Green Loop channel generates a margin on a new unit as our primary revenue stream, shared with OEM partner.</p>
            <div className="stream-earn">₹1,699 onwards</div>
            <div className="stream-earn-note">per new motor sold</div>
          </div>
          <div className="stream-card">
            <div className="stream-num">02</div>
            <h4>Refurbished Motor Resale</h4>
            <p>We collect old motors and upgrade to BLDC-retrofitted and resell to Tier-2 and Tier-3 electrical stores at 50% below the brand MRP — making quality affordable at every price point.</p>
            <div className="stream-earn">₹1,000 onwards</div>
            <div className="stream-earn-note">per refurb motor resold</div>
          </div>
          <div className="stream-card">
            <div className="stream-num">03</div>
            <h4>Carbon Credit Certificates (CCCs)</h4>
            <p>Every fan upgrade reduces ~173 kg of CO₂ annually. As India's carbon market evolves, these verified emission reductions can be converted into carbon credits, creating a future recurring revenue stream while helping organizations achieve their ESG and sustainability goals.</p>
            <div className="stream-earn">₹300–900</div>
            <div className="stream-earn-note">per certificate (annual)</div>
          </div>
        </div>

        <div className="impact-strip stagger" style={{ marginTop: '1.5rem' }}>
          <div className="impact-item">
            <div className="i-val">173 kg</div>
            <div className="i-lbl">CO₂ saved per fan per year</div>
          </div>
          <div className="impact-item">
            <div className="i-val">₹52 Cr+</div>
            <div className="i-lbl">Household savings at 2L fans</div>
          </div>
          <div className="impact-item">
            <div className="i-val">2,000+</div>
            <div className="i-lbl">Livelihoods by Year 3</div>
          </div>
          <div className="impact-item">
            <div className="i-val">18×</div>
            <div className="i-lbl">ROI on capital deployed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenLoop;
