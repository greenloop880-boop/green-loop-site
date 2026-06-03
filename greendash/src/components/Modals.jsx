import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Modals = (props) => {
  const { modalOpen, setModalOpen, loginTab, setLoginTab } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = async (e, type) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await supabase.from('store_quotes').insert([{
        customer_name: data.name || data.fullname || 'Unknown',
        customer_email: data.email || '',
        customer_phone: data.phone || data.tel || '',
        product_title: data.product || 'General Inquiry',
        request_type: type,
        status: 'new'
      }]);

      if (error) throw error;
      
      alert('Thank you! Your request has been received. Our team will contact you soon.');
      setModalOpen(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Redesigned Login Modal */}
      <div id="loginModal" className={`modal-overlay ${modalOpen === 'loginModal' ? 'active' : ''}`}>
        <div className="modal-content login-modal-custom">
          <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
          <div className="login-header-top">
            <div className="nav-brand" style={{gap: '0.8rem'}}>
              <div className="nav-logo" style={{width: '32px', height: '32px', fontSize: '0.9rem'}}>GL</div>
              <div className="nav-name">
                <strong style={{color: 'var(--white)', fontSize: '1rem'}}>The Green Loop</strong>
                <span style={{color: 'var(--gold)', fontSize: '0.6rem'}}>Powered by Velotech Innovations</span>
              </div>
            </div>
          </div>

          <div className="login-toggle-container">
            <button className={`login-toggle-btn ${loginTab === 'user' ? 'active' : ''}`} onClick={() => setLoginTab('user')}>👤 User</button>
            <button className={`login-toggle-btn ${loginTab === 'admin' ? 'active' : ''}`} onClick={() => setLoginTab('admin')}>🛡️ Admin</button>
          </div>

          <div className="login-titles">
            <h3>{loginTab === 'user' ? 'User Portal' : 'Admin Portal'}</h3>
            <p>Secure access for The Green Loop {loginTab === 'user' ? 'users' : 'administrators'}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Login functionality coming soon!'); }}>
            <div className="login-form-group">
              <label className="login-label">EMAIL</label>
              <input type="email" name="email" className="login-input" placeholder="user@greenloop.in" required />
            </div>
            <div className="login-form-group" style={{marginBottom: '0.5rem'}}>
              <label className="login-label">PASSWORD</label>
              <input type="password" name="password" className="login-input" placeholder="••••••••" required />
            </div>
            <div className="login-meta">
              <a href="#" className="forgot-pass">Forgot Password?</a>
            </div>
            <button type="submit" className="btn-login-submit">Sign In</button>
          </form>
        </div>
      </div>

      {/* Order Modal */}
      <div id="orderModal" className={`modal-overlay ${modalOpen === 'orderModal' ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
          <div className="modal-header">
            <h3>Complete Your Order</h3>
            <p>Fill in the details below to request your upgrade.</p>
          </div>
          <form onSubmit={(e) => handleQuoteSubmit(e, 'Quick Order')}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-input" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="phone" className="form-input" placeholder="+91 XXXXXXXXXX" required />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea name="address" className="form-input" placeholder="Full address..." required></textarea>
            </div>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting} style={{width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem'}}>
              {isSubmitting ? 'Submitting...' : 'Order Now'}
            </button>
          </form>
        </div>
      </div>

      {/* Request a Quote Modal */}
      <div id="quoteModal" className={`modal-overlay ${modalOpen === 'quoteModal' ? 'active' : ''}`}>
        <div className="modal-content" style={{maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto'}}>
          <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
          <div className="modal-header">
            <h3>Request a Quote</h3>
            <p>Provide details to get an accurate estimate for your project.</p>
          </div>
          <form onSubmit={(e) => handleQuoteSubmit(e, 'Full Quote')}>
            <h4 className="form-section-title" style={{marginTop: '0'}}>A. Contact Information</h4>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" name="phone" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Industry</label>
                <select name="industry" className="form-input">
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
            </div>

            <h4 className="form-section-title">B. Requirements</h4>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Product of Interest</label>
                <select name="product" className="form-input" required>
                  <option value="velotech-pro">VELOTECH Pro</option>
                  <option value="velotech-lite">VELOTECH Lite</option>
                  <option value="velotech-smart">VELOTECH Smart</option>
                  <option value="retrofit-kit">Retrofit Kit</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" name="quantity" className="form-input" min="1" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Additional Details</label>
              <textarea name="details" className="form-input" placeholder="Any specific requirements..."></textarea>
            </div>

            <button type="submit" className="btn btn--primary" disabled={isSubmitting} style={{width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '1rem'}}>
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modals;
