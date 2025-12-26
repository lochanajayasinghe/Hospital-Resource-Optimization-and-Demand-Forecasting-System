import React from 'react';
import { Users, BedDouble, AlertTriangle, TrendingDown } from 'lucide-react';

const BedDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<BedDouble />} title="Total Beds" value="500" color="bg-blue-500" />
        <StatCard icon={<Users />} title="Occupied" value="425 (85%)" color="bg-emerald-500" />
        <StatCard icon={<TrendingDown />} title="Predicted Inflow" value="+45 Today" color="bg-orange-500" />
        <StatCard icon={<AlertTriangle />} title="Active Alerts" value="3 Critical" color="bg-red-500" />
      </div>

      {/* Ward Status Bars */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Real-Time Ward Capacity</h2>
        <div className="space-y-4">
          <ProgressBar label="ICU Ward" percent={92} color="bg-red-500" />
          <ProgressBar label="General Ward" percent={45} color="bg-emerald-500" />
          <ProgressBar label="Emergency" percent={65} color="bg-yellow-500" />
          <ProgressBar label="Maternity" percent={30} color="bg-emerald-500" />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-xl shadow-md flex items-center space-x-4`}>
    <div className="p-3 bg-white/20 rounded-full">{icon}</div>
    <div>
      <p className="text-sm opacity-90">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

const ProgressBar = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-slate-500">{percent}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-4">
      <div className={`${color} h-4 rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default BedDashboard;