import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const WardNurseDashboard = () => {
  // 1. Local Ward Data State
  const [wardData, setWardData] = useState({
    capacity: 100,
    occupancy: 85,
    discharges: 10,
    deaths: 0
  });

  // 2. State for AI-Driven Transfer Requests (Coming from the ETU API)
  const [incomingRequest, setIncomingRequest] = useState({
    count: 8,
    from: "ETU - Emergency Treatment Unit",
    priority: "High"
  });

  // Calculate real-time availability for the AI
  const availableBeds = wardData.capacity - (wardData.occupancy - wardData.discharges);

  const handleUpdate = (e) => {
    setWardData({ ...wardData, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  return (
    <Layout activePage="Ward">
      <div style={{ padding: 28, maxWidth: 1100, margin: '24px auto', color: '#0f172a' }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#0f172a' }}>General Ward - Management Portal</h1>
          <p style={{ color: '#64748b', marginTop: 6 }}>Role: Ward Lead Nurse</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        
        {/* SECTION 1: DAILY INPUTS */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e6eef7' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>Shift Status Update</h2>
          <div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#334155', marginBottom: 6 }}>Current Occupancy</label>
              <input
                type="number"
                name="occupancy"
                value={wardData.occupancy}
                onChange={handleUpdate}
                style={{ width: '100%', padding: 10, border: '1px solid #e6eef7', borderRadius: 8, background: '#fbfdff' }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#334155', marginBottom: 6 }}>Planned Discharges</label>
              <input
                type="number"
                name="discharges"
                value={wardData.discharges}
                onChange={handleUpdate}
                style={{ width: '100%', padding: 10, border: '1px solid #e6eef7', borderRadius: 8, background: '#fbfdff' }}
              />
            </div>

            <div style={{ marginTop: 18, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>Calculated Real-Time Availability:</p>
              <p style={{ margin: '8px 0 0 0', fontSize: 22, fontWeight: 800, color: availableBeds > 0 ? '#059669' : '#dc2626' }}>{availableBeds} Beds Free</p>
            </div>

            <button style={{ marginTop: 16, width: '100%', background: '#2563eb', color: '#fff', padding: '10px 12px', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Update Ward Status</button>
          </div>
        </div>

        {/* SECTION 2: AI TRANSFER REQUESTS (ETU STEP 1) */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '4px solid #fb923c', border: '1px solid #e6eef7' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px 0' }}>Incoming Transfer Request</h2>
          <div style={{ background: '#fff7ed', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#92400e', fontWeight: 700, textTransform: 'uppercase' }}>Source: {incomingRequest.from}</p>
            <p style={{ margin: '8px 0', fontSize: 28, fontWeight: 800, color: '#92400e' }}>{incomingRequest.count} Patients</p>
            <p style={{ margin: 0, fontSize: 12, color: '#92400e', fontStyle: 'italic' }}>&quot;AI predicts ETU surge. Please confirm capacity for transfer.&quot;</p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              style={{ flex: 1, background: '#059669', color: '#fff', padding: '10px 12px', borderRadius: 8, border: 'none', fontWeight: 700, cursor: availableBeds < incomingRequest.count ? 'not-allowed' : 'pointer', opacity: availableBeds < incomingRequest.count ? 0.6 : 1 }}
              disabled={availableBeds < incomingRequest.count}
            >
              Accept Transfer
            </button>
            <button style={{ flex: 1, border: '1px solid #e6eef7', padding: '10px 12px', borderRadius: 8, fontWeight: 700, background: '#fff', cursor: 'pointer' }}>
              Reject / Full
            </button>
          </div>

          {availableBeds < incomingRequest.count && (
            <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 700 }}>* Warning: Ward availability is lower than request.</p>
          )}
        </div>

        </div>
      </div>
    </Layout>
  );
};

export default WardNurseDashboard;