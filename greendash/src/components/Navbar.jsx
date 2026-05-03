import React, { useState } from 'react';
import logo from '../assets/Logo.png';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id="navbar" className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-brand">
          <img src={logo} alt="Green Loop Logo" style={{ height: '42px', width: 'auto', borderRadius: '4px' }} />
          <div className="nav-name">
            {/* Elegant Sea Green styling applied here */}
            <strong style={{
              color: '#66CDAA',
              fontFamily: 'Leelawadee UI',
              fontWeight: '700',
              letterSpacing: '0.5px',
              fontSize: '1.2rem'
            }}>
              GREEN LOOP
            </strong>
            <span>Powered by Velotech Innovations</span>
          </div>
        </div>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#products" onClick={() => setIsOpen(false)}>Products</a></li>
            <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
            <li><a href="#greenloop" onClick={() => setIsOpen(false)}>Green Loop</a></li>
            <li><a href="#offers" onClick={() => setIsOpen(false)}>Offers</a></li>
            <li><a href="#community" onClick={() => setIsOpen(false)}>Community</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#offers" className="btn btn--outline-light" style={{ padding: '.6rem 1.4rem', fontSize: '.84rem' }} onClick={() => setIsOpen(false)}>View Offers</a>
            <button type="button" onClick={() => { window.setModalOpen('quoteModal'); setIsOpen(false); }} className="btn btn--gold"
              style={{ padding: '.6rem 1.4rem', fontSize: '.84rem' }}>Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;