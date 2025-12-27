import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const resources = [
    { name: 'Blog', path: '/blog' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Support', path: '/support' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  return (
    <footer style={{
      backgroundColor: '#05232b',
      color: '#e6eef1',
      width: '100vw',
      marginLeft: 'calc(50% - 50vw)',
      boxSizing: 'border-box',
      paddingTop: 0,
    }}>

      {/* Newsletter / Top row */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.03)'
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', color: '#a7c8cc', marginBottom: 8 }}>NEWSLETTER</div>
            <h2 style={{ margin: 0, fontSize: 20, color: '#ffffff' }}>Get hooked! Sign up to get the latest catch sent to your inbox.</h2>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input aria-label="Email" placeholder="Enter your email address" style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#e6eef1', minWidth: 260 }} />
            <button style={{ background: '#e6b04a', border: 'none', padding: '10px 14px', borderRadius: 6, cursor: 'pointer' }}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        <div>
          <h4 style={{ color: '#dff6f7', marginBottom: 12 }}>TOFINO RESORT + MARINA</h4>
          <address style={{ color: '#9fbec2', lineHeight: 1.8, fontStyle: 'normal' }}>
            634 Campbell St<br />
            Tofino BC
          </address>
          <div style={{ marginTop: 12 }}>
            <div style={{ color: '#9fbec2' }}><strong>P</strong> 844.680.4184</div>
            <div style={{ color: '#9fbec2' }}><strong>E</strong> info@hospitalro.com</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button style={{ padding: '8px 16px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>BOOK NOW</button>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#dff6f7', marginBottom: 12 }}>THE ADVENTURE CENTRE + MARINA</h4>
          <address style={{ color: '#9fbec2', lineHeight: 1.8, fontStyle: 'normal' }}>
            634 Campbell St<br />
            Tofino BC
          </address>
          <div style={{ marginTop: 12 }}>
            <div style={{ color: '#9fbec2' }}><strong>P</strong> 778.841.0186</div>
            <div style={{ color: '#9fbec2' }}><strong>E</strong> marina@hospitalro.com</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button style={{ padding: '8px 16px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>CHOOSE YOUR ADVENTURE</button>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#dff6f7', marginBottom: 12 }}>1909 KITCHEN</h4>
          <address style={{ color: '#9fbec2', lineHeight: 1.8, fontStyle: 'normal' }}>
            634 Campbell St<br />
            Tofino BC
          </address>
          <div style={{ marginTop: 12 }}>
            <div style={{ color: '#9fbec2' }}><strong>P</strong> 250.726.6122</div>
            <div style={{ color: '#9fbec2' }}><strong>E</strong> info@hospitalro.com</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button style={{ padding: '8px 16px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>RESERVE A TABLE</button>
          </div>
        </div>
      </div>

      {/* Bottom small copyright row */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ color: '#9fbec2' }}>© {currentYear} Hospital Resource Optimization System. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/privacy" style={{ color: '#0ea5a4', textDecoration: 'none' }}>Privacy</Link>
          <span style={{ color: '#9fbec2' }}>|</span>
          <Link to="/terms" style={{ color: '#0ea5a4', textDecoration: 'none' }}>Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;