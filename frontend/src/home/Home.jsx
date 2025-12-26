import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import BedDashboard from '../components/Bed_demand_focasting/Bed_Dashboard';

const heroStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '12px',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '40px 20px',
};

const kpiCard = {
  background: '#fff',
  borderRadius: 10,
  padding: 16,
  boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
  minWidth: 160,
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      <Navbar />

      <header style={{ background: '#f8fafc', padding: '28px 0' }}>
        <div style={heroStyle}>
          <h1 style={{ fontSize: 34, margin: 0, lineHeight: 1.05 }}>
            Hospital Resource Optimization & Demand Forecasting
          </h1>
          <p style={{ color: '#475569', maxWidth: 820, margin: 0 }}>
            Predict patient demand, optimize bed allocation, and improve operational readiness with
            explainable forecasts and actionable resource recommendations.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
           

            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '10px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Login
            </button>
          </div>

          
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '28px auto', padding: '0 20px' }}>
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 10 }}>What we do</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <strong>Demand Forecasting</strong>
              <p style={{ margin: '8px 0 0', color: '#475569' }}>Short- and medium-term admissions forecasts per unit.</p>
            </div>
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <strong>Resource Optimization</strong>
              <p style={{ margin: '8px 0 0', color: '#475569' }}>Auto-suggest bed allocations and staffing adjustments.</p>
            </div>
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <strong>Alerts & Planning</strong>
              <p style={{ margin: '8px 0 0', color: '#475569' }}>Threshold-based alerts and scenario planning tools.</p>
            </div>
          </div>
           <button
              onClick={() => navigate('/bed-dashboard')}
              style={{
                background: '#0ea5a4',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              View Bed Forecasting
            </button>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 12 }}>Live preview — Bed Forecast</h2>
          <div style={{ background: '#ffffff', borderRadius: 8, padding: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
            <BedDashboard />
          </div>
        </section>

        <section style={{ marginTop: 8, padding: 14, borderRadius: 8, background: '#f1f5f9' }}>
          <h3 style={{ margin: '0 0 8px' }}>Ready to reduce shortages and overprovisioning?</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => navigate('/bed-dashboard')}
              style={{ background: '#0ea5a4', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Open Bed Forecast
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' }}
            >
              Request Demo
            </button>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '18px 8px', color: '#64748b' }}>
        © {new Date().getFullYear()} Hospital Resource Optimization · Built for operational teams
      </footer>
    </div>
  );
}
