import React, { useEffect, useState, createContext } from "react";
import { nanoid } from "nanoid";
export const WalletContext = createContext();

const WalletPorvider = (props) => {
  const [carterasCreada, setCarterascreadas] = useState(JSON.parse(localStorage.getItem("wallets")) || []);
  const [calculoValor, setCalculoValor] = useState();

  //Info to
  const [value, setValue] = useState(0);
  const [selectedCoinData, setSelectedCoinData] = useState();

  //Info to edit
  const [selectedCoinDataEdit, setselectedCoinDataEdit] = useState();
  const [editedValue, setEditedValue] = useState();

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(carterasCreada));
  }, [carterasCreada]);

  function createWallet() {
    const newWallet = {
      id: nanoid(),
      balance: 2000,
      transactions: [
        // { id: nanoid(), fecha: "20/09/2023 18:54hs", venta: true, type: "btc", value: 0.2, quantity: 0.2 },
        // { id: nanoid(), fecha: "20/09/2023 18:54hs", venta: false, type: "eth", value: 0.2, quantity: 0.3 },
      ],
    };
    setCarterascreadas((prev) => [...prev, newWallet]);
  }

  function deleteWallet(id) {
    const filteredItems = carterasCreada.filter((valor) => valor.id !== id);
    setCarterascreadas(filteredItems);
  }

  function deleteTransaction(walletId, transactionId) {
    const carterasUpdateadas = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const prevTransaction = wallet.transactions.find((valor) => valor.id === transactionId);
        const newBalance = wallet.balance;
        const updatedTransactions = wallet.transactions.filter((transaction) => transaction.id !== transactionId);
        if (prevTransaction.venta) return { ...wallet, balance: newBalance - prevTransaction.value, transactions: updatedTransactions };
        if (!prevTransaction.venta) return { ...wallet, balance: newBalance + prevTransaction.value, transactions: updatedTransactions };
      }
      return wallet;
    });
    setCarterascreadas(carterasUpdateadas);
  }

  // COMPRAR/VENDER  TOMA LAS VARAIBLES DEL INPUT (VALOR) , EL TIPO DE MONEDA Y ACTUALIZA TODO EL OBJETO WALLETS(carterasCreada)

  function calculoPrecio() {
    if (selectedCoinData) {
      const calculoMonedaValor = value * selectedCoinData[0].price;
      return setCalculoValor(calculoMonedaValor);
    }
    return 0;
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
    const carterasUpdateadas = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const newBalance = wallet.balance - calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: calculoMonedaValor, quantity: value },
        ];
        return { ...wallet, balance: newBalance, transactions: updatedTransactions };
      }
      return wallet;
    });
    setValue(0);
    return setCarterascreadas(carterasUpdateadas);
  }

  function vender(walletId) {
    if (!selectedCoinData) return alert("Selecciona una moneda");
    if (!value) return alert("Selecciona un valor");
    if (value < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(value)) return alert("El valor debe ser un numero");
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = value * selectedCoinData[0].price;
    const typeOfCoin = selectedCoinData[0].symbol;
    if (!calculoMonedaValor || !typeOfCoin) return alert("Select value");
    const carterasUpdateadas = carterasCreada.map((wallet) => {
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
    return setCarterascreadas(carterasUpdateadas);
  }

  //EDITARCARTERAS//

  function editTransactionsVender(walletId, id) {
    if (!selectedCoinDataEdit) return;
    if (!editedValue) return alert("Selecciona un valor");
    if (editedValue < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(editedValue)) return alert("El valor debe ser un numero");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = editedValue * selectedCoinDataEdit[0].price;
    const typeOfCoin = selectedCoinDataEdit[0].symbol;

    const carterasUpdateadas = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const allPreviousTransaction = wallet.transactions.filter((valor) => valor.id !== id);

        const prevTransaction = wallet.transactions.find((valor) => valor.id === id);
        const newBalance = wallet.balance - prevTransaction.value;

        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: true, type: typeOfCoin, value: calculoMonedaValor, quantity: editedValue },
        ];

        return { ...wallet, balance: newBalance + calculoMonedaValor, transactions: updatedTransactions };
      }
      return wallet;
    });
    setEditedValue("");
    setselectedCoinDataEdit();
    return setCarterascreadas(carterasUpdateadas);
  }

  function editTransactionsComprar(walletId, id) {
    console.log("COMPRAR");

    if (!editedValue) return alert("Selecciona un valor");
    if (editedValue < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(editedValue)) return alert("El valor debe ser un numero");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = editedValue * selectedCoinDataEdit[0].price;
    const typeOfCoin = selectedCoinDataEdit[0].symbol;

    const carterasUpdateadas = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const allPreviousTransaction = wallet.transactions.filter((valor) => valor.id !== id);

        const prevTransaction = wallet.transactions.find((valor) => valor.id === id);
        const newBalance = wallet.balance + prevTransaction.value;

        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: calculoMonedaValor, quantity: editedValue },
        ];

        return { ...wallet, balance: newBalance - calculoMonedaValor, transactions: updatedTransactions };
      }
      return wallet;
    });

    setEditedValue("");
    setselectedCoinDataEdit();
    return setCarterascreadas(carterasUpdateadas);
  }

  return (
    <WalletContext.Provider
      value={{
        carterasCreada,
        deleteWallet,
        createWallet,
        editTransactionsComprar,
        editTransactionsVender,
        selectedCoinData,
        setSelectedCoinData,
        setValue,
        comprar,
        vender,
        value,
        setEditedValue,
        setselectedCoinDataEdit,
        editedValue,
        deleteTransaction,
        setCalculoValor,
        calculoPrecio,
        calculoValor,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletPorvider;
