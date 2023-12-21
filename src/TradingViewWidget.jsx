
import React, { useEffect, useRef } from 'react';
import styles from "../src/styles/styles.module.scss";
let tvScriptLoadingPromise;

export default function TradingViewWidget(props) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_d455e') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:"+props.currency,
            interval: "1",
            timezone: "Europe/Moscow",
            theme: "dark",
            style: "0",
            locale: "ru",
            enable_publishing: false,
            backgroundColor: "rgba(0, 0, 0, 1)",
            gridColor: "rgba(242, 242, 242, 0.06)",
            allow_symbol_change: true,
            container_id: "tradingview_d455e"
          });
        }
      }
    },
    []
  );

  return (
    <div className={styles.tradingviewWidgetContainer}>
      <div id='tradingview_d455e' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}
