import React, { useContext, useEffect } from "react";
import Transaccion from "../compontents/Transaccion";
import Intercambio from "../compontents/Intercambio";
import { WalletContext } from "../context/WalletContext";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Wallet() {
  const { carterasCreada, comprar, vender } = useContext(WalletContext);
  const { walletId } = useParams();
  const { cryptoData, getCryptoData } = useFetch();

  useEffect(() => {
    console.log("FETCHING DATA WALLET");
    getCryptoData();
  }, []);

  const singleWallet = carterasCreada.filter((valor) => valor.id === walletId);
  const formatter = new Intl.NumberFormat("es-ES", { style: "decimal" });

  return (
    <>
      <div className=" mx-auto my-20  rounded-lg px-2 md:p-5  md:max-w-[700px] ">
        <div className="bg-[#3F3E45] rounded-lg py-10 px-5  md:px-10 my-5 flex flex-col gap-2 text-white">
          <h2 className="text-xl font-extralight"> Balance :</h2>
          <h2 className="text-4xl"> {formatter.format(singleWallet[0].balance)} $USD</h2>
        </div>
        <Intercambio cryptoData={cryptoData} />
        <div className="flex gap-4 ">
          <button
            onClick={() => comprar(walletId)}
            className="flex gap-5 justify-center items-center py-3 font-bold  bg-[#faa018] w-full rounded-xl shadow-md hover:ring-2  ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
          >
            <h2>COMPRAR</h2>
            <box-icon name="down-arrow-circle" color="#ffffff"></box-icon>
          </button>
          <button
            onClick={() => vender(walletId)}
            className=" flex gap-5 justify-center items-center py-3 font-bold  bg-[#faa018] w-full  rounded-xl shadow-md hover:ring-2   ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
          >
            <h2>VENDER</h2>
            <box-icon name="up-arrow-circle" color="#ffffff"></box-icon>
          </button>
        </div>
        <div className=" mt-10 ">
          {singleWallet[0].transactions.map((valor) => {
            return (
              <Transaccion
                key={valor.id}
                quantity={valor.quantity}
                walletId={walletId}
                id={valor.id}
                fecha={valor.fecha}
                type={valor.type}
                venta={valor.venta}
                value={valor.value}
                cryptoData={cryptoData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
