import re
import os

with open('../GreenLoop_Website.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make components directory
os.makedirs('src/components', exist_ok=True)

# 1. Extract the services array from the script tag
script_match = re.search(r'<script>([\s\S]*?)</script>', html, re.IGNORECASE)
services_js = ""
if script_match:
    script_content = script_match.group(1)
    services_match = re.search(r'const services = (\[[\s\S]*?\]);', script_content)
    if services_match:
        services_js = services_match.group(1)
        # convert some JS properties if needed, but it's just an array of objects
        services_js = services_js.replace('class=', 'className=')

# 2. Extract sections from original HTML to recreate App correctly
# We will just parse the current App.jsx since it has className= and closed tags!
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_jsx = f.read()

def extract_tag(tag_name, content, attr=''):
    if attr:
        pattern = f'<{tag_name}[^>]*{attr}[^>]*>([\s\S]*?)</{tag_name}>'
    else:
        pattern = f'<{tag_name}[^>]*>([\s\S]*?)</{tag_name}>'
    match = re.search(pattern, content)
    if match:
        return match.group(0)
    return ""

def create_component(name, content, extra_imports="", extra_code=""):
    code = f"""import React from 'react';
{extra_imports}

const {name} = () => {{
  {extra_code}
  return (
    {content}
  );
}};

export default {name};
"""
    with open(f'src/components/{name}.jsx', 'w', encoding='utf-8') as f:
        f.write(code)

# Extract sections
navbar = extract_tag('nav', app_jsx)
hero = extract_tag('section', app_jsx, 'id="hero"')
about = extract_tag('section', app_jsx, 'id="about"')
products = extract_tag('section', app_jsx, 'id="products"')
how = extract_tag('section', app_jsx, 'id="how"')
offers = extract_tag('section', app_jsx, 'id="offers"')
community = extract_tag('section', app_jsx, 'id="community"')
partners = extract_tag('section', app_jsx, 'id="partners"')
cta = extract_tag('section', app_jsx, 'id="cta"')
footer = extract_tag('footer', app_jsx)

# Services section needs special handling because of the missing JS
services_section_html = extract_tag('section', html, 'id="services"')
if services_section_html:
    # Convert HTML to JSX format for the extracted services section
    services_section_html = re.sub(r'\bclass=', 'className=', services_section_html)
    services_section_html = re.sub(r'<!--([\s\S]*?)-->', r'{/* \1 */}', services_section_html)
    def close_tag(match):
        inner = match.group(1)
        if inner.endswith('/'):
            return f"<{match.group(0)[1:]}"
        return f"<{match.group(0)[1:-1]} />"
    services_section_html = re.sub(r'<img([^>]*)>', close_tag, services_section_html)
    services_section_html = re.sub(r'<input([^>]*)>', close_tag, services_section_html)
    services_section_html = re.sub(r'<br\s*>', '<br />', services_section_html)
    services_section_html = re.sub(r'<hr\s*>', '<hr />', services_section_html)
    
    # Replace onclick with onClick
    services_section_html = re.sub(r'onclick="setService\((\d+),\s*this\)"', r'onClick={() => setActiveService(\1)}', services_section_html)
    # Remove active class logic from raw html
    services_section_html = re.sub(r'className="service-item active"', 'className={`service-item ${activeService === 0 ? "active" : ""}`}', services_section_html)
    services_section_html = re.sub(r'className="service-item"', lambda m: m.group(0) if "activeService" in m.group(0) else 'className={`service-item ${activeService === NUM ? "active" : ""}`}', services_section_html)
    
    # Fix the generic replacement
    idx = 1
    while "NUM" in services_section_html:
        services_section_html = services_section_html.replace("NUM", str(idx), 1)
        idx += 1
        
    # Replace the empty serviceDetail with the dynamic render
    services_section_html = re.sub(
        r'<div className="service-detail fade-up" id="serviceDetail">[\s\S]*?</div>',
        """<div className="service-detail fade-up" id="serviceDetail">
            <div style={{fontSize: '2.5rem', marginBottom: '.8rem'}}>{services[activeService].icon}</div>
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
          </div>""",
        services_section_html
    )

    services_code = f"""
  const [activeService, setActiveService] = React.useState(0);
  const services = {services_js};
"""
    create_component("Services", services_section_html, "", services_code)

# Modals
modals = ""
for modal_id in ["loginModal", "orderModal", "quoteModal"]:
    modal = extract_tag('div', app_jsx, f'id="{modal_id}"')
    if modal:
        modals += modal + "\n"

create_component("Modals", f"<> {modals} </>", "", "const { modalOpen, setModalOpen, loginTab, setLoginTab } = props;")

# Create simple components
create_component("Navbar", navbar)
create_component("Hero", hero)
create_component("About", about)
create_component("Products", products)
create_component("HowItWorks", how)
create_component("Offers", offers)
create_component("Community", community)
create_component("Partners", partners)
create_component("CTA", cta)
create_component("Footer", footer)

# Recreate App.jsx
new_app_jsx = """import React, { useState, useEffect } from 'react';
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

function App() {
  const [modalOpen, setModalOpen] = useState(null);
  const [loginTab, setLoginTab] = useState('user');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Make setModalOpen available globally for the components that might need it
  // In a real app, you'd use context or pass props. For simplicity, we attach to window
  window.setModalOpen = setModalOpen;

  return (
    <>
      <Navbar scrolled={scrolled} />
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
"""

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(new_app_jsx)

# Also fix the Modals component definition to accept props
with open('src/components/Modals.jsx', 'r', encoding='utf-8') as f:
    modals_content = f.read()
modals_content = modals_content.replace('const Modals = () => {', 'const Modals = (props) => {')
with open('src/components/Modals.jsx', 'w', encoding='utf-8') as f:
    f.write(modals_content)

# And fix Navbar scrolled prop
with open('src/components/Navbar.jsx', 'r', encoding='utf-8') as f:
    nav_content = f.read()
nav_content = nav_content.replace('const Navbar = () => {', 'const Navbar = ({ scrolled }) => {')
nav_content = nav_content.replace('id="navbar" className={`', 'id="navbar" className={`navbar ${scrolled ? "scrolled" : ""} `')
with open('src/components/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(nav_content)

# Fix openModal calls in other components by converting them to window.setModalOpen
for comp in ["Hero", "About", "Products", "Services", "HowItWorks", "Offers", "Community", "Partners", "CTA"]:
    path = f'src/components/{comp}.jsx'
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = re.sub(r'onClick=\{\(\) => setModalOpen\((.*?)\)\}', r'onClick={() => window.setModalOpen(\1)}', content)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Components extracted!")
