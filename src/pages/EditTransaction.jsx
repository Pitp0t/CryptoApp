import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";

export default function EditTransaction() {
  const { carterasCreada } = useContext(WalletContext);
  const { transactionId } = useParams();

  const singleWallet = carterasCreada.filter((valor) => valor.transactions.filter((valor) => valor.id) === transactionId);
  const singleTransaction = singleWallet.filter((valor) => valor.id === transactionId);

  return (
    <div className="shadow-md flex flex-col gap-5">
      <div className="  flex bg-[#3F3E45] text-white justify-between items-center rounded-lg  py-5 text-xs md:text-lg px-5">
        <box-icon color="#ffffff" name="transfer"></box-icon>
      </div>

      <button
        onClick={() => vender(walletId)}
        className=" flex gap-5 justify-center items-center py-3 font-bold  bg-[#faa018] w-full  rounded-xl shadow-md hover:ring-2   ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
      >
        <h2>EDITAR</h2>
      </button>
    </div>
  );
}
