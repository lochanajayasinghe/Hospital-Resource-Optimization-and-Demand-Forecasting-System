import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from './Layout';
import styles from './Forecast.module.css';

const data = [
  { name: 'Mon', historical: 40, predicted: 40 },
  { name: 'Tue', historical: 35, predicted: 36 },
  { name: 'Wed', historical: 50, predicted: 48 },
  { name: 'Thu', historical: null, predicted: 65 }, // Future start
  { name: 'Fri', historical: null, predicted: 70 },
  { name: 'Sat', historical: null, predicted: 55 },
  { name: 'Sun', historical: null, predicted: 45 },
];

const Forecast = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Future Demand Forecast</h1>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label className={styles.label} htmlFor="ward-select">Select Ward:</label>
              <select id="ward-select" aria-label="Select Ward" className={styles.select}>
                <option>ICU</option>
                <option>General</option>
                <option>Maternity</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.label} htmlFor="timeframe">Timeframe</label>
              <select id="timeframe" aria-label="Select Timeframe" className={styles.select}>
                <option>Next 14 Days</option>
                <option>Next 7 Days</option>
                <option>Next 30 Days</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.label} htmlFor="model">Model</label>
              <select id="model" aria-label="Select Model" className={styles.select}>
                <option>LSTM</option>
                <option>ARIMA</option>
                <option>XGBoost</option>
              </select>
            </div>
          </div>
        </div>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Bed Demand Prediction</h3>
            <div className={styles.cardSub}>Historical vs Predicted</div>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" align="left" />
                <Line type="monotone" dataKey="historical" stroke="#0ea5e9" strokeWidth={3} name="Historical Data" dot={false} />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={3} strokeDasharray="6 6" name="Predicted Demand" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            Forecast Details
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Predicted Demand</th>
                  <th>Lower Bound</th>
                  <th>Upper Bound</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Tomorrow</td><td>42</td><td>38</td><td>46</td></tr>
                <tr><td>+2 Days</td><td>45</td><td>40</td><td>51</td></tr>
                <tr><td>+3 Days</td><td>50</td><td>44</td><td>56</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Forecast;