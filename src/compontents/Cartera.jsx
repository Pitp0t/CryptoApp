import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Coin from "../assets/coin2.png";
import { WalletContext } from "../context/WalletContext";

export default function Cartera({ transactions, id, balance }) {
  const { deleteWallet } = useContext(WalletContext);

  const formatedValue = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  const typeActivos = transactions.map((valor) => valor.type);
  const noDuplicatedActivos = new Set(typeActivos);

  const listaActivos = Array.from(noDuplicatedActivos).map((valor, indx) => {
    if (indx < 4) {
      return (
        <div className="bg-[#6c7b904d] transition-all shadow-md hover:ring-2  ring-[#6c7b904d] h-8 w-8 rounded-full flex justify-center items-center">
          <h3 key={valor} className=" text-[9px] font-bold">
            {valor.toUpperCase()}
          </h3>
        </div>
      );
    }
    return;
  });

  const dottedCoins = (
    <div className="bg-[#6c7b904d] transition-all shadow-md hover:ring-2  ring-[#6c7b904d] h-8 w-8 rounded-full flex justify-center items-center">
      <h3 className=" text-[9px] font-bold">...</h3>
    </div>
  );

  return (
    <div id={id} className=" cartera flex flex-col items-center justify-center gap-5 relative bord rounded-lg bg-[#3F3E45]  text-white text-sm p-5 ">
      <img className="h-40 w-40 object-contain" src={Coin} alt="" />
      <h2 className="text-center  font-bold text-md"> </h2>
      <h2 className="text-white font-medium text-xl">{formatedValue.format(balance)} $USD</h2>
      <div className="flex justify-start items-center gap-2 text-3xl ">
        {listaActivos.length > 4 ? (
          <>
            {listaActivos}
            {dottedCoins}
          </>
        ) : (
          listaActivos
        )}
      </div>
      <button onClick={() => deleteWallet(id)} className="absolute top-5 right-5 cursor-pointer">
        <box-icon color="#ffffff" name="trash"></box-icon>
      </button>
      <Link
        to={`wallet/${id}`}
        className=" bg-[#faa018] transition-all px-14 py-2 gap-2 font-bold shadow-md hover:ring-2  ring-[#faa018]  rounded-full flex justify-center items-center "
      >
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </Link>
    </div>
  );
}
