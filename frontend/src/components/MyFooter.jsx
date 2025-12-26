import React from 'react'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'

const MyFooter = () => {
  const root = { background: '#0f172a', color: '#fff', padding: '36px 12px', marginTop: 48 }
  const grid = { maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }
  const colTitle = { fontWeight: 700, marginBottom: 8 }
  const small = { fontSize: 14, color: '#cbd5e1', lineHeight: 1.8 }
  const bottom = { borderTop: '1px solid rgba(148,163,184,0.08)', marginTop: 28, paddingTop: 18 }
  const socialStyle = { display: 'flex', gap: 12, alignItems: 'center' }

  return (
    <footer style={root}>
      <div style={grid}>
        <div>
          <div style={colTitle}>Product</div>
          <div style={small}>
            <div>Features</div>
            <div>Integrations</div>
            <div>Pricing</div>
          </div>
        </div>

        <div>
          <div style={colTitle}>Resources</div>
          <div style={small}>
            <div>Docs</div>
            <div>API</div>
            <div>Support</div>
          </div>
        </div>

        <div>
          <div style={colTitle}>Company</div>
          <div style={small}>
            <div>About</div>
            <div>Careers</div>
            <div>Contact</div>
          </div>
        </div>

        <div>
          <div style={colTitle}>Stay Connected</div>
          <div style={small}>Subscribe for product updates and forecasting insights.</div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', ...bottom, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#94a3b8' }}>© {new Date().getFullYear()} Hospital Resource Optimization</div>
        <div style={socialStyle}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="facebook" style={{ color: '#cbd5e1' }}><BsFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="instagram" style={{ color: '#cbd5e1' }}><BsInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="twitter" style={{ color: '#cbd5e1' }}><BsTwitter /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="github" style={{ color: '#cbd5e1' }}><BsGithub /></a>
        </div>
      </div>
    </footer>
  )
}

export default MyFooter