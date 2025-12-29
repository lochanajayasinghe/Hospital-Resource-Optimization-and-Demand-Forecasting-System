import React from 'react';
import { 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import Layout from './Layout';
import styles from './Forecast.module.css';

// Updated data to include 'ci' (Confidence Interval) for the shaded area
const data = [
  { name: 'Mon', historical: 40, predicted: null, range: null },
  { name: 'Tue', historical: 35, predicted: null, range: null },
  { name: 'Wed', historical: 50, predicted: null, range: null },
  { name: 'Thu', historical: 50, predicted: 50, range: [50, 50] }, // Connecting point
  { name: 'Fri', historical: null, predicted: 65, range: [60, 70] },
  { name: 'Sat', historical: null, predicted: 70, range: [62, 78] },
  { name: 'Sun', historical: null, predicted: 55, range: [45, 65] },
  { name: 'Mon', historical: null, predicted: 45, range: [35, 55] },
];

const Forecast = () => {
  return (
    <Layout>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Future Demand Forecast</h1>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <span className={styles.label}>Select Ward:</span>
              <select className={styles.select}>
                <option>ICU</option>
                <option>General</option>
                <option>Maternity</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <span className={styles.label}>Timeframe:</span>
              <select className={styles.select}>
                <option>Next 14 Days</option>
                <option>Next 7 Days</option>
                <option>Next 30 Days</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <span className={styles.label}>Model:</span>
              <select className={styles.select}>
                <option>LSTM</option>
                <option>ARIMA</option>
                <option>XGBoost</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Chart Card */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Bed Demand Prediction</h3>
            <span className={styles.cardSub}>Historical vs Predicted</span>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }}/>
                
                {/* Confidence Interval Area */}
                <Area 
                  type="monotone" 
                  dataKey="range" 
                  stroke="none" 
                  fill="url(#colorCi)" 
                  name="Confidence Range"
                />

                {/* Historical Line (Solid Blue) */}
                <Line 
                  type="monotone" 
                  dataKey="historical" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }}
                  name="Historical Data" 
                />

                {/* Predicted Line (Dashed Orange) */}
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#f97316" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} 
                  name="Predicted Demand" 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Forecast Details Table */}
        <section className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Forecast Details</h3>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Predicted Demand</th>
                  <th>Lower Bound</th>
                  <th>Upper Bound</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tomorrow</td>
                  <td className={styles.bold}>65 Beds</td>
                  <td className={styles.subtle}>60</td>
                  <td className={styles.subtle}>70</td>
                </tr>
                <tr>
                  <td>+2 Days</td>
                  <td className={styles.bold}>70 Beds</td>
                  <td className={styles.subtle}>62</td>
                  <td className={styles.subtle}>78</td>
                </tr>
                <tr>
                  <td>+3 Days</td>
                  <td className={styles.bold}>55 Beds</td>
                  <td className={styles.subtle}>45</td>
                  <td className={styles.subtle}>65</td>
                </tr>
                <tr>
                  <td>+4 Days</td>
                  <td className={styles.bold}>45 Beds</td>
                  <td className={styles.subtle}>35</td>
                  <td className={styles.subtle}>55</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Forecast;