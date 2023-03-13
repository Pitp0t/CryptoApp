import React, { useEffect, useState, createContext } from "react";
import { nanoid } from "nanoid";
export const WalletContext = createContext();

const WalletPorvider = (props) => {
  const [carterasCreada, setCarterascreadas] = useState(JSON.parse(localStorage.getItem("wallets")) || []);

  //Info to
  const [value, setValue] = useState();
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
    const updatedWallets = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const updatedTransactions = wallet.transactions.filter((transaction) => transaction.id !== transactionId);
        return { ...wallet, transactions: updatedTransactions };
      }
      return wallet;
    });
    setCarterascreadas(updatedWallets);
  }

  // COMPRAR/VENDER  TOMA LAS VARAIBLES DEL INPUT (VALOR) , EL TIPO DE MONEDA Y ACTUALIZA TODO EL OBJETO WALLETS(carterasCreada)

  function comprar(walletId) {
    console.log("COMRPAR");

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
        const newBalance = wallet.balance - calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: true, type: typeOfCoin, value: calculoMonedaValor, quantity: value },
        ];
        return { ...wallet, balance: newBalance, transactions: updatedTransactions };
      }
      return wallet;
    });
    setValue();
    setSelectedCoinData();
    setCarterascreadas(updatedWallets);
  }

  function vender(walletId) {
    console.log("VENDER");

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

    setValue();
    setSelectedCoinData();
    setCarterascreadas(updatedWallets);
  }

  function editTransactionsVender(walletId, id) {
    console.log("EDITAR");

    if (!editedValue) return alert("Selecciona un valor");
    if (editedValue < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(editedValue)) return alert("El valor debe ser un numero");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = editedValue * selectedCoinDataEdit[0].price;
    const typeOfCoin = selectedCoinDataEdit[0].symbol;

    console.log(calculoMonedaValor);
    console.log(typeOfCoin);

    const updatedWallets = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const newBalance = wallet.balance + calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: -calculoMonedaValor, quantity: editedValue },
        ];
        return { ...wallet, balance: newBalance, transactions: updatedTransactions };
      }
      return wallet;
    });

    setEditedValue("");
    setselectedCoinDataEdit();
    setCarterascreadas(updatedWallets);
  }

  function editTransactionsComprar(walletId, id) {
    console.log("EDITAR");

    if (!editedValue) return alert("Selecciona un valor");
    if (editedValue < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(editedValue)) return alert("El valor debe ser un numero");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    const calculoMonedaValor = editedValue * selectedCoinDataEdit[0].price;
    const typeOfCoin = selectedCoinDataEdit[0].symbol;

    console.log(calculoMonedaValor);
    console.log(typeOfCoin);

    const updatedWallets = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const newBalance = wallet.balance - calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: -calculoMonedaValor, quantity: editedValue },
        ];
        return { ...wallet, balance: newBalance, transactions: updatedTransactions };
      }
      return wallet;
    });

    setEditedValue("");
    setselectedCoinDataEdit();
    setCarterascreadas(updatedWallets);
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
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletPorvider;
