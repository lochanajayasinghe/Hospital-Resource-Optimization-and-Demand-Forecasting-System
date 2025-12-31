import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { AlertTriangle } from 'lucide-react';
import Layout from './Layout';
import styles from './Trends.module.css';

const Trends = () => {
  const [timeframe, setTimeframe] = useState('Next Shift');
  const [chartData, setChartData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    let data = [];
    let heat = [];

    // --- LOGIC 1: NEXT SHIFT (Granularity: Shift-by-Shift) ---
    // Shows Day Shift vs Night Shift
    if (timeframe === 'Next Shift') {
      data = [
        { name: 'Dec 30 (Night)', Triage: 40, Resus: 5, Obs: 15 },
        { name: 'Dec 31 (Day)', Triage: 35, Resus: 4, Obs: 12 },
        { name: 'Dec 31 (Night)', Triage: 55, Resus: 8, Obs: 18 }, // The "Next Shift"
        { name: 'Jan 01 (Day)', Triage: 30, Resus: 3, Obs: 10 },
      ];
      heat = [
        { label: 'Dec 30 (Night)', risk: 'Medium' },
        { label: 'Dec 31 (Day)', risk: 'Low' },
        { label: 'Dec 31 (Night)', risk: 'Critical' },
        { label: 'Jan 01 (Day)', risk: 'Low' },
      ];
    } 
    
    // --- LOGIC 2: NEXT DAY (Granularity: Daily Totals) ---
    // Shows Whole Day Counts (Day + Night combined)
    else if (timeframe === 'Next Day') {
      data = [
        { name: 'Dec 29', Triage: 70, Resus: 8, Obs: 25 },
        { name: 'Dec 30', Triage: 65, Resus: 6, Obs: 22 },
        { name: 'Dec 31', Triage: 90, Resus: 12, Obs: 30 }, // High predicted load
        { name: 'Jan 01', Triage: 60, Resus: 5, Obs: 20 },
      ];
      heat = [
        { label: 'Dec 29', risk: 'Medium' },
        { label: 'Dec 30', risk: 'Low' },
        { label: 'Dec 31', risk: 'Critical' },
        { label: 'Jan 01', risk: 'Low' },
      ];
    } 
    
    // --- LOGIC 3: NEXT MONTH (Granularity: Monthly Totals) ---
    // Shows Month-by-Month Counts
    else {
      data = [
        { name: 'Jan', Triage: 2100, Resus: 150, Obs: 800 },
        { name: 'Feb', Triage: 1800, Resus: 120, Obs: 750 },
        { name: 'Mar', Triage: 2500, Resus: 250, Obs: 1100 }, // Seasonal Spike
        { name: 'Apr', Triage: 1900, Resus: 140, Obs: 850 },
      ];
      heat = [
        { label: 'Jan', risk: 'Medium' },
        { label: 'Feb', risk: 'Low' },
        { label: 'Mar', risk: 'Critical' },
        { label: 'Apr', risk: 'Medium' },
      ];
    }

    setChartData(data);
    setHeatmapData(heat);
  }, [timeframe]);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Critical': return '#ef4444'; 
      case 'High': return '#f97316';     
      case 'Medium': return '#eab308';   
      default: return '#22c55e';         
    }
  };

  return (
    <Layout activePage="Trends">
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Predicted ETU Patterns</h1>
            <p style={{color: '#64748b', margin: '4px 0 0 0', fontSize: '14px'}}>
               Analyze future risk intensity for roster planning
            </p>
          </div>

          <div className={styles.controls}>
            <label className={styles.label} htmlFor="time-range">Time Range:</label>
            <select 
              id="time-range" 
              className={styles.select} 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option>Next Shift</option>
              <option>Next Day</option>
              <option>Next Month</option>
            </select>
          </div>
        </div>

        {/* --- CHART SECTION --- */}
        <section className={styles.card}>
          <div className={styles.centerTitle}>
            <h3 style={{fontSize:16, fontWeight:600, color:'#334155', margin:0}}>
               Zone Comparison Trend
            </h3>
            <span style={{fontSize:12, color:'#94a3b8'}}>
              {timeframe === 'Next Shift' ? '(Shift-by-Shift Breakdown)' : 
               timeframe === 'Next Day' ? '(Daily Total Breakdown)' : 
               '(Monthly Breakdown)'}
            </span>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 24, left: 12, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6eef6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 12 }} 
                  dy={10} 
                  interval={0}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }} />
                <Legend verticalAlign="top" align="right" />
                
                <Line type="monotone" dataKey="Triage" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="Triage (Waiting)" />
                <Line type="monotone" dataKey="Resus" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Resus (Critical)" />
                <Line type="monotone" dataKey="Obs" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} name="Observation" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* --- HEATMAP SECTION --- */}
        <section className={styles.card}>
          <div className={styles.heatmapHeader}>
            <h4 style={{fontSize:15, fontWeight:600, color:'#334155', margin:0}}>Risk Intensity Heatmap</h4>
            <div className={styles.legend}>
              <span className={styles.legendItem}><span className={styles.dot} style={{background: '#ef4444'}}></span> Critical</span>
              <span className={styles.legendItem}><span className={styles.dot} style={{background: '#f97316'}}></span> High</span>
              <span className={styles.legendItem}><span className={styles.dot} style={{background: '#eab308'}}></span> Medium</span>
              <span className={styles.legendItem}><span className={styles.dot} style={{background: '#22c55e'}}></span> Low</span>
            </div>
          </div>

          <div className={styles.heatmapGrid}>
            {heatmapData.map((item, index) => (
              <div key={index} className={styles.heatItem}>
                <div 
                  className={styles.heatBox} 
                  style={{ backgroundColor: getRiskColor(item.risk) }}
                >
                  {item.risk}
                </div>
                <span className={styles.heatLabel}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.insightBox}>
            <AlertTriangle size={18} className={styles.alertIcon} />
            <p>
              <strong>Roster Recommendation:</strong> 
              {timeframe === 'Next Shift' 
                ? ' High load expected for Night Shift. Approve overtime for 2 staff members.'
                : timeframe === 'Next Day'
                ? ' Critical load predicted for Dec 31. Ensure all zones are fully staffed.'
                : ' March shows seasonal spike. Plan staff leave accordingly.'
              }
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Trends;