import React, { useEffect, useState, createContext } from "react";
import { nanoid } from "nanoid";
export const WalletContext = createContext();

const WalletPorvider = (props) => {
  const [carterasCreada, setCarterascreadas] = useState(JSON.parse(localStorage.getItem("wallets")) || []);
  const [selectedCoinData, setSelectedCoinData] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(carterasCreada));
  }, [carterasCreada]);

  function createWallet() {
    const newWallet = {
      id: nanoid(),
      balance: 2000,
      transactions: [
        { id: nanoid(), fecha: "20/09/2023 18:54hs", venta: true, type: "BTC", value: 0.2, quantity: 0.2 },
        { id: nanoid(), fecha: "20/09/2023 18:54hs", venta: false, type: "ETH", value: 0.2, quantity: 0.3 },
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
    setCarterascreadas(updatedWallets);
  }

  function comprar(walletId) {
    if (!selectedCoinData) return alert("Selecciona una moneda");
    if (!value) return alert("Selecciona un valor");
    if (value < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(value)) alert("El valor debe ser un numero");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = value * selectedCoinData[0].price;
    const typeOfCoin = selectedCoinData[0].symbol;

    const updatedWallets = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const newBalance = wallet.balance + calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: true, type: typeOfCoin, value: calculoMonedaValor, quantity: value },
        ];
        return { ...wallet, balance: newBalance, transactions: updatedTransactions };
      }
      return wallet;
    });

    setValue(0);
    setSelectedCoinData();
    setCarterascreadas(updatedWallets);
  }

  function vender(walletId) {
    if (!selectedCoinData) return alert("Selecciona una moneda");
    if (!value) return alert("Selecciona un valor");
    if (value < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(value)) alert("El valor debe ser un numero");
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = value * selectedCoinData[0].price;
    const typeOfCoin = selectedCoinData[0].symbol;
    if (!calculoMonedaValor || !typeOfCoin) return alert("Select value");

    const updatedWallets = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const newBalance = wallet.balance - calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: -calculoMonedaValor, quantity: value },
        ];
        return { ...wallet, balance: newBalance, transactions: updatedTransactions };
      }
      return wallet;
    });
    setValue();
    setSelectedCoinData();
    setCarterascreadas(updatedWallets);
  }

  function editTransactions() {}

  return (
    <WalletContext.Provider
      value={{ carterasCreada, deleteWallet, createWallet, deleteTransaction, selectedCoinData, setSelectedCoinData, setValue, comprar, vender, value }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletPorvider;
