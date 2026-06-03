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
          "VELOTECH BLDC Fans — 62% Energy Savings",
          "Instant Karo — Zero Upfront Cost",
          "Buy Back Your Old Fan — Earn Carbon Credits",
          "The Green Loop — India's First Circular Fan Economy",
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
          <span>{m}</span>
          <span className="dot">✦</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="ticker-wrapper">
      <div className="ticker-content">
        {renderMessages()}
        {renderMessages()}
        {renderMessages()}
        {renderMessages()}
      </div>
    </div>
  );
};

export default Ticker;