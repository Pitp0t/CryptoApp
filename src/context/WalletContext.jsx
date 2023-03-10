import React, { useEffect, useState, createContext } from "react";
import { nanoid } from "nanoid";

export const WalletContext = createContext();

const WalletPorvider = (props) => {
  const [carterasCreada, setCarterascreadas] = useState(JSON.parse(localStorage.getItem("wallets")) || []);

  useEffect(() => {
    console.log("LOCAL USEEFFECT");
    localStorage.setItem("wallets", JSON.stringify(carterasCreada));
  }, [carterasCreada]);

  function createWallet() {
    const newWallet = {
      id: nanoid(),
      activos: ["BTC", "ETH"],
      initialUsd: 2000,
      transactions: [],
    };
    setCarterascreadas((prev) => [...prev, newWallet]);
  }

  const deleteWallet = (id) => {
    console.log(id);
    const filteredItems = carterasCreada.filter((valor) => valor.id !== id);
    setCarterascreadas(filteredItems);
  };

  return <WalletContext.Provider value={{ carterasCreada, deleteWallet, createWallet }}>{props.children}</WalletContext.Provider>;
};

export default WalletPorvider;
