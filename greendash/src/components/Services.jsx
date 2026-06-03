import React from 'react';

const Services = () => {
  const [activeService, setActiveService] = React.useState(0);
  const services = [
    {
      icon: '⚡',
      title: 'BLDC Fan Upgrade — Instant Karo',
      desc: 'The Instant Karo offer is our zero-upfront upgrade programme. Sign up, a technician visits within 48 hours, your old fan is collected, and your new VELOTECH BLDC fan is installed and running — all before you pay a single rupee. Your electricity bill does the talking.',
      features: [
        'Zero upfront payment — ever',
        'VELOTECH BLDC fan installed within 48 hours',
        'Old fan collected at no additional cost',
        '5-speed remote control included (Pro model)',
        '62% electricity reduction visible on next bill',
        '5-year warranty on BLDC motor',
      ],
      resultVal: '62%',
      resultLbl: 'average energy reduction per fan'
    },
    {
      icon: '♻️',
      title: 'Fan Buy-Back Programme',
      desc: 'Your old 75W induction fan is not trash — it is a resource. We buy it back from you at ₹50–150 depending on condition, refurbish it with a BLDC Retrofit Kit, and resell it to MSME stores at a price that beats any brand. Your old fan gets a second life. You get cash in hand.',
      features: [
        '₹50–150 buy-back credit on your old fan',
        'Collection from your doorstep — free of charge',
        'Fan graded and routed to Central Refurbishment Workshop',
        'Old fan never goes to landfill',
        'Refurbished fan earns a Carbon Credit in your name',
        'Receipt issued on spot for every collection',
      ],
      resultVal: '0 kg',
      resultLbl: 'fan waste sent to landfill'
    },
    {
      icon: '🔧',
      title: 'BLDC Retrofit Service',
      desc: "Don't want to replace the whole fan? We get it. Our BLDC Retrofit Kit converts your existing induction fan's motor to BLDC technology in under 30 minutes. No new fan, no new blades — just a new motor, a remote control, and 62% less electricity consumption. Same fan, smarter.",
      features: [
        'Converts existing fan motor to BLDC in 30 minutes',
        'Reduces wattage from 75W to 28W',
        'Remote control upgrade included',
        'No change to blades or fan body',
        'Technician visits home — you don\'t move an inch',
        'Kit priced at ₹1,299 with 1-year warranty',
      ],
      resultVal: '30 min',
      resultLbl: 'installation time at your home'
    },
    {
      icon: '🌿',
      title: 'Carbon Credit Monetisation',
      desc: 'Every fan swap in the Green Loop network saves approximately 173 kg of CO₂ per year. We aggregate these savings, verify them with a BEE-empanelled energy auditor, and issue Carbon Credit Certificates (CCCs) that are sold to corporations needing to offset their emissions. The revenue flows back into the community.',
      features: [
        '~173 kg CO₂ saved per fan swap annually',
        'Verified by BEE-empanelled energy auditor',
        'Carbon Credit Certificates issued and sold',
        'Target buyers: Steel, Chemicals, Aviation sectors',
        'Society gets monthly CO₂ savings report',
        'Optional: corporate buyers pay ₹500–900 per CCC',
      ],
      resultVal: '173 kg',
      resultLbl: 'CO₂ offset per fan per year'
    },
    {
      icon: '🏘️',
      title: 'RWA / AOA Community Programme',
      desc: 'We work with Resident Welfare Associations and Apartment Owners Associations to activate entire housing societies under the Green Loop programme. One WhatsApp message from the AOA secretary to residents can unlock savings for hundreds of households — with zero effort from the association.',
      features: [
        'The Green Loop Desk installed in society lobby (free)',
        'Exchange Mela event co-organised with AOA quarterly',
        '₹500–1,000 community fund per Mela hosted',
        '"The Green Loop Certified Community" plaque provided',
        'Monthly savings board for society notice board',
        '1 resident trained as paid Hub Coordinator',
      ],
      resultVal: '₹10–15L',
      resultLbl: 'collective savings unlocked per 200-flat society per year'
    },
    {
      icon: '🏪',
      title: 'MSME Dealer Partnership',
      desc: "If you run an electrical shop, hardware store, or any retail outlet — becoming a The Green Loop MSME Partner gives you access to quality refurb BLDC fans at 10% below any brand's MRP, a The Green Loop Desk at your shop for free, and a commission on every fan sold or referral QR scan completed.",
      features: [
        'Stock The Green Loop refurb fans at 10% below MRP',
        'The Green Loop Type A Desk provided at your shop free',
        '₹150–200 commission per fan sold',
        '₹50 per referral QR scan at your counter',
        'Monthly training and product briefing from Velotech',
        'Access to The Green Loop MSME reseller network',
      ],
      resultVal: '₹200',
      resultLbl: 'average commission per fan through your shop'
    }
  ];

  return (
    <section id="services">
      <div className="container">
        <div className="fade-up" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label section-label--light">What We Do</div>
          <div className="divider"></div>
          <h2 className="display display--white">Our <em>Services</em></h2>
          <p className="lead lead--light">From the moment you sign up to the day your electricity bill drops — we handle everything.</p>
        </div>

        <div className="services-grid">
          <div className="service-list" id="serviceList">
            <div className={`service-item ${activeService === 0 ? "active" : ""}`} onClick={() => setActiveService(0)}>
              <div className="s-icon">⚡</div>
              <h4>BLDC Fan Upgrade — Instant Karo</h4>
              <p>Zero upfront. New VELOTECH BLDC fan installed at your home within 48 hours.</p>
            </div>

            <div className={`service-item ${activeService === 1 ? "active" : ""}`} onClick={() => setActiveService(1)}>
              <div className="s-icon">♻️</div>
              <h4>Fan Buy-Back Programme</h4>
              <p>We collect your old 75W induction fan and give you instant credit.</p>
            </div>

            <div className={`service-item ${activeService === 2 ? "active" : ""}`} onClick={() => setActiveService(2)}>
              <div className="s-icon">🔧</div>
              <h4>BLDC Retrofit Service</h4>
              <p>Convert your existing fan in 30 minutes. No new fan required.</p>
            </div>

            <div className={`service-item ${activeService === 3 ? "active" : ""}`} onClick={() => setActiveService(3)}>
              <div className="s-icon">🌿</div>
              <h4>Carbon Credit Monetisation</h4>
              <p>Turn every fan upgrade into a verified carbon credit for your society or business.</p>
            </div>

            <div className={`service-item ${activeService === 4 ? "active" : ""}`} onClick={() => setActiveService(4)}>
              <div className="s-icon">🏘️</div>
              <h4>RWA / AOA Community Programme</h4>
              <p>Activate your entire housing society. Co-branded Exchange Mela events.</p>
            </div>

            <div className={`service-item ${activeService === 5 ? "active" : ""}`} onClick={() => setActiveService(5)}>
              <div className="s-icon">🏪</div>
              <h4>MSME Dealer Partnership</h4>
              <p>Stock The Green Loop refurb fans in your store at 10% below brand MRP.</p>
            </div>
          </div>

          <div className="service-detail fade-up" id="serviceDetail">
            <div style={{ fontSize: '2.5rem', marginBottom: '.8rem' }}>{services[activeService].icon}</div>
            <h3>{services[activeService].title}</h3>
            <p className="big-desc">{services[activeService].desc}</p>
            <div className="service-features">
              {services[activeService].features.map((f, i) => (
                <div className="sf" key={i}><span className="sf-check">✦</span><span className="sf-text">{f}</span></div>
              ))}
            </div>
            <div className="service-result">
              <div>
                <div className="r-val">{services[activeService].resultVal}</div>
                <div className="r-lbl">{services[activeService].resultLbl}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
