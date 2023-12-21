import React, { useEffect, useState } from "react";
import axios from "axios";

const GoldPrice = () => {
  
  
  const getGoldRate = () => {
    axios
      .get(
        "https://metals-api.com/api/latest?access_key=goldapi-4478j18lp39jpyg-io&base=USD&symbols=XAU"
      )
      .then((response) => {
        // const goldRate = response.data.rates.XAU;
        
        // console.log("Курс золота: ", goldRate);
        console.log(response.data.rates.XAU)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        {/* {goldRate ? (
          <p>Цена золота: {goldRate}</p>
        ) : (
          <p>Загрузка цены золота...</p>
        )} */}
      </div>
    </>
  );
};

export default GoldPrice;
