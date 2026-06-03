import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#services', label: 'Services' },
  { href: '#greenloop', label: 'The Green Loop' },
  { href: '#offers', label: 'Offers' },
  { href: '#community', label: 'Community' },
];

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    close();
  };

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-brand" onClick={scrollToTop} style={{ textDecoration: 'none' }}>
            <img src={logo} alt="The Green Loop Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
            <div className="nav-name">
              <strong style={{ color: '#66CDAA', fontFamily: 'Leelawadee UI', fontWeight: '700', letterSpacing: '0.5px', fontSize: '1.1rem' }}>
                THE GREEN LOOP
              </strong>
              <span>Powered by Velotech Innovations</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="nav-menu">
            <ul className="nav-links">
              {navLinks.map(({ href, label }) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
            <div className="nav-cta">
              <a href="#offers" className="btn btn--outline-light">View Offers</a>
              <button type="button" onClick={() => window.setModalOpen('quoteModal')} className="btn btn--gold">Get Started</button>
            </div>
          </div>

          {/* Hamburger (Mobile Toggle) */}
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`drawer-backdrop ${isOpen ? 'active' : ''}`} onClick={close} />

      <aside className={`mobile-drawer ${isOpen ? 'active' : ''}`}>
        <div className="drawer-container">

          {/* Header */}
          <div className="drawer-header">
            <div className="drawer-brand">
              <img src={logo} alt="Logo" style={{ height: '32px' }} />
              <span>THE GREEN LOOP</span>
            </div>
            <button className="drawer-close" onClick={close}>✕</button>
          </div>

          {/* Links Area */}
          <div className="drawer-scroll-area">
            <nav className="drawer-nav">
              {navLinks.map(({ href, label }, i) => (
                <a
                  key={href}
                  href={href}
                  className="drawer-nav-item"
                  style={{ animationDelay: isOpen ? `${i * 55}ms` : '0ms' }}
                  onClick={close}
                >
                  <span className="label">{label}</span>
                  <span className="arrow">→</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="drawer-actions">
            <a href="#offers" className="drawer-btn-outline" onClick={close}>
              View Offers
            </a>
            <button
              className="drawer-btn-primary"
              onClick={() => { window.setModalOpen('quoteModal'); close(); }}
            >
              Get Started ✦
            </button>
            <p className="drawer-tagline">Velotech Innovations · IIT Bhubaneswar</p>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Navbar;