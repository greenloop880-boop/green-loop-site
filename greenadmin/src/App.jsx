import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Type,
  Fan,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';
import { uploadToR2 } from './r2Client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  // Restore session on page load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsLoggedIn(true);
    });
  }, []);

  // Dynamic Data States
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [tickerText, setTickerText] = useState('');

  const [uploadingImage, setUploadingImage] = useState(null); // store product id being uploaded
  const [editingId, setEditingId] = useState(null); // id of product currently being edited
  const [savingId, setSavingId] = useState(null); // id of product being saved

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
    fetchSettings();
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const { data, error } = await supabase.from('store_quotes').select('*').order('created_at', { ascending: false });
    if (!error) setQuotes(data || []);
  };

  const fetchSettings = async () => {
    const { data, error } = await supabase.from('store_settings').select('*').eq('key', 'ticker_text').single();
    if (!error && data) {
      setTickerText(data.value);
    } else if (error && error.code === 'PGRST116') {
      // Not found, create it
      await supabase.from('store_settings').insert([{ key: 'ticker_text', value: 'ENERGY SAVINGS ACROSS INDIA • INSTANT KARO — ZERO UPFRONT COST • BUY BACK YOUR OLD FAN' }]);
      setTickerText('ENERGY SAVINGS ACROSS INDIA • INSTANT KARO — ZERO UPFRONT COST • BUY BACK YOUR OLD FAN');
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('store_products').select('*').order('created_at', { ascending: true });
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
  };

  const handleImageUpload = async (e, productId) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(productId);
    try {
      const result = await uploadToR2(file, 'product-images');
      
      // Update Supabase with the new image URL
      const { error } = await supabase
        .from('store_products')
        .update({ image_url: result.url })
        .eq('id', productId);

      if (error) throw error;

      alert('Image uploaded and saved successfully!');
      fetchProducts(); // refresh
    } catch (error) {
      console.error(error);
      alert('Failed to upload image.');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleUpdateProduct = async (product) => {
    setSavingId(product.id);
    try {
      const { error } = await supabase
        .from('store_products')
        .update({
          title: product.title,
          description: product.description,
          price: product.price,
          old_price: product.old_price,
          category_label: product.category_label,
          price_note: product.price_note,
          tags: product.tags,
          specs: product.specs,
          button_text: product.button_text,
          card_color: product.card_color,
          is_active: product.is_active
        })
        .eq('id', product.id);

      if (error) throw error;
      alert('Product updated successfully!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error updating product');
    } finally {
      setSavingId(null);
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      title: 'New Product',
      description: 'Product description goes here...',
      price: '₹0',
      category_label: 'New Arrival',
      specs: [{ key: 'Wattage', val: '28W' }, { key: 'Warranty', val: '5 Years' }],
      tags: ['New'],
      button_text: 'Buy Now',
      is_active: true
    };

    try {
      const { data, error } = await supabase.from('store_products').insert([newProduct]).select();
      if (error) throw error;
      fetchProducts();
      if (data && data[0]) setEditingId(data[0].id);
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const { error } = await supabase.from('store_products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  const handleLocalChange = (id, field, value) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSpecChange = (productId, index, field, value) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newSpecs = [...(p.specs || [])];
        newSpecs[index] = { ...newSpecs[index], [field]: value };
        return { ...p, specs: newSpecs };
      }
      return p;
    }));
  };

  const addSpec = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, specs: [...(p.specs || []), { key: 'New Spec', val: 'Value' }] };
      }
      return p;
    }));
  };

  const removeSpec = (productId, index) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newSpecs = (p.specs || []).filter((_, i) => i !== index);
        return { ...p, specs: newSpecs };
      }
      return p;
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'quotes':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="page-header">
              <h1>Quote Requests</h1>
              <p>Manage and respond to customer inquiries from the storefront.</p>
            </div>
            {/* Stats and Table... */}
            <div className="card">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Request Type</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map(q => (
                      <tr key={q.id}>
                        <td>
                          <div style={{ fontWeight: 700 }}>{q.customer_name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{q.customer_phone}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{q.customer_email}</div>
                        </td>
                        <td>
                          <span style={{ 
                            padding: '0.3rem 0.6rem', 
                            background: q.request_type === 'Quick Order' ? 'rgba(212, 168, 67, 0.15)' : 'rgba(13, 148, 136, 0.15)',
                            color: q.request_type === 'Quick Order' ? 'var(--gold)' : 'var(--primary)',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                          }}>
                            {q.request_type}
                          </span>
                        </td>
                        <td>{q.product_title}</td>
                        <td>{new Date(q.created_at).toLocaleDateString()}</td>
                        <td>
                          <select 
                            value={q.status} 
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              await supabase.from('store_quotes').update({ status: newStatus }).eq('id', q.id);
                              fetchQuotes();
                            }}
                            className={`status-badge ${q.status === 'processed' ? 'processed' : 'new'}`}
                            style={{ border: 'none', cursor: 'pointer' }}
                          >
                            <option value="new">New</option>
                            <option value="processed">Processed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button 
                            className="btn-save" 
                            style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                            onClick={() => alert(`Details: \n\nName: ${q.customer_name}\nType: ${q.request_type}\nProduct: ${q.product_title}\n\nYou can now contact them at ${q.customer_phone}`)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {quotes.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No quote requests found.</p>}
              </div>
            </div>
          </motion.div>
        );

      case 'products':
        // ... (existing products code)
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1>Product Management</h1>
                <p>Manage the VELORA fan range, specs, and upload photos.</p>
              </div>
              <button className="btn-save" onClick={handleAddProduct} style={{ background: 'var(--primary)' }}>+ Add New Product</button>
            </div>

            {products.length === 0 && <p>Loading products from Supabase...</p>}

            {products.map((product) => (
              <div className="card" key={product.id} style={{ marginBottom: '2rem', border: savingId === product.id ? '1px solid var(--primary)' : '1px solid #222' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Fan size={20} color="var(--primary)" />
                    <input 
                      type="text" 
                      value={product.title} 
                      onChange={(e) => handleLocalChange(product.id, 'title', e.target.value)}
                      style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed #444', color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 700, width: '300px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select 
                      value={product.is_active} 
                      onChange={(e) => handleLocalChange(product.id, 'is_active', e.target.value === 'true')}
                      className={`status-badge ${product.is_active ? 'processed' : 'new'}`}
                      style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                    >
                      <option value="true">Active</option>
                      <option value="false">Hidden</option>
                    </select>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{ background: 'transparent', border: 'none', color: '#c0392b', cursor: 'pointer', padding: '0.5rem' }}
                      title="Delete Product"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                  {/* Left: Image */}
                  <div className="input-group">
                    <label>Product Photo</label>
                    <div style={{ position: 'relative', width: '100%', height: '240px', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
                      {product.image_url ? (
                        <img src={product.image_url} alt="Product Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Fan size={48} color="#222" />
                        </div>
                      )}
                      <label style={{ 
                        position: 'absolute', 
                        bottom: '1rem', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        background: 'rgba(0,0,0,0.8)', 
                        padding: '0.6rem 1rem', 
                        borderRadius: '99px', 
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid #444',
                        whiteSpace: 'nowrap'
                      }}>
                        <Upload size={14} />
                        {uploadingImage === product.id ? 'Uploading...' : 'Change Photo'}
                        <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleImageUpload(e, product.id)} disabled={uploadingImage === product.id} />
                      </label>
                    </div>
                  </div>

                  {/* Right: Info */}
                  <div>
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
                      <div className="input-group">
                        <label>Price Display</label>
                        <input type="text" value={product.price} onChange={(e) => handleLocalChange(product.id, 'price', e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Old Price (Optional)</label>
                        <input type="text" value={product.old_price || ''} onChange={(e) => handleLocalChange(product.id, 'old_price', e.target.value)} placeholder="₹4,500" />
                      </div>
                      <div className="input-group">
                        <label>Category Tag</label>
                        <input type="text" value={product.category_label || ''} onChange={(e) => handleLocalChange(product.id, 'category_label', e.target.value)} />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Description</label>
                      <textarea rows={3} value={product.description} onChange={(e) => handleLocalChange(product.id, 'description', e.target.value)} />
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', display: 'block', marginBottom: '0.8rem' }}>Product Specifications (Key-Value Grid)</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {(product.specs || []).map((spec, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                              type="text" 
                              value={spec.key} 
                              onChange={(e) => handleSpecChange(product.id, idx, 'key', e.target.value)} 
                              placeholder="Key (e.g. Wattage)"
                              style={{ flex: 1, fontSize: '0.85rem' }}
                            />
                            <input 
                              type="text" 
                              value={spec.val} 
                              onChange={(e) => handleSpecChange(product.id, idx, 'val', e.target.value)} 
                              placeholder="Value (e.g. 28W)"
                              style={{ flex: 1, fontSize: '0.85rem' }}
                            />
                            <button onClick={() => removeSpec(product.id, idx)} style={{ background: 'transparent', border: 'none', color: '#666' }}>×</button>
                          </div>
                        ))}
                        <button 
                          onClick={() => addSpec(product.id)}
                          style={{ background: 'transparent', border: '1px dashed #444', borderRadius: '8px', padding: '0.5rem', color: '#888', fontSize: '0.8rem' }}
                        >
                          + Add Spec
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', gap: '1rem' }}>
                      <button 
                        className="btn-save" 
                        onClick={() => handleUpdateProduct(product)}
                        disabled={savingId === product.id}
                      >
                        {savingId === product.id ? 'Saving Changes...' : 'Save Product Details'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="page-header">
              <h1>Storefront Settings</h1>
              <p>Manage global elements like the top announcement ticker.</p>
            </div>

            <div className="card">
              <div className="input-group">
                <label>Top Bar Announcement Ticker</label>
                <textarea 
                  rows={4} 
                  value={tickerText} 
                  onChange={(e) => setTickerText(e.target.value)}
                  placeholder="Enter the text to display in the moving ticker..."
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                  Use " • " to separate different messages.
                </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  className="btn-save" 
                  onClick={async () => {
                    const { error } = await supabase.from('store_settings').update({ value: tickerText }).eq('key', 'ticker_text');
                    if (error) alert('Error saving ticker');
                    else alert('Ticker updated successfully!');
                  }}
                >
                  Save Ticker Text
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="page-header">
            <h1>Select a module from the sidebar.</h1>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen" style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #050d0a 0%, #0a1f18 100%)' 
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card" 
          style={{ width: '400px', padding: '3rem', textAlign: 'center', border: '1px solid rgba(13, 148, 136, 0.2)' }}
        >
          <img src="/favicon.png" alt="Green Loop Logo" style={{ width: '80px', height: '80px', marginBottom: '1.5rem', borderRadius: '12px' }} />
          <h2 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>GreenAdmin</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.9rem' }}>Authorized Personnel Only</p>
          
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoginError('');
            setLoginLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
              email: loginForm.email,
              password: loginForm.password,
            });
            setLoginLoading(false);
            if (error) {
              setLoginError('Invalid email or password. Please try again.');
            } else {
              setIsLoggedIn(true);
            }
          }}>
            <div className="input-group" style={{ textAlign: 'left' }}>
              <label>Admin Email</label>
              <input 
                type="email" 
                value={loginForm.email} 
                onChange={(e) => { setLoginForm({...loginForm, email: e.target.value}); setLoginError(''); }}
                placeholder="your@email.com" 
                required 
              />
            </div>
            <div className="input-group" style={{ textAlign: 'left', marginTop: '1rem' }}>
              <label>Password</label>
              <input 
                type="password" 
                value={loginForm.password} 
                onChange={(e) => { setLoginForm({...loginForm, password: e.target.value}); setLoginError(''); }}
                placeholder="••••••••" 
                required 
              />
            </div>
            {loginError && (
              <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'left' }}>
                ⚠ {loginError}
              </p>
            )}
            <button type="submit" className="btn-save" disabled={loginLoading} style={{ width: '100%', marginTop: '2rem', padding: '1rem', opacity: loginLoading ? 0.7 : 1 }}>
              {loginLoading ? 'Signing in...' : 'Login to Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/favicon.png" alt="GL Logo" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, letterSpacing: '1px' }}>GREENADMIN</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 600 }}>VELOTECH INNOVATIONS</span>
          </div>
        </div>
        <nav style={{ flex: 1 }}>
          <div className={`nav-item ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>
            <MessageSquare size={20} />
            <span>Quotes</span>
          </div>
          <div className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <Fan size={20} />
            <span>Products</span>
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </nav>
        <div className="nav-item" onClick={async () => {
          await supabase.auth.signOut();
          setIsLoggedIn(false);
        }} style={{ marginTop: 'auto', borderTop: '1px solid #222', paddingTop: '1rem' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </aside>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
