import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Offers from './components/Offers';
import Community from './components/Community';
import Partners from './components/Partners';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modals from './components/Modals';
import Ticker from './components/Ticker';
import GreenLoop from './components/GreenLoop';

function App() {
  const [modalOpen, setModalOpen] = useState(null);
  const [loginTab, setLoginTab] = useState('user');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    const elements = document.querySelectorAll('.fade-up, .stagger');
    elements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Make setModalOpen available globally for the components that might need it
  // In a real app, you'd use context or pass props. For simplicity, we attach to window
  window.setModalOpen = setModalOpen;

  return (
    <>
      <Navbar scrolled={scrolled} />
      <Ticker />
      <GreenLoop />
      <Hero />
      <About />
      <Products />
      <Services />
      <HowItWorks />
      <Offers />
      <Community />
      <Partners />
      <CTA />
      <Footer />
      <Modals modalOpen={modalOpen} setModalOpen={setModalOpen} loginTab={loginTab} setLoginTab={setLoginTab} />
    </>
  );
}

export default App;
