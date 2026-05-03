import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Ticker = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchTicker = async () => {
      const { data, error } = await supabase.from('store_settings').select('*').eq('key', 'ticker_text').single();
      if (!error && data) {
        setMessages(data.value.split(' • '));
      } else {
        // Fallback if not found yet
        setMessages([
          "VELORA BLDC Fans — 62% Energy Savings",
          "Instant Karo — Zero Upfront Cost",
          "Buy Back Your Old Fan — Earn Carbon Credits",
          "Green Loop — India's First Circular Fan Economy",
          "IIT Bhubaneswar — Velotech Innovations Pvt. Ltd."
        ]);
      }
    };
    fetchTicker();
  }, []);

  const renderMessages = () => (
    <>
      {messages.map((m, i) => (
        <React.Fragment key={`msg-${i}`}>
          <span style={{ padding: '0 1.5rem', fontWeight: '500' }}>{m}</span>
          <span className="dot" style={{ color: 'var(--gold)', margin: '0 0.5rem' }}>✦</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div style={{
      marginTop: '72px',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      backgroundColor: 'var(--dark)', 
      color: 'var(--white)',
      padding: '12px 0',
      width: '100vw'
    }}>
      <div style={{ display: 'flex', animation: 'seamlessTicker 60s linear infinite' }}>
        {renderMessages()}
        {renderMessages()}
        {renderMessages()}
        {renderMessages()}
      </div>

      <style>
        {`
          @keyframes seamlessTicker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;