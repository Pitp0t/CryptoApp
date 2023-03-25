import { useEffect, useState, useContext } from "react";
import Loading from "../compontents/Loading";
import Error from "../compontents/Error";
import useFetch from "../hooks/useFetch";
import { WalletContext } from "../context/WalletContext";
import Cartera from "../compontents/Cartera";

export default function Homepage() {
  const { getCryptoData, cryptoData, error } = useFetch();
  const { createWallet, carterasCreada } = useContext(WalletContext);

  useEffect(() => {
    getCryptoData();
  }, []);

  if (error) return <Error error={error} />;
  if (cryptoData.length === 0) return <Loading />;

  return (
    <main className="max-w-[1240px] mx-auto mt-24 ">
      <div className="flex flex-col   backdrop-blur md:backdrop-blur-none py-5   z-20  justify-center  items-center gap-2 w-[100%] text-white fixed bottom-0 sm:relative">
        <button
          onClick={createWallet}
          className="bg-[#faa018] transition-all shadow-md hover:ring-2  ring-[#faa018] h-12 w-12 rounded-full flex items-center justify-center"
        >
          <box-icon color="#ffffff" name="plus"></box-icon>
        </button>
        <h2 className="font-medium">Crear Cartera</h2>
      </div>
      <div className="carteras z-10">
        {carterasCreada.map((valor) => {
          return (
            <Cartera
              transactions={valor.transactions}
              coins={valor.coins}
              cryptoData={cryptoData}
              name={valor.name}
              key={valor.id}
              id={valor.id}
              balance={valor.balance}
              total={valor.total}
            />
          );
        })}
      </div>
    </main>
  );
}
