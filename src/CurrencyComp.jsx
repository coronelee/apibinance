import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../src/styles/styles.module.scss";
import { FaLongArrowAltUp } from "react-icons/fa";
let array = [];
export default function CurrencyComp(Currency) {
  const [bitcoinPrice, setBitcoinPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price?symbol="+Currency.name
        );
        setBitcoinPrice(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };
    const interval = setInterval(fetchData, 1200);

    return () => {
      clearInterval(interval);
    };
  }, []);
  array[array.length] = bitcoinPrice;
  const color =
    bitcoinPrice > array.at(-3)
      ? "rgb(50,205,50)"
      : bitcoinPrice < array.at(-3)
      ? "rgb(240,128,128)"
      : "white";
  const deg =
    bitcoinPrice > array.at(-3)
      ? "rotate(0deg)"
      : bitcoinPrice < array.at(-3)
      ? "rotate(180deg)"
      : "rotate(90deg)";

  const [btcPriceChange, setBtcPriceChange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/24hr"
        );
        const btcTicker = response.data.find(
          (ticker) => ticker.symbol === Currency.name
        );

        const btcPriceChangePercent = parseFloat(btcTicker.priceChangePercent);
        const btcPriceChange = parseFloat(btcTicker.priceChange);

        setBtcPriceChange({
          percent: btcPriceChangePercent,
          value: btcPriceChange,
        });
      } catch (error) {
        console.error(error);
      }
    };
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
    fetchData();
  }, []);

  const numb = Number(bitcoinPrice);

  return (
    <>
      <div className={styles.price}>
        <div className={styles.price__header}>
          <span className={styles.currencyContainer}> 
          {Currency.name ? (
          <p>{Currency.name}</p>
        ) : (
          <p>Загрузка цены золота...</p>
        )}
          
          </span>
          <span className={styles.amount} style={{ color: color }}>
            {numb.toFixed(2)}
            <div className={styles.active} style={{ transform: deg }}>
              <FaLongArrowAltUp />
            </div>
          </span>
          <div>
            {btcPriceChange && (
              <div className={styles.currencyChangePrecentage}>
                <span
                  style={{
                    color:
                      btcPriceChange.percent > 0
                        ? "rgb(50,205,50)"
                        : "rgb(240,128,128)",
                  }}
                >
                  {btcPriceChange.percent}%
                </span>
                <span
                  style={{
                    color:
                      btcPriceChange.percent > 0
                        ? "rgb(50,205,50)"
                        : "rgb(240,128,128)",
                  }}
                >
                  {btcPriceChange.value}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
