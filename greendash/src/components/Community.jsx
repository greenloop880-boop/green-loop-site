import React from 'react';


const Community = () => {

  return (
    <section id="community">
      <div className="container">
        <div className="fade-up" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1rem' }}>
          <div className="section-label" style={{ textAlign: 'center' }}>Community Stories</div>
          <div className="divider divider--center"></div>
          <h2 className="display" style={{ textAlign: 'center' }}>Real Savings. <em>Real People.</em></h2>
        </div>
        <div className="testimonials stagger">
          <div className="testi">
            <div className="quote">"</div>
            <p>Humara bijli bill pehle ₹1,800 aata tha. Ab ₹1,100 aa raha hai — sirf teen fans badle hain. The Green Loop ne
              jo kaha, wahi hua. Bilkul sach.</p>
            <div className="testi-author">
              <div className="testi-avatar">RS</div>
              <div>
                <div className="testi-name">Ramesh Sahoo</div>
                <div className="testi-loc">Patia, Bhubaneswar</div>
                <div className="testi-savings">Saves ₹700/month</div>
              </div>
            </div>
          </div>
          <div className="testi">
            <div className="quote">"</div>
            <p>As the AOA secretary, I was skeptical at first. But after the Exchange Mela in our society — 43 fans
              collected in one morning — the residents were thrilled. It's the easiest community initiative we've ever
              run.</p>
            <div className="testi-author">
              <div className="testi-avatar">PM</div>
              <div>
                <div className="testi-name">Priya Mohanty</div>
                <div className="testi-loc">Niladri Vihar AOA, BBSR</div>
                <div className="testi-savings">43 fans in 1 event</div>
              </div>
            </div>
          </div>
          <div className="testi">
            <div className="quote">"</div>
            <p>I stock The Green Loop refurb fans in my shop. My customers get quality fans at ₹1,899 — cheaper than any new
              fan from Havells or Orient. I earn ₹200 per fan. It's the best deal I've found for my electrical shop in 10
              years.</p>
            <div className="testi-author">
              <div className="testi-avatar">SS</div>
              <div>
                <div className="testi-name">Suresh Singh</div>
                <div className="testi-loc">Unit-4 Market, Bhubaneswar</div>
                <div className="testi-savings">MSME Partner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
