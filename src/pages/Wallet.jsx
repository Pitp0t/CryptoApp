import React, { useContext, useEffect } from "react";
import Transaccion from "../compontents/Transaccion";
import Intercambio from "../compontents/Intercambio";
import { WalletContext } from "../context/WalletContext";
import { useParams } from "react-router-dom";

export default function Wallet() {
  const { carterasCreada, comprar, vender } = useContext(WalletContext);
  const { walletId } = useParams();

  const singleWallet = carterasCreada.filter((valor) => valor.id === walletId);

  return (
    <>
      <div className=" mx-auto my-20  rounded-lg px-2 md:p-5 md:border-2 md:max-w-[700px] ">
        <Intercambio />
        <div className="flex- gap-10">
          <button onClick={() => comprar(walletId)} className="btn bg-[#6c7b904] w-1/2">
            COMPRAR
          </button>
          <button onClick={() => vender(walletId)} className="btn bg-[#6c7b904] w-1/2">
            VENDER
          </button>
        </div>
        <div className=" rounded-lg ">
          {singleWallet[0].transactions.map((valor) => {
            return (
              <Transaccion key={valor.id} walletId={walletId} id={valor.id} fecha={valor.fecha} type={valor.type} venta={valor.venta} value={valor.value} />
            );
          })}
        </div>
      </div>
    </>
  );
}
