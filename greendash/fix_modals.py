import re

with open('../GreenLoop_Website.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract from Modals to JavaScript
modals_html = re.search(r'<!-- ── Modals .*?-->([\s\S]*?)<!-- ── JavaScript', html).group(1)

# Apply fixes
modals_html = re.sub(r'\bclass=', 'className=', modals_html)
modals_html = re.sub(r'<!--([\s\S]*?)-->', r'{/* \1 */}', modals_html)

# Self closing tags
def close_tag(match):
    inner = match.group(1)
    if inner.endswith('/'): return f'<{match.group(0)[1:]}'
    return f'<{match.group(0)[1:-1]} />'
modals_html = re.sub(r'<img([^>]*)>', close_tag, modals_html)
modals_html = re.sub(r'<input([^>]*)>', close_tag, modals_html)
modals_html = re.sub(r'<br\s*>', '<br />', modals_html)
modals_html = re.sub(r'<hr\s*>', '<hr />', modals_html)

# Convert inline styles
def style_replacer(match):
    style_str = match.group(1)
    props = []
    for prop in style_str.split(';'):
        if not prop.strip(): continue
        parts = prop.split(':', 1)
        if len(parts) == 2:
            key = parts[0].strip()
            val = parts[1].strip()
            key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
            props.append(f"{key}: '{val}'")
    return 'style={{' + ', '.join(props) + '}}'
modals_html = re.sub(r'style="([^"]*)"', style_replacer, modals_html)

# Fix JS events
modals_html = re.sub(r'onclick="closeModal\(\'([^\']+)\'\)"', r'onClick={() => setModalOpen(null)}', modals_html)
modals_html = re.sub(r'onclick="switchLoginTab\(\'([^\']+)\'\)"', r'onClick={() => setLoginTab(\'\1\')}', modals_html)
modals_html = re.sub(r'onsubmit="[^"]*"', r'onSubmit={(e) => { e.preventDefault(); window.location.href="https://kitsandchips.com/"; }}', modals_html)

# Fix SVGs and other things if needed
modals_html = re.sub(r'viewBox=', 'viewBox=', modals_html)

# Fix modal active classes
for modal_id in ['loginModal', 'orderModal', 'quoteModal']:
    modals_html = re.sub(f'id="{modal_id}" className="modal-overlay"', f'id="{modal_id}" className={{`modal-overlay ${{modalOpen === \'{modal_id}\' ? \'active\' : \'\'}}`}}', modals_html)

modals_html = re.sub(r'className="login-toggle-btn active" id="btnTabUser"', r'className={`login-toggle-btn ${loginTab === \'user\' ? \'active\' : \'\'}`} id="btnTabUser"', modals_html)
modals_html = re.sub(r'className="login-toggle-btn" id="btnTabAdmin"', r'className={`login-toggle-btn ${loginTab === \'admin\' ? \'active\' : \'\'}`} id="btnTabAdmin"', modals_html)

# We need to wrap it inside the Modals component
code = f"""import React from 'react';

const Modals = (props) => {{
  const {{ modalOpen, setModalOpen, loginTab, setLoginTab }} = props;
  return (
    <>
{modals_html}
    </>
  );
}};

export default Modals;
"""
with open('src/components/Modals.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
