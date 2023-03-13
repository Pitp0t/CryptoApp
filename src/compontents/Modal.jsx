import React, { useEffect, useContext, useState } from "react";
import Btc from "../assets/coin.png";
import useFetch from "../hooks/useFetch";
import CrtyptoData from "./CrytoData";
import { WalletContext } from "../context/WalletContext";

export default function Modal() {
  const { setSelectedCoinData } = useContext(WalletContext);

  const { getCryptoData, cryptoData } = useFetch();
  const [coinSelected, setCoinSelected] = useState();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    getCryptoData();
  }, []);

  const filteredCoins = cryptoData.filter(
    (valor) => valor.symbol.toLowerCase().includes(query.toLowerCase()) || valor.name.toLowerCase().includes(query.toLowerCase())
  );

  function selectCoin(id) {
    setIsOpen(false);

    const selectedCoin = cryptoData.filter((valor) => valor.id === id);
    setSelectedCoinData(selectedCoin);
    setCoinSelected(selectedCoin);
  }

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="flex gap-2 cursor-pointer items-center bg-[#6c7b904d] text-xl font-bold pr-8 pl-4 py-2 rounded-full w-fit shadow-md hover:ring-2  bg-opacity-[0.12] ring-slate-500  text-slate-200 hover:text-slate-100 transition-all"
      >
        <img className="h-6 w-6 rounded-full" src={coinSelected ? coinSelected[0].img : Btc} alt="" />
        <h2>{coinSelected ? coinSelected[0].symbol.toUpperCase() : "COIN"}</h2>
        <div className="flex items-center justify-center">
          <box-icon name="chevron-down" color="#ffffff"></box-icon>
        </div>
      </button>

      {isOpen && (
        <>
          <input type="checkbox" checked="true" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative flex flex-col py-0 gap-5 justify-start items-center min-h-[90vh] ">
              <div className="sticky top-0 flex items-center justify-center flex-col  bg-white w-full">
                <div className="modal-action">
                  <div className="modal-action  absolute right-0 top-0">
                    <button onClick={handleOpenModal} className="btn p-2 rounded-full">
                      <box-icon name="x" flip="vertical" color="#ffffff"></box-icon>
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-lg">Seleccioná la moneda</h3>
                <div className="flex gap-5 items-center justify-center h-10 py-5 px-3 w-full rounded-2xl border-2 border-gray ">
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Selecciona la moneda"
                    className="w-full rounded-2xl  px-3 h-8 outline-none"
                  />
                  <box-icon name="search"></box-icon>
                </div>
              </div>

              <div className="flex flex-col justify-start w-full">
                {filteredCoins.map((valor) => {
                  return (
                    <CrtyptoData handleClick={(id) => selectCoin(id)} key={valor.id} name={valor.name} id={valor.id} symbol={valor.symbol} img={valor.img} />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
