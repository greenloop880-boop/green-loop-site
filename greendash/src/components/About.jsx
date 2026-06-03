import React from 'react';


const About = () => {

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual fade-up">
            <div className="about-card-main">
              <div className="big-num">600M+</div>
              <h3>Old Induction Fans Running in India</h3>
              <p>Each one consuming 75W of electricity — ₹500–700 per fan per year in electricity costs — when a VELOTECH
                BLDC fan uses just 28W and saves your household ₹1,500–2,500 per year per fan.</p>
            </div>
            <div className="about-badge">
              <div className="num">Est. 2024</div>
              <div className="sub">IIT Bhubaneswar Campus</div>
            </div>
          </div>
          <div className="fade-up">
            <div className="section-label">Our Story</div>
            <div className="divider"></div>
            <h2 className="display" style={{ textAlign: "left" }}>Built at IIT Bhubaneswar. <em>Built for India.</em></h2>
            <p className="lead" style={{ textAlign: "left", text: "justify", marginBottom: '2rem' }}>Velotech Innovations is a technology company founded at IIT
              Bhubaneswar with a single purpose: to make India's most energy-hungry appliances smarter, greener, and more
              affordable — starting with the ceiling fan.</p>
            <div className="mission-points">
              <div className="mission-point">
                <div className="mission-icon">⚡</div>
                <div>
                  <h4>VELOTECH — Our Fan Brand</h4>
                  <p style={{ textAlign: "left" }}>A range of BLDC ceiling fans engineered for Indian homes — silent, powerful, remote-controlled, and
                    62% more efficient than standard induction fans.</p>
                </div>
              </div>
              <div className="mission-point">
                <div className="mission-icon">♻️</div>
                <div>
                  <h4>The Green Loop — Our Initiative</h4>
                  <p style={{ textAlign: "left" }}>India's first fully integrated fan circular economy. We buy back your old fan, refurbish it, and turn
                    every swap into a verified Carbon Credit Certificate.</p>
                </div>
              </div>
              <div className="mission-point">
                <div className="mission-icon">🏘️</div>
                <div>
                  <h4>Community-First Model</h4>
                  <p style={{ textAlign: "left" }}>We work through RWA/AOA communities, local dealers, and Hyper-Local Hubs — bringing the service to
                    your doorstep, not the other way around.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
