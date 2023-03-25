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
      name: "Cartera",
      id: nanoid(),
      total: 0,
      coins: [],
      balance: 2000,
      transactions: [],
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
        // const prevTransaction = wallet.transactions.find((valor) => valor.id === transactionId);
        // const newBalance = wallet.balance;
        const updatedTransactions = wallet.transactions.filter((transaction) => transaction.id !== transactionId);
        return { ...wallet, transactions: updatedTransactions };
        // if (!prevTransaction.venta) return { ...wallet, transactions: updatedTransactions };
      }
      return wallet;
    });
    setCarterascreadas(carterasUpdateadas);
  }

  // COMPRAR/VENDER  TOMA LAS VARAIBLES DEL INPUT (VALOR) , EL TIPO DE MONEDA Y ACTUALIZA TODO EL OBJETO WALLETS(carterasCreada)

  function calculoPrecio() {
    if (selectedCoinData) {
      const calculoMonedaValor = value * selectedCoinData[0].price;
      if (calculoMonedaValor < 0) return setCalculoValor(0);
      return setCalculoValor(calculoMonedaValor);
    }
    return 0;
  }

  function editarCartera(newName, id) {
    if (!isNaN(newName)) return alert("Seleccioná un valor valido");
    if (newName.length > 12) return alert("El nombre debe tener menos de 9 caracteres");
    const carteraModificada = carterasCreada.map((wallet) => {
      if (wallet.id === id) {
        return { ...wallet, name: newName };
      }
      return wallet;
    });
    setCarterascreadas(carteraModificada);
  }

  function comprar(walletId) {
    if (!selectedCoinData) return alert("Selecciona una moneda");
    if (!value) return alert("Selecciona un valor");
    if (value < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(value)) return alert("El valor debe ser un numero");

    // const walletSelected = carterasCreada.find((valor) => valor.id === walletId);
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;

    const calculoMonedaValor = value * selectedCoinData[0].price;

    const typeOfCoin = selectedCoinData[0].symbol;

    // if (walletSelected.balance < calculoMonedaValor) return alert("El monto es mayor que tu balance");

    const carterasUpdateadas = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        let updatedCoins = wallet.coins;
        const index = updatedCoins.findIndex((coin) => coin.name.toLowerCase() === typeOfCoin.toLowerCase());
        if (index !== -1) updatedCoins[index].quantity += Number(value);
        else if (index === -1) updatedCoins = [...updatedCoins, { name: typeOfCoin.toUpperCase(), quantity: Number(value) }];

        const newBalance = wallet.balance - calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: calculoMonedaValor, quantity: value },
          ...allPreviousTransaction,
        ];
        console.log(wallet.total + calculoMonedaValor);

        return { ...wallet, coins: updatedCoins, balance: newBalance, transactions: updatedTransactions, total: wallet.total + calculoMonedaValor };
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
        let updatedCoins = wallet.coins;

        const index = updatedCoins.findIndex((coin) => coin.name.toLowerCase() === typeOfCoin.toLowerCase());
        if (!updatedCoins[index]) return wallet;

        const isQuantityMenorACero = updatedCoins[index].quantity - Number(value);

        if (isQuantityMenorACero === 0) {
          updatedCoins = updatedCoins.filter((valor) => valor.name.toLowerCase() !== updatedCoins[index].name.toLowerCase());
        }

        if (isQuantityMenorACero < 0) {
          alert("El valor no puede superar la cantidad de monedas que tenes");
          return wallet;
        }

        if (index !== -1 && !isQuantityMenorACero <= 0) updatedCoins[index].quantity = updatedCoins[index].quantity - Number(value);
        else if (index === -1) updatedCoins = [...updatedCoins, { name: typeOfCoin.toUpperCase(), quantity: Number(value) }];

        const newBalance = wallet.balance + calculoMonedaValor;
        const allPreviousTransaction = wallet.transactions;
        const updatedTransactions = [
          { id: nanoid(), fecha: formattedDate, venta: true, type: typeOfCoin, value: calculoMonedaValor, quantity: value },
          ...allPreviousTransaction,
        ];

        console.log(updatedCoins.length);
        if (updatedCoins.length === 0) {
          return { ...wallet, coins: updatedCoins, balance: newBalance, transactions: updatedTransactions, total: 0 };
        }

        return { ...wallet, coins: updatedCoins, balance: newBalance, transactions: updatedTransactions, total: wallet.total - calculoMonedaValor };
      }
      return wallet;
    });

    setValue(0);
    return setCarterascreadas(carterasUpdateadas);
  }

  //EDITARTRANSACCIONES//

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

        const maxValue = wallet.total;

        let updatedCoins = wallet.coins;
        const index = updatedCoins.findIndex((coin) => coin.name.toLowerCase() === typeOfCoin.toLowerCase());
        if (index !== -1 && editedValue < maxValue)
          updatedCoins[index].quantity = updatedCoins[index].quantity - prevTransaction.quantity - Number(editedValue);
        if (index !== -1 && editedValue > maxValue) {
          alert("La venta no puede ser mayor a la cantidad que tenes");
          return wallet;
        }

        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: true, type: typeOfCoin, value: calculoMonedaValor, quantity: editedValue },
        ];

        return { ...wallet, coins: updatedCoins, balance: newBalance + calculoMonedaValor, transactions: updatedTransactions };
      }
      return wallet;
    });
    setEditedValue("");
    setselectedCoinDataEdit();
    return setCarterascreadas(carterasUpdateadas);
  }

  function editTransactionsComprar(walletId, id) {
    if (!editedValue) return alert("Selecciona un valor");
    if (editedValue < 0) return alert("El valor debe ser mayor a 0");
    if (isNaN(editedValue)) return alert("El valor debe ser un numero");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} <br> ${time}`;
    const calculoMonedaValor = editedValue * selectedCoinDataEdit[0].price;
    const typeOfCoin = selectedCoinDataEdit[0].symbol;

    const carterasUpdateadas = carterasCreada.map((wallet) => {
      if (wallet.id === walletId) {
        const allPreviousTransaction = wallet.transactions.filter((valor) => valor.id !== id);
        const prevTransaction = wallet.transactions.find((valor) => valor.id === id);
        const newBalance = wallet.balance + prevTransaction.value;

        const maxValue = wallet.coins.find((valor) => valor.name.toLowerCase() === typeOfCoin.toLowerCase());

        let updatedCoins = wallet.coins;
        const index = updatedCoins.findIndex((coin) => coin.name.toLowerCase() === typeOfCoin.toLowerCase());

        if (index !== -1 && editedValue < maxValue.quantity) {
          console.log("menor");
          console.log(prevTransaction.quantity);
          console.log(updatedCoins[index].quantity);
          updatedCoins[index].quantity = updatedCoins[index].quantity - prevTransaction.value - Number(editedValue);
        }
        if (index !== -1 && editedValue > maxValue.quantity) {
          console.log("MAYOR");

          updatedCoins[index].quantity = updatedCoins[index].quantity - prevTransaction.value + Number(editedValue);
        }

        const updatedTransactions = [
          ...allPreviousTransaction,
          { id: nanoid(), fecha: formattedDate, venta: false, type: typeOfCoin, value: calculoMonedaValor, quantity: editedValue },
        ];

        return { ...wallet, coins: updatedCoins, balance: newBalance - calculoMonedaValor, transactions: updatedTransactions };
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
        editarCartera,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletPorvider;
