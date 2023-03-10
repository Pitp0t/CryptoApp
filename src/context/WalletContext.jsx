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
      transactions: [
        { id: nanoid(), fecha: "20/09/2023 18:54hs", venta: true, type: "BTC", value: 0.2 },
        { id: nanoid(), fecha: "20/09/2023 18:54hs", venta: false, type: "ETH", value: 0.2 },
      ],
    };
    setCarterascreadas((prev) => [...prev, newWallet]);
  }

  function deleteWallet(id) {
    const filteredItems = carterasCreada.filter((valor) => valor.id !== id);
    setCarterascreadas(filteredItems);
  }

  function deleteTransaction(walletId, transactionId) {
    const updatedWallets = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const updatedTransactions = wallet.transactions.filter((transaction) => transaction.id !== transactionId);
        return { ...wallet, transactions: updatedTransactions };
      }
      return wallet;
    });

    console.log(updatedWallets);
    setCarterascreadas(updatedWallets);
  }

  return <WalletContext.Provider value={{ carterasCreada, deleteWallet, createWallet, deleteTransaction }}>{props.children}</WalletContext.Provider>;
};

export default WalletPorvider;
