import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Coin from "../assets/coin2.png";
import { WalletContext } from "../context/WalletContext";
export default function Cartera({ transactions, id }) {
  const { deleteWallet } = useContext(WalletContext);

  const listaActivos = transactions.map((valor) => {
    return (
      <div className="bg-[#6c7b904d] transition-all shadow-md hover:ring-2  ring-[#6c7b904d] h-8 w-8 rounded-full flex justify-center items-center">
        <h3 key={valor.type} className=" text-[9px] font-bold">
          {valor.type.toUpperCase()}
        </h3>
      </div>
    );
  });

  return (
    <div id={id} className=" cartera flex flex-col items-center justify-center gap-5 relative bord rounded-lg bg-[#3F3E45]  text-white text-sm p-5 ">
      <img className="h-60 w-60 object-contain" src={Coin} alt="" />
      <h2 className="text-center  font-bold text-md"> </h2>
      <div className="flex justify-start items-center gap-2  ">{listaActivos} </div>
      <button onClick={() => deleteWallet(id)} className="absolute top-5 right-5 cursor-pointer">
        <box-icon color="#ffffff" name="trash"></box-icon>
      </button>
      {/* <div className="absolute top-5 left-5 cursor-pointer">
        <box-icon type="solid" name="edit-alt"></box-icon>
      </div> */}
      <Link
        to={`wallet/${id}`}
        className=" bg-[#faa018] transition-all px-14 py-2 gap-2 font-bold shadow-md hover:ring-2  ring-[#faa018]  rounded-full flex justify-center items-center "
      >
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </Link>
      {/* <Link
        to={`wallet/${id}`}
        className=" bg-[#6c7b904d] flex  items-center justify-center gap-3  font-bold px-14 py-2 rounded-full w-fit shadow-md hover:ring-2  bg-opacity-[0.12] ring-slate-500  text-slate-200 hover:text-slate-100 transition-all "
      >
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </Link> */}
    </div>
  );
}
