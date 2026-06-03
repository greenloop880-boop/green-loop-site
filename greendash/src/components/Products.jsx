import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('store_products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Supabase Error fetching products:", error);
      } else if (data) {
        console.log("Fetched products successfully:", data);
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section id="products">
      <div className="container">
        <div className="products-header fade-up">
          <div>
            <div className="section-label">Our Products</div>
            <div className="divider"></div>
            <h2 className="display">The VELOTECH <em>Fan Range</em></h2>
            <p className="lead">
              Powered by Velotech Innovations. Engineered for efficiency. Designed for every Indian home.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.setModalOpen('quoteModal')}
            className="btn btn--outline"
            style={{ alignSelf: 'center' }}
          >
            Request Catalogue →
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '4rem', opacity: 0.7 }}>Loading dynamic products...</p>
        ) : (
          <div className="product-grid stagger visible">
            {products.map((product) => {
              const tags = product.tags || [];
              const specs = product.specs || [];
              const isFeatured = product.card_color === 'featured';

              return (
                <div key={product.id} className={`product-card product-card--${product.card_color || 'sm'}`}>
                  {/* Dynamic Image from Admin Panel (R2) */}
                  <div
                    className="product-img"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: isFeatured ? '#ffffff' : (product.image_url ? '#ffffff' : 'linear-gradient(135deg, #1b4332 0%, #081c15 100%)'),
                      // Remove pseudo-element effects for featured
                      '--opacity-glow': isFeatured ? '0' : '1'
                    }}
                  >
                    <div className="product-img-label" style={{ zIndex: 2 }}>{product.category_label}</div>

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: isFeatured ? 'contain' : 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          padding: isFeatured ? '1.5rem' : '0'
                        }}
                      />
                    ) : (
                      <div className="fan-icon" style={{ fontSize: '3rem', zIndex: 1 }}>{isFeatured ? '🌀' : '🌬️'}</div>
                    )}
                  </div>

                  <div className="product-body">
                    <div className="product-tag-row">
                      {tags.map((tag, i) => (
                        <span key={i} className={`tag ${tag.toLowerCase() === 'bestseller' ? 'tag--gold' : ''}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>

                    <div className="product-specs">
                      {specs.map((spec, i) => (
                        <div className="spec" key={i}>
                          <div className="s-val">{spec.val}</div>
                          <div className="s-key">{spec.key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="product-price">
                      {product.old_price && <span className="price-old">{product.old_price}</span>}
                      <span className="price" style={{ fontSize: isFeatured ? '2rem' : '1.55rem' }}>{product.price}</span>
                      {product.price_note && <span className="price-note">{product.price_note}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', width: '100%' }}>
                      <button
                        type="button"
                        onClick={() => window.location.href = product.button_link || 'https://kitsandchips.com/'}
                        className="btn btn--primary"
                        style={!isFeatured ? { width: '100%', justifyContent: 'center' } : {}}
                      >
                        {product.button_text}
                      </button>
                      {isFeatured && <a href="#offers" className="btn btn--outline">View Offers</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;