import React, { useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";
import { WalletContext } from "../context/WalletContext";
import { useForm } from "react-hook-form";

export default function Intercambio({ cryptoData, walletId, venta }) {
  const { setValue, value, calculoValor, calculoPrecio, selectedCoinData, carterasCreada } = useContext(WalletContext);
  const singleWallet = carterasCreada.find((valor) => valor.id === walletId);

  let coinInWallet;
  if (selectedCoinData) coinInWallet = singleWallet.coins.find((valor) => valor.name.toLowerCase() === selectedCoinData[0].symbol.toLowerCase());

  useEffect(() => {
    calculoPrecio();
  }, [value, selectedCoinData]);

  function updateValue(e) {
    const value = e.target.value;
    setValue(value);
  }

  return (
    <div className="bg-[#3F3E45] rounded-lg py-10 px-5  md:px-10 my-5 flex flex-col gap-10">
      <div className="flex justify-betwen ">
        {venta && (
          <input
            value={value ? value : ""}
            min="0"
            onChange={(e) => updateValue(e)}
            className="border-none bg-transparent outline-none text-3xl w-full text-white"
            type="number"
            placeholder="0.1"
          />
        )}

        {!venta && (
          <input
            value={value ? value : ""}
            min="0"
            max={coinInWallet?.quantity}
            onChange={(e) => updateValue(e)}
            className="border-none bg-transparent outline-none text-3xl w-full text-white"
            type="number"
            placeholder="0.1"
          />
        )}
        <Modal cryptoData={cryptoData} />
      </div>
      <h2 className=" text-slate-200">{calculoValor !== "" ? calculoValor : 0} $USD</h2>
    </div>
  );
}
