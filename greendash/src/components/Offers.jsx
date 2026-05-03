import React from 'react';


const Offers = () => {
  
  return (
    <section id="offers">
    <div className="container">
      <div className="fade-up" style={{textAlign: 'center', maxWidth: '620px', margin: '0 auto'}}>
        <div className="section-label section-label--light" style={{textAlign: 'center'}}>Plans & Pricing</div>
        <div className="divider divider--center"></div>
        <h2 className="display display--white" style={{textAlign: 'center'}}>An Offer for <em>Every Home</em></h2>
        <p className="lead lead--light" style={{textAlign: 'center', margin: '0 auto'}}>Whether you want to save electricity,
          earn carbon credits, or partner as a dealer — there's a Green Loop plan for you.</p>
      </div>
      <div className="offers-grid stagger">

        <div className="offer-card">
          <h3>Instant Karo Basic</h3>
          <div className="offer-desc">For the household that wants to start saving immediately</div>
          <div className="offer-price">
            <span className="op">₹0</span>
            <span className="on">upfront cost</span>
          </div>
          <ul className="offer-features">
            <li>VELORA Lite BLDC fan installed</li>
            <li>Old fan collected (no buy-back credit)</li>
            <li>62% electricity savings from Day 1</li>
            <li>Green Loop community membership</li>
            <li>Referral QR code to earn rewards</li>
          </ul>
          <button type="button" onClick={() => window.setModalOpen('quoteModal')} className="btn btn--outline-light"
            style={{width: '100%', justifyContent: 'center'}}>Get Started</button>
        </div>

        <div className="offer-card offer-card--featured">
          <div className="offer-popular">Most Popular</div>
          <h3>Instant Karo Pro</h3>
          <div className="offer-desc">For the family that wants maximum savings + buy-back value</div>
          <div className="offer-price">
            <span className="op">₹0</span>
            <span className="on">upfront + ₹50–150 buy-back credit</span>
          </div>
          <ul className="offer-features">
            <li>VELORA Pro 1200mm BLDC fan installed</li>
            <li>Old fan collected + ₹50–150 buy-back credit</li>
            <li>5-speed remote control included</li>
            <li>5-year motor warranty</li>
            <li>Society Carbon Credit logged in your name</li>
            <li>Priority technician visit (within 24 hrs)</li>
          </ul>
          {/*  Trigger Order Modal  */}
          <button type="button" onClick={() => window.setModalOpen('quoteModal')} className="btn btn--gold"
            style={{width: '100%', justifyContent: 'center'}}>Book Now — Free</button>
        </div>

        <div className="offer-card">
          <h3>MSME / Dealer Partner</h3>
          <div className="offer-desc">For shops and dealers who want to stock and sell Green Loop</div>
          <div className="offer-price">
            <span className="op">₹0</span>
            <span className="on">joining fee</span>
          </div>
          <ul className="offer-features">
            <li>Stock VELORA refurb fans at 10% below MRP</li>
            <li>Green Loop Desk provided free of charge</li>
            <li>Earn ₹150–200 commission per fan sold</li>
            <li>Referral QR code for customer signups</li>
            <li>Monthly training + support from Velotech</li>
            <li>Access to Green Loop MSME network</li>
          </ul>
          <button type="button" onClick={() => window.setModalOpen('quoteModal')} className="btn btn--outline-light"
            style={{width: '100%', justifyContent: 'center'}}>Become a Partner</button>
        </div>

      </div>
    </div>
  </section>
  );
};

export default Offers;
