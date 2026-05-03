import React from 'react';

const GreenLoop = () => {
  return (
    <section id="greenloop">
      <div className="gl-hero fade-up">
        <div className="container--hero">
          <div className="eyebrow">🌿 Green Loop — Our Flagship Initiative</div>
          <h2>India's First <em>Circular Fan Economy</em></h2>
          <p>Green Loop is Velotech Innovations' mission-driven initiative that transforms every old induction fan into a
            revenue-generating, carbon-offsetting asset. We don't just sell new fans — we close the loop entirely.</p>
          <div className="gl-flow">
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
          <button type="button" onClick={() => window.setModalOpen('quoteModal')} className="btn btn--gold">Join Green Loop →</button>
        </div>
      </div>

      <div className="container--wide">
        <div className="gl-streams stagger">
          <div className="stream-card">
            <div className="stream-num">01</div>
            <h4>New Fan Sales Margin</h4>
            <p>Every VELORA BLDC fan sold through the Green Loop channel generates a margin on the new unit — our primary
              revenue stream, shared with OEM partners Atomberg and Crompton.</p>
            <div className="stream-earn">₹800–1,200</div>
            <div className="stream-earn-note">per new fan sold</div>
          </div>
          <div className="stream-card">
            <div className="stream-num">02</div>
            <h4>Refurbished Fan Resale</h4>
            <p>Collected old fans are BLDC-retrofitted and resold to Tier-2 and Tier-3 MSME electrical stores at 10% below
              brand MRP — making quality affordable at every price point.</p>
            <div className="stream-earn">₹300–500</div>
            <div className="stream-earn-note">per refurb fan resold</div>
          </div>
          <div className="stream-card">
            <div className="stream-num">03</div>
            <h4>Carbon Credit Certificates (CCCs)</h4>
            <p>Every fan upgrade saves ~173 kg CO₂ per year. We issue verified Carbon Credit Certificates sold to
              non-obligated entities in Steel, Chemicals, and Aviation sectors — a recurring annual revenue stream.</p>
            <div className="stream-earn">₹500–900</div>
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
