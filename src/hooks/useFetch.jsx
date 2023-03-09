import { useState, useEffect } from "react";

export default function useFetch() {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const resJson = await res.json();
    setCryptoData(resJson);
  };

  return {
    getCryptoData,
    cryptoData,
  };
}
