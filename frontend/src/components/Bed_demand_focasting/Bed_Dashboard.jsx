import React from 'react';
import { Users, BedDouble, Clock, Activity, AlertTriangle } from 'lucide-react';
import Layout from './Layout';

const BedDashboard = () => {

  // Current Total Occupancy (Mock Data)
  const totalOccupancy = 90; // 90% full
  const occupancyColor = totalOccupancy > 85 ? '#ef4444' : totalOccupancy > 60 ? '#f59e0b' : '#10b981';
  const occupancyStatus = totalOccupancy > 85 ? 'CRITICAL' : totalOccupancy > 60 ? 'High' : 'Normal';

  return (
    <Layout activePage="Dashboard">
      <div style={{ padding: 28, maxWidth: 1100, margin: '24px auto', color: '#0f172a' }}>
        
        {/* Updated Title for ETU Pilot */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>ETU Operations Dashboard</h1>
            <p style={{ color: '#64748b', marginTop: 4 }}>Emergency Treatment Unit • Real-time Status</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: occupancyColor, background: '#fff', padding: '6px 12px', borderRadius: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: occupancyColor, boxShadow: `0 0 0 2px ${occupancyColor}33` }}></div>
            System Status: {occupancyStatus}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 28 }}>
          {/* Card 1: Fixed Capacity */}
          <StatCard 
            icon={<BedDouble size={24} color="#2563eb" />} 
            title="Total ETU Beds" 
            value="20" 
            sub="Fixed Capacity"
          />
          
          {/* Card 2: Real-time Occupancy */}
          <StatCard 
            icon={<Users size={24} color={occupancyColor} />} 
            title="Current Occupancy" 
            value={`${totalOccupancy}%`} 
            sub="18 / 20 Beds Full"
          />
          
          {/* Card 3: Shift Forecast */}
          <StatCard 
            icon={<Activity size={24} color="#9333ea" />} 
            title="Next Shift Forecast" 
            value="High Load" 
            sub="~12 Admissions Expected"
          />
          
          {/* Card 4: Bottlenecks */}
          <StatCard 
            icon={<Clock size={24} color="#ea580c" />} 
            title="Pending Transfers" 
            value="4" 
            sub="Waiting for Gen. Ward"
          />
        </div>

        {/* --- NEW: SINGLE ETU SATURATION GAUGE --- */}
        <div style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Live Unit Saturation</h2>
              <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>Overall pressure on the Emergency Unit</p>
            </div>
            <div style={{ textAlign: 'right' }}>
               <span style={{ fontSize: 32, fontWeight: 800, color: occupancyColor }}>{totalOccupancy}%</span>
               <span style={{ fontSize: 14, color: '#94a3b8', display: 'block' }}>Capacity Used</span>
            </div>
          </div>

          {/* Large Progress Bar */}
          <div style={{ position: 'relative', height: 24, background: '#f1f5f9', borderRadius: 999, marginBottom: 30, overflow: 'hidden' }}>
            
            {/* Background Markers for Safe/Warning/Critical Zones */}
            <div style={{ position: 'absolute', left: '60%', height: '100%', width: 2, background: '#fff', zIndex: 10 }}></div>
            <div style={{ position: 'absolute', left: '85%', height: '100%', width: 2, background: '#fff', zIndex: 10 }}></div>

            {/* The Fill Bar */}
            <div style={{ 
              width: `${totalOccupancy}%`, 
              height: '100%', 
              background: `linear-gradient(90deg, #10b981 0%, #f59e0b 60%, #ef4444 100%)`, 
              borderRadius: 999, 
              transition: 'width 1s ease-in-out' 
            }} />
          </div>

          {/* Legend / Scale */}
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
            <span>0% (Empty)</span>
            <span style={{ paddingLeft: 40 }}>60% (Busy)</span>
            <span style={{ paddingLeft: 40 }}>85% (Critical)</span>
            <span>100% (Full)</span>
          </div>

          {/* Action Recommendation Box */}
          {totalOccupancy > 85 && (
            <div style={{ marginTop: 24, background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 12, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ background: '#fff', padding: 8, borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                 <AlertTriangle size={20} color="#dc2626" />
              </div>
              <div>
                <h4 style={{ margin: 0, color: '#991b1b', fontSize: 15, fontWeight: 700 }}>Action Required: Activate Overflow Protocol</h4>
                <p style={{ margin: '4px 0 0 0', color: '#7f1d1d', fontSize: 13 }}>
                  Unit is above 85% capacity. Limit new non-critical admissions and expedite transfers.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
};

// --- Helper Components ---

const StatCard = ({ icon, title, value, sub }) => (
  <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <div style={{ 
      minWidth: 48, height: 48, borderRadius: 10, 
      background: '#f8fafc', 
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, color: '#64748b', fontSize: 13, fontWeight: 600 }}>{title}</p>
      <h3 style={{ margin: '4px 0', fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{value}</h3>
      {sub && <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>{sub}</p>}
    </div>
  </div>
);

export default BedDashboard;