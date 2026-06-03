import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero-redesign">
      <div className="container hero-content-top">
        <div className="hero-text-side">
          <div className="hero-eyebrow">
            <span className="line"></span>
            <span>VELOTECH INNOVATIONS PVT. LTD. — IIT BHUBANESWAR</span>
          </div>
          <h1 className="hero-title">
            Upgrade Your Fan.<br />
            <em>Change Your World.</em>
          </h1>
          <p className="hero-sub">
            VELOTECH fans, powered by Velotech Innovations — India's most energy-efficient BLDC ceiling fans.
            And The Green Loop, our flagship initiative that turns your old fan into carbon credits,
            putting money back in your pocket and CO₂ back in the ground.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn--gold">Explore VELOTECH Fans ↓</a>
            <a href="#about" className="btn btn--outline-light" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              The Green Loop Initiative
            </a>
          </div>
        </div>

        <div className="hero-image-side">
          <img src="/images/velora_official_fan.png" alt="Velotech Smart Fan" className="hero-main-img" />
        </div>
      </div>

      <div className="container hero-bento-grid">
        {/* Row 1 */}
        <div className="bento-box stats-box">
          <div className="bento-stat">
            <div className="icon" style={{ color: 'var(--gold)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="val">28W</div>
            <div className="lbl">VELOTECH FAN WATTAGE</div>
          </div>
          <div className="divider-v"></div>
          <div className="bento-stat">
            <div className="icon" style={{ color: 'var(--moss)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c3.47.39 6.46-.37 9.42-1.73l2.7 1.5l.92-2.31l-2.09-1.15c2.65-2.39 4.39-5.46 4.39-9.01V8h-5zm-1.15 6.42c-2.45 1.12-4.93 1.7-7.79 1.44l2.42-5.83l-1.85-.76l-2.73 6.58C6.96 11.96 9.4 8.23 15 8h2v1c0 3-1.42 5.59-3.85 7.42z" />
              </svg>
            </div>
            <div className="val">62%</div>
            <div className="lbl">ENERGY SAVED<br />VS OLD FAN</div>
          </div>
          <div className="divider-v"></div>
          <div className="bento-stat">
            <div className="icon" style={{ color: 'var(--moss)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 6c0-2.21-1.79-4-4-4S6 3.79 6 6c0 1.25.58 2.36 1.47 3.09C5.46 10.45 4 12.56 4 15c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.44-1.46-4.55-3.47-5.91C13.42 8.36 14 7.25 14 6zm-4-2c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2z" />
              </svg>
            </div>
            <div className="val">173 kg</div>
            <div className="lbl">CO₂ OFFSET PER<br />FAN/YEAR</div>
          </div>
          <div className="divider-v"></div>
          <div className="bento-stat">
            <div className="icon" style={{ color: 'var(--gold)' }}>100%</div>
            <div className="val" style={{ color: 'var(--gold)' }}>ROI</div>
            <div className="lbl" style={{ color: 'var(--gold)' }}>IN 1 YEAR</div>
          </div>
        </div>

        <div className="bento-box how-box">
          <div className="how-title">How It Works</div>
          <div className="how-steps">
            <div className="h-step">
              <div className="h-icon"><span className="badge">1</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--moss)' }}>
                  <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm7.41-3.41c-2.15-2.15-5.22-3.05-8.15-2.44L12 5V2h-2v4.06c-1.22.45-2.31 1.15-3.17 2.02l2.12 2.12c.59-.59 1.34-.98 2.18-1.11L11.5 6.5h1.36l-.32 2.45c.42.1.81.27 1.16.49l2.16-1.16l1.24.9l-1.32 2c.28.38.48.82.59 1.3L19.5 13h-1.36l-.42-2.58c-1.07-1.07-2.61-1.47-4.04-1.13L12 11v14h2v-4.06c1.22-.45 2.31-1.15 3.17-2.02c1.78-1.78 2.66-4.14 2.43-6.49l-2.05-2.05zM5.59 10.59c2.15 2.15 5.22 3.05 8.15 2.44L12 14v3h2v-4.06c1.22-.45 2.31-1.15 3.17-2.02l-2.12-2.12c-.59.59-1.34.98-2.18 1.11L12.5 12.5h-1.36l.32-2.45c-.42-.1-.81-.27-1.16-.49l-2.16 1.16l-1.24-.9l1.32-2c-.28-.38-.48-.82-.59-1.3L6.5 6h1.36l.42 2.58c1.07 1.07 2.61 1.47 4.04 1.13L12 8V4H10v4.06c-1.22.45-2.31 1.15-3.17 2.02C5.05 11.86 4.17 14.22 4.4 16.57l2.05 2.05l-.86-8.03z" />
                </svg>
              </div>
              <div className="h-lbl">Install<br />Velotech Fan</div>
            </div>
            <div className="h-arrow">→</div>
            <div className="h-step">
              <div className="h-icon"><span className="badge">2</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--moss)' }}>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <div className="h-lbl">Track Your<br />Energy Savings</div>
            </div>
            <div className="h-arrow">→</div>
            <div className="h-step">
              <div className="h-icon"><span className="badge">3</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--moss)' }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <div className="h-lbl">Earn Carbon<br />Credits</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
