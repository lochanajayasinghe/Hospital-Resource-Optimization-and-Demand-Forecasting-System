import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Filter, Bed } from 'lucide-react';
import Layout from './Layout';
import styles from './Inventory.module.css';

const BedInventory = () => {
  // --- ETU PILOT DATA ---
  const [beds] = useState([
    { id: 'BED-101', zone: 'Resus (Critical)', type: 'Trauma Bed', status: 'Occupied', patient: 'P-902' },
    { id: 'BED-102', zone: 'Resus (Critical)', type: 'Trauma Bed', status: 'Available', patient: '-' },
    { id: 'OBS-001', zone: 'Observation', type: 'Standard Bed', status: 'Occupied', patient: 'P-884' },
    { id: 'OBS-002', zone: 'Observation', type: 'Standard Bed', status: 'Cleaning', patient: '-' },
    { id: 'OBS-003', zone: 'Observation', type: 'Standard Bed', status: 'Available', patient: '-' },
    { id: 'ISO-001', zone: 'Isolation', type: 'Negative Pressure', status: 'Maintenance', patient: '-' },
    { id: 'TRI-010', zone: 'Triage', type: 'Stretcher', status: 'Occupied', patient: 'P-911' },
    { id: 'TRI-011', zone: 'Triage', type: 'Stretcher', status: 'Available', patient: '-' },
  ]);

  // --- FILTER STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterZone, setFilterZone] = useState('All Zones');
  const [filterStatus, setFilterStatus] = useState('All Statuses'); // Added this

  // --- PERFECTED FILTERING LOGIC ---
  const filteredBeds = beds.filter(bed => {
    // 1. Search Logic (Case insensitive)
    const matchesSearch = bed.id.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Zone Logic (Exact match or 'All')
    const matchesZone = filterZone === 'All Zones' || bed.zone === filterZone;

    // 3. Status Logic (Exact match or 'All')
    const matchesStatus = filterStatus === 'All Statuses' || bed.status === filterStatus;

    // Return true only if ALL conditions match
    return matchesSearch && matchesZone && matchesStatus;
  });

  return (
    <Layout activePage="Bed Inventory">
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.title}>Real-Time Bed Status</h1>
              <p className={styles.subtitle}>Track physical assets across ETU Zones</p>
            </div>
            <button className={styles.addBtn} aria-label="Add new bed">
              <Plus size={18} />
              <span>Add New Bed</span>
            </button>
          </div>
        </div>

        {/* --- CONTROLS --- */}
        <div className={styles.controls} role="region" aria-label="Inventory filters">
          
          {/* Search Bar */}
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Bed ID..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Group */}
          <div className={styles.filterGroup}>
            
            {/* Zone Filter */}
            <div className={styles.selectWrap}>
              <Filter size={14} className={styles.filterIcon} />
              <select 
                className={styles.select} 
                aria-label="Zone filter"
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
              >
                <option value="All Zones">All Zones</option>
                <option value="Resus (Critical)">Resus (Critical)</option>
                <option value="Observation">Observation</option>
                <option value="Triage">Triage</option>
                <option value="Isolation">Isolation</option>
              </select>
            </div>

            {/* Status Filter (Now Working) */}
            <select 
              className={styles.select} 
              aria-label="Status filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className={styles.tableCard}>
          <table>
            <thead>
              <tr>
                <th>Bed ID</th>
                <th>Zone Location</th>
                <th>Bed Type</th>
                <th>Patient ID</th>
                <th>Status</th>
                <th className={styles.actionsCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeds.length > 0 ? (
                filteredBeds.map((bed, index) => (
                  <tr key={index}>
                    <td className={styles.bedIdCell}>
                      <Bed size={16} className={styles.bedIcon} />
                      {bed.id}
                    </td>
                    <td className={styles.textCell}>{bed.zone}</td>
                    <td className={styles.textCell}>{bed.type}</td>
                    <td className={styles.monoCell}>{bed.patient}</td>
                    <td>
                      <StatusBadge status={bed.status} />
                    </td>
                    <td className={styles.actionsCell}>
                      <button className={styles.iconBtn} aria-label={`More actions for ${bed.id}`}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '24px', color: '#64748b'}}>
                    No beds found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className={styles.pagination}>
            <span>Showing {filteredBeds.length} of {beds.length} beds</span>
            <div className={styles.pageGroup}>
              <button className={styles.pageBtn} disabled>Previous</button>
              <button className={styles.pageBtn}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// --- HELPER COMPONENT ---
const StatusBadge = ({ status }) => {
  const map = {
    Available: 'badgeAvailable',
    Occupied: 'badgeOccupied',
    Cleaning: 'badgeCleaning',
    Maintenance: 'badgeMaintenance'
  };

  const cls = styles[map[status] || 'badgeDefault'];
  
  return (
    <span className={`${styles.badge} ${cls}`}>
      {status}
    </span>
  );
};

export default BedInventory;