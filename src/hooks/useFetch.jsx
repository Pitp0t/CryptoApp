import { useState, useEffect } from "react";

export default function useFetch() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState();

  const getCryptoData = async () => {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      if (!res.ok) setError("Network issue");
      const resJson = await res.json();

      setCryptoData(
        resJson.map((valor) => {
          return {
            id: valor.id,
            symbol: valor.symbol,
            name: valor.name,
            img: valor.image,
            price: valor.current_price.toFixed(5),
          };
        })
      );
      console.log("FETCHIING DATA");
    } catch (error) {
      console.log(error);
      return setError(error.message);
    }
  };

  return {
    getCryptoData,
    cryptoData,
    setCryptoData,
    error,
  };
}
