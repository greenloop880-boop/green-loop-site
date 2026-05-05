import React from 'react';
import logo from '../assets/Logo.png';
import clientLogo from '../assets/Client.jpeg';
import stpiLogo from '../assets/STPI.png';
import iitLogo from '../assets/IIT.png';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* --- NEW CLIENT LOGO SECTION --- */}
        <div className="client-logo-section" style={{ textAlign: 'center', paddingBottom: '3rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: 'var(--gold, #D4A843)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', fontWeight: '600' }}>
            Proudly Incubated & Supported By
          </h4>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <img src={stpiLogo} alt="STPI" style={{ maxHeight: '85px', width: 'auto', borderRadius: '8px', padding: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }} />
            <img src={iitLogo} alt="IIT Bhubaneswar" style={{ maxHeight: '85px', width: 'auto', borderRadius: '8px', padding: '12px', background: '#ffffff', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }} />
            <img src={clientLogo} alt="Electropreneur Park" style={{ maxHeight: '85px', width: 'auto', borderRadius: '8px', padding: '12px', background: '#ffffff', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }} />
          </div>
        </div>
        {/* ------------------------------- */}

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="fb-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <img src={logo} alt="Green Loop Logo" style={{ height: '44px', width: 'auto', borderRadius: '8px', padding: '2px' }} />
              <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#66CDAA', fontFamily: 'Consolas', fontWeight: '700', letterSpacing: '0.5px', fontSize: '1.3rem', lineHeight: '1' }}>
                  GREEN LOOP
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#a0aec0', marginTop: '4px', lineHeight: '1.2' }}>Powered by Velotech Innovations</span>
              </div>
            </div>
            <p>Velotech Innovations Pvt. Ltd. is an IIT Bhubaneswar-incubated company building India's greenest fan ecosystem — through VELORA fans and the Green Loop circular economy initiative.</p>
            <div className="contact">
              <div>📍 IIT Bhubaneswar Campus, Jatni, Odisha</div>
              <div>✉ <a href="mailto:contact@velotechinnovations.in">contact@velotechinnovations.in</a></div>
              <div>🌐 www.velotechinnovations.in</div>
            </div>
          </div>

          <div>
            <h5>Products</h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li><a href="#products">VELORA Pro 1200mm</a></li>
              <li><a href="#products">VELORA Lite 1200mm</a></li>
              <li><a href="#products">VELORA Smart Fan</a></li>
              <li><a href="#products">VELORA Refurb BLDC</a></li>
              <li><a href="#products">BLDC Retrofit Kit</a></li>
            </ul>
          </div>

          <div>
            <h5>Services</h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li><a href="#services">Instant Karo Upgrade</a></li>
              <li><a href="#services">Fan Buy-Back</a></li>
              <li><a href="#services">BLDC Retrofit</a></li>
              <li><a href="#services">Carbon Credits</a></li>
              <li><a href="#services">RWA/AOA Programme</a></li>
              <li><a href="#services">MSME Partnership</a></li>
            </ul>
          </div>

          <div>
            <h5>GREEN LOOP</h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li><a href="#greenloop">About the Initiative</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#offers">Our Plans</a></li>
              <li><a href="#partners">Govt. Schemes</a></li>
              <li><a href="#community">Community Stories</a></li>
              <li><a href="#cta">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Velotech Innovations Pvt. Ltd. All rights reserved. VELORA is a registered brand of Velotech Innovations.</p>
          <div className="badges">
            <span className="footer-badge">🌿 Green Loop Initiative</span>
            <span className="footer-badge">⚡ BEE Aligned</span>
            <span className="footer-badge">🏛 IIT Bhubaneswar</span>
            <span className="footer-badge">♻ EPR Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;