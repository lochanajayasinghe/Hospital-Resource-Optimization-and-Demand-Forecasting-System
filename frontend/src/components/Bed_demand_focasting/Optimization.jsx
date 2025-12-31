import React, { useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Building, 
  BedDouble, 
  Truck, 
  BrainCircuit 
} from 'lucide-react';
import Layout from './Layout';
import styles from './Optimization.module.css';

const Optimization = () => {
  // --- MOCK MILP ENGINE STATE ---
  // In a real app, these come from your Python backend
  const [currentRisk, setCurrentRisk] = useState('High'); // Low, Medium, High, Critical
  
  // The 3 Steps of your MILP logic
  const steps = [
    { 
      id: 1, 
      title: 'Internal Reallocation', 
      desc: 'Move beds/staff between zones', 
      status: 'Active', 
      icon: BedDouble,
      color: 'blue'
    },
    { 
      id: 2, 
      title: 'Surge Capacity', 
      desc: 'Open overflow areas (e.g., Corridor B)', 
      status: 'Active', 
      icon: Building,
      color: 'orange'
    },
    { 
      id: 3, 
      title: 'External Transfer', 
      desc: 'Transfer stable patients to nearby hospitals', 
      status: 'Inactive', // Only active if Step 1 & 2 fail
      icon: Truck,
      color: 'gray'
    },
  ];

  // Specific Actions recommended by MILP
  const recommendations = [
    {
      id: 'REC-001',
      step: 1,
      type: 'Reallocation',
      msg: 'Move 2 "Observation" beds to "Resus" zone temporarily.',
      impact: 'Reduces Resus overload probability by 40%.',
      priority: 'High'
    },
    {
      id: 'REC-002',
      step: 2,
      type: 'Surge',
      msg: 'Activate "Surge Area B" (Corridor) for 3 Triage patients.',
      impact: 'Clears Triage backlog immediately.',
      priority: 'Medium'
    }
  ];

  return (
    <Layout activePage="Optimization">
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Optimization Engine</h1>
            <p className={styles.subtitle}>MILP-Driven Decision Support System</p>
          </div>
          <div className={styles.modelBadge}>
            <BrainCircuit size={18} />
            <span>MILP Model: Online</span>
          </div>
        </div>

        {/* --- SECTION 1: SYSTEM STATUS & FORECAST --- */}
        <div className={styles.statusCard}>
          <div className={styles.statusLeft}>
            <div className={styles.pulseContainer}>
              <div className={styles.pulseRing}></div>
              <Activity size={24} color="#dc2626" className={styles.pulseIcon} />
            </div>
            <div>
              <h3 className={styles.statusTitle}>Current ETU Load: Critical</h3>
              <p className={styles.statusDesc}>
                LSTM Model predicts demand capacity in <strong>2 Hours</strong>.
                <br/>Optimization Protocol Activated.
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE 3-STEP PROTOCOL VISUALIZATION --- */}
        <h3 className={styles.sectionTitle}>Optimization Strategy (MILP Logic)</h3>
        <div className={styles.strategyGrid}>
          {steps.map((step, index) => (
            <div key={step.id} className={`${styles.stepCard} ${styles[step.status.toLowerCase()]}`}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>Step 0{step.id}</span>
                {step.status === 'Active' && <span className={styles.activeBadge}>Active</span>}
              </div>
              
              <div className={styles.iconCircle} style={{backgroundColor: step.status === 'Active' ? '#eff6ff' : '#f3f4f6'}}>
                <step.icon size={24} color={step.status === 'Active' ? '#2563eb' : '#9ca3af'} />
              </div>

              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <ArrowRight size={20} color="#cbd5e1" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- SECTION 3: MILP RECOMMENDATIONS --- */}
        <h3 className={styles.sectionTitle}>Generated Actions</h3>
        <div className={styles.recGrid}>
          {recommendations.map((rec) => (
            <div key={rec.id} className={styles.recCard}>
              <div className={styles.recHeader}>
                <span className={`${styles.priorityBadge} ${rec.priority === 'High' ? styles.highPrio : styles.medPrio}`}>
                  {rec.priority} Priority
                </span>
                <span className={styles.stepTag}>Step {rec.step} Strategy</span>
              </div>
              
              <div className={styles.recContent}>
                <h4 className={styles.recMsg}>{rec.msg}</h4>
                <div className={styles.impactBox}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span><strong>Impact:</strong> {rec.impact}</span>
                </div>
              </div>

              <div className={styles.recActions}>
                <button className={styles.btnApprove}>Approve Action</button>
                <button className={styles.btnAnalyze}>Simulate Impact</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default Optimization;