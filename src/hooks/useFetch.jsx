import { useState, useCallback } from "react";

export default function useFetch() {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_COINGECKO = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const getCryptoData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_COINGECKO);
      if (!res.ok) {
        throw new Error("Network issue");
      }
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
      console.log("FETCHING DATA");
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getCryptoData,
    cryptoData,
    isLoading,
    error,
  };
}
