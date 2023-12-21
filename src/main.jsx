import React from 'react'
import ReactDOM from 'react-dom/client'
import TradingViewWidget from './TradingViewWidget.jsx'
import './index.css'
import styles from '../src/styles/styles.module.scss'
import CurrencyComp from './CurrencyComp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className={styles.container}>
      <div className={styles.priceWrapper}>
        <CurrencyComp name="BTCUSDT" />
        <CurrencyComp name="ETHUSDT" />
        <CurrencyComp name="USDTRUB" />
        <CurrencyComp name="SOLUSDT" />  
      </div>
      <div className={styles.widget}>
        <TradingViewWidget currency="BTCUSDT"/>
      </div>
    </div>

   
  </React.StrictMode>,
)

