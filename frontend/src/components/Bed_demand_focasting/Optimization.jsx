import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Users, 
  BedDouble, 
  ArrowRight, 
  Play, 
  Activity 
} from 'lucide-react';
import Layout from './Layout';
import styles from './Optimization.module.css';

const Optimization = () => {
  // --- STATE FOR SIMULATION ---
  const [simQuantity, setSimQuantity] = useState(2);
  const [simResource, setSimResource] = useState('Nurses');
  const [simZone, setSimZone] = useState('Triage');
  const [simResult, setSimResult] = useState(null);

  // --- MOCK SIMULATION LOGIC ---
  const runSimulation = () => {
    // This simulates the "MILP" model calculating the result
    let impactText = "";
    let impactColor = "green";

    if (simResource === 'Nurses' && simZone === 'Triage') {
      impactText = `Wait time reduces by ${simQuantity * 15} minutes.`;
    } else if (simResource === 'Beds' && simZone === 'Observation') {
      impactText = `Overcrowding risk drops by ${simQuantity * 8}%.`;
    } else if (simResource === 'Doctors' && simZone === 'Resus') {
      impactText = `Critical response speed improves by ${simQuantity * 10}%.`;
    } else {
      impactText = "Resource efficiency improves by 5%.";
    }

    setSimResult(impactText);
  };

  return (
    <Layout activePage="Optimization">
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Resource Optimization</h1>
            <p className={styles.subtitle}>AI-Driven Recommendations & Simulation Engine</p>
          </div>
          <div className={styles.badge}>
            <Activity size={16} />
            <span>MILP Model Active</span>
          </div>
        </div>

        {/* --- SECTION 1: CRITICAL ALERT BANNER --- */}
        <section className={styles.alertBanner}>
          <div className={styles.alertContent}>
            <div className={styles.alertIconWrapper}>
              <AlertTriangle size={24} color="#dc2626" />
            </div>
            <div>
              <h3 className={styles.alertTitle}>CRITICAL ALERT: Resus Capacity at Risk</h3>
              <p className={styles.alertText}>
                Predicted surge in <strong>3 hours</strong> will exceed Resus beds. 
                <br />
                <strong>Recommendation:</strong> Move 2 stable patients from Resus to Observation immediately.
              </p>
            </div>
          </div>
          <div className={styles.alertActions}>
            <button className={styles.btnApprove}>
              <CheckCircle size={16} /> Approve Transfer
            </button>
            <button className={styles.btnIgnore}>
              <XCircle size={16} /> Ignore
            </button>
          </div>
        </section>

        {/* --- SECTION 2: RECOMMENDATION CARDS --- */}
        <div className={styles.grid}>
          
          {/* Card 1: Staffing */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.blueIcon}`}>
                <Users size={20} />
              </div>
              <h3 className={styles.cardTitle}>Staffing Suggestion</h3>
            </div>
            <p className={styles.cardText}>
              High Triage load expected tonight (20:00 - 23:00).
              <br/>
              <strong>Action:</strong> Call in <strong>1 On-Call Nurse</strong> to assist Triage.
            </p>
            <button className={styles.btnActionBlue}>
              Acknowledge & Notify
            </button>
          </section>

          {/* Card 2: Bed Allocation */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.purpleIcon}`}>
                <BedDouble size={20} />
              </div>
              <h3 className={styles.cardTitle}>Bed Allocation</h3>
            </div>
            <p className={styles.cardText}>
              Observation Zone has 4 spare beds, but Triage is full.
              <br/>
              <strong>Action:</strong> Convert <strong>2 Obs Beds</strong> to "Fast Track" seats temporarily.
            </p>
            <button className={styles.btnActionPurple}>
              Reallocate Beds
            </button>
          </section>

        </div>

        {/* --- SECTION 3: INTERACTIVE SIMULATION --- */}
        <section className={styles.simulationCard}>
          <div className={styles.simHeader}>
            <h3 className={styles.simTitle}>"What-If" Simulation Tool</h3>
            <p className={styles.simSub}>Test scenarios to see predicted impact on ETU performance.</p>
          </div>

          <div className={styles.simControls}>
            <span className={styles.simLabel}>What if we add</span>
            
            {/* Input: Quantity */}
            <input 
              type="number" 
              min="1" 
              max="10"
              className={styles.simInput} 
              value={simQuantity}
              onChange={(e) => setSimQuantity(e.target.value)}
            />

            {/* Input: Resource Type */}
            <select 
              className={styles.simSelect}
              value={simResource}
              onChange={(e) => setSimResource(e.target.value)}
            >
              <option value="Nurses">Nurses</option>
              <option value="Doctors">Doctors</option>
              <option value="Beds">Beds</option>
            </select>

            <span className={styles.simLabel}>to</span>

            {/* Input: Zone */}
            <select 
              className={styles.simSelect}
              value={simZone}
              onChange={(e) => setSimZone(e.target.value)}
            >
              <option value="Triage">Triage Zone</option>
              <option value="Resus">Resus Zone</option>
              <option value="Observation">Observation</option>
            </select>

            <span className={styles.simLabel}>?</span>

            <button className={styles.btnSimulate} onClick={runSimulation}>
              <Play size={16} fill="white" /> Run Simulation
            </button>
          </div>

          {/* Result Output */}
          {simResult && (
            <div className={styles.simResultBox}>
              <div className={styles.simResultHeader}>
                <ArrowRight size={20} className={styles.arrowIcon} />
                <strong>Predicted Impact:</strong>
              </div>
              <p className={styles.resultText}>{simResult}</p>
            </div>
          )}

        </section>

      </div>
    </Layout>
  );
};

export default Optimization;