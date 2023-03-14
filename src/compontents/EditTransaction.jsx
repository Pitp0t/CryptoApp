import React, { useCallback, useContext, useEffect, useRef } from "react";
import Loading from "./Loading";
import { WalletContext } from "../context/WalletContext";
import useFetch from "../hooks/useFetch";

export default function EditTransaction({ type, walletId, id, venta, quantity }) {
  const { setselectedCoinDataEdit, setEditedValue, editTransactionsComprar, editTransactionsVender, editedValue } = useContext(WalletContext);

  const { cryptoData, getCryptoData } = useFetch();

  console.log(editedValue);

  useEffect(() => {
    console.log("CRYPTO DATA");
    getCryptoData();
  }, []);

  const singleCoinToEdit = cryptoData.filter((valor) => valor.symbol === type);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setselectedCoinDataEdit(singleCoinToEdit);
    setEditedValue(value);
  };

  return (
    <div className="shadow-md mb-12 flex flex-col gap-1">
      <div className="  flex bg-[#3F3E45] text-white justify-between items-center rounded-lg  py-5 text-xs md:text-lg px-5">
        <box-icon color="#ffffff" name="transfer"></box-icon>
        <input
          onChange={(e) => handleInputChange(e)}
          value={editedValue ? editedValue : ""}
          min="0"
          className="border-none bg-transparent outline-none text-3xl text-center w-full text-[#faa018]"
          type="number"
          placeholder={quantity}
        />
        <h2 className="font-bold">{type.toUpperCase()}</h2>
      </div>

      <div className="flex">
        {venta && (
          <button
            onClick={() => editTransactionsVender(walletId, id)}
            className=" flex gap-5 justify-center items-center py-3 font-medium  bg-[#faa01854] w-full  rounded-xl shadow-md hover:ring-2   ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
          >
            <h2>VENDER</h2>
          </button>
        )}
        {!venta && (
          <button
            onClick={() => editTransactionsComprar(walletId, id)}
            className=" flex gap-5 justify-center items-center py-3 font-medium  bg-[#faa01854] w-full  rounded-xl shadow-md hover:ring-2   ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
          >
            <h2>COMPRAR</h2>
          </button>
        )}
      </div>
    </div>
  );
}
