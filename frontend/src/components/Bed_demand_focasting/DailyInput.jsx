import React, { useState } from 'react';
import { ClipboardList, Calendar, Clock, Save, RotateCcw } from 'lucide-react'; // Ensure lucide-react is installed
import Layout from './Layout';
import styles from './DailyInput.module.css';

// ETU Pilot Zones
const ETU_ZONES = [
  'Triage Zone',
  'Resus (Critical)',
  'Observation Beds',
  'Isolation Area'
];

const DailyInput = () => {
  // State for Date & Shift
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [shift, setShift] = useState('Morning Shift (07:00 - 13:00)');
  
  // State for Data Rows (Added 'deaths' column)
  const [rows, setRows] = useState(() => 
    ETU_ZONES.map(() => ({ 
      admissions: 0, 
      discharges: 0, 
      transfersIn: 0, 
      transfersOut: 0,
      deaths: 0 
    }))
  );

  // Helper to update a single cell
  const updateCell = (index, field, value) => {
    const next = [...rows];
    // Ensure non-negative numbers
    const numValue = Math.max(0, Number(value) || 0);
    next[index] = { ...next[index], [field]: numValue };
    setRows(next);
  };

  // Auto-calculate Totals
  const totals = rows.reduce((acc, r) => {
    acc.admissions += r.admissions;
    acc.discharges += r.discharges;
    acc.transfersIn += r.transfersIn;
    acc.transfersOut += r.transfersOut;
    acc.deaths += r.deaths;
    return acc;
  }, { admissions: 0, discharges: 0, transfersIn: 0, transfersOut: 0, deaths: 0 });

  const handleClear = () => {
    if(window.confirm("Are you sure you want to clear all data?")) {
      setRows(ETU_ZONES.map(() => ({ 
        admissions: 0, discharges: 0, transfersIn: 0, transfersOut: 0, deaths: 0 
      })));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this sends data to your backend
    console.log('Submitting ETU Shift Data:', { date, shift, rows });
    alert(`Data saved for ${shift} on ${date}.\nTotal Arrivals: ${totals.admissions}`);
  };

  return (
    <Layout activePage="Daily Input">
      <div className={styles.container}>
        
        {/* Page Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>ETU Shift Data Entry</h1>
            <p className={styles.subtitle}>Log patient volume per zone for AI training</p>
          </div>
          <div className={styles.badge}>
            <ClipboardList size={18} />
            <span>Manual Entry</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.formCard} aria-label="Daily census form">
          
          {/* Controls Section (Date & Shift) */}
          <div className={styles.controlsGrid}>
            <div className={styles.controlGroup}>
              <label className={styles.label} htmlFor="census-date">
                <Calendar size={14} /> Date
              </label>
              <input 
                id="census-date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className={styles.input} 
              />
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.label} htmlFor="shift-select">
                <Clock size={14} /> Shift
              </label>
              <select 
                id="shift-select"
                value={shift} 
                onChange={(e) => setShift(e.target.value)} 
                className={styles.select}
              >
                <option>Morning Shift (07:00 - 13:00)</option>
                <option>Evening Shift (13:00 - 19:00)</option>
                <option>Night Shift (19:00 - 07:00)</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Zone Name</th>
                  <th>New Arrivals</th>
                  <th>Discharges (Home)</th>
                  <th>Transfers Out (Ward)</th>
                  <th>Deaths</th>
                </tr>
              </thead>
              <tbody>
                {ETU_ZONES.map((zone, i) => (
                  <tr key={zone}>
                    <td className={styles.wardName}>{zone}</td>
                    <td>
                      <input 
                        type="number" 
                        value={rows[i].admissions || ''} 
                        onChange={(e) => updateCell(i, 'admissions', e.target.value)} 
                        className={styles.numInput} 
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={rows[i].discharges || ''} 
                        onChange={(e) => updateCell(i, 'discharges', e.target.value)} 
                        className={styles.numInput} 
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={rows[i].transfersOut || ''} 
                        onChange={(e) => updateCell(i, 'transfersOut', e.target.value)} 
                        className={styles.numInput} 
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={rows[i].deaths || ''} 
                        onChange={(e) => updateCell(i, 'deaths', e.target.value)} 
                        className={`${styles.numInput} ${styles.dangerInput}`} 
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={styles.tfootRow}>
                  <td>Shift Totals</td>
                  <td>{totals.admissions}</td>
                  <td>{totals.discharges}</td>
                  <td>{totals.transfersOut}</td>
                  <td>{totals.deaths}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button type="button" onClick={handleClear} className={styles.btnGhost}>
              <RotateCcw size={16} /> Clear Form
            </button>
            <button type="submit" className={styles.btnPrimary}>
              <Save size={16} /> Submit Data
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DailyInput;