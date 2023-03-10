import React, { useContext, useEffect } from "react";
import Transaccion from "../compontents/Transaccion";
import Intercambio from "../compontents/Intercambio";
import { WalletContext } from "../context/WalletContext";
import { useParams } from "react-router-dom";

export default function Wallet() {
  const { carterasCreada } = useContext(WalletContext);
  const { walletId } = useParams();
  const singleWallet = carterasCreada.filter((valor) => valor.id === walletId);

  return (
    <>
      <div className="border-2  mx-auto my-20  rounded-lg p-5 md:max-w-[700px] ">
        <div className=" flex justify-between bg-white rounded-lg p-10 items-center flex-col md:flex-row text-center md:text-left gap-10">
          <div className="flex flex-col gap-2">
            <h2>Balance Total</h2>
            <h2 className="font-bold text-5xl">{singleWallet[0].initialUsd} $</h2>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <button className="btn  btn-circle btn-outline w-24 h-24">
              <box-icon name="transfer" heigth="32" width="32"></box-icon>
            </button>
            <h2>Transferir</h2>
          </div>
        </div>
        <Intercambio />
        <div className=" rounded-lg ">
          {singleWallet[0].transactions.map((valor) => {
            return <Transaccion walletId={walletId} id={valor.id} fecha={valor.fecha} venta={valor.venta} />;
          })}
        </div>
      </div>
    </>
  );
}
