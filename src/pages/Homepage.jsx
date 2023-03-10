import { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import useFetch from "../hooks/useFetch";
import { WalletContext } from "../context/WalletContext";
import Cartera from "../compontents/Cartera";

export default function Homepage() {
  const { getCryptoData, cryptoData } = useFetch();
  const { createWallet, carterasCreada } = useContext(WalletContext);

  useEffect(() => {
    getCryptoData();
  }, []);

  if (cryptoData.length === 0) return <button className="btn btn-square loading"></button>;

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <button onClick={createWallet} className="btn btn-circle btn-outline">
          <box-icon name="plus"></box-icon>
        </button>
        <h2 className="font-bold">Crear Cartera</h2>
      </div>
      <div className="carteras">
        {carterasCreada.map((valor) => {
          return <Cartera key={valor.id} id={valor.id} activos={valor.activos} initialUsd={valor.initialUsd} transactions={valor.transactions} />;
        })}
      </div>
    </div>
  );
}
