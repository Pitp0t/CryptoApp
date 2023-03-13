import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Coin from "../assets/coin.png";
import { WalletContext } from "../context/WalletContext";
export default function Cartera({ transactions, id }) {
  const { deleteWallet } = useContext(WalletContext);

  const listaActivos = transactions.map((valor) => {
    return (
      <h3 key={valor.type} className=" font-bold">
        {valor.type.toUpperCase()}
      </h3>
    );
  });

  return (
    <div id={id} className=" cartera flex flex-col gap-5 relative bord rounded-lg bg-[#D9D9D9] p-5 ">
      <img className="h-60 w-60 object-contain" src={Coin} alt="" />
      <h2 className="text-center font-bold text-md"> </h2>
      <div className="flex justify-center items-center gap-2">{listaActivos}</div>
      <button onClick={() => deleteWallet(id)} className="absolute top-5 right-5 cursor-pointer">
        <box-icon name="trash"></box-icon>
      </button>
      {/* <div className="absolute top-5 left-5 cursor-pointer">
        <box-icon type="solid" name="edit-alt"></box-icon>
      </div> */}
      <Link to={`wallet/${id}`} className="btn gap-2 ">
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </Link>
    </div>
  );
}
