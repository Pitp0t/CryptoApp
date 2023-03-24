import React, { useEffect, useContext, useState } from "react";
import Btc from "../assets/coin2.png";
import useFetch from "../hooks/useFetch";
import CrtyptoData from "./CrytoData";
import { WalletContext } from "../context/WalletContext";
import Loading from "./Loading";

export default function Modal({ cryptoData }) {
  const { setSelectedCoinData, selectedCoinData } = useContext(WalletContext);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setQuery("");
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const filteredCoins = cryptoData.filter(
    (valor) => valor.symbol.toLowerCase().includes(query.toLowerCase()) || valor.name.toLowerCase().includes(query.toLowerCase())
  );

  function selectCoin(id) {
    setIsOpen(false);
    setQuery("");
    const selectedCoin = cryptoData.filter((valor) => valor.id === id);
    setSelectedCoinData(selectedCoin);
  }

  return (
    <div className="modalScroll">
      <button
        onClick={handleOpenModal}
        className="flex gap-2 cursor-pointer items-center bg-[#6c7b904d] text-xl font-bold pr-8 pl-4 py-2 rounded-full w-fit shadow-md hover:ring-2  bg-opacity-[0.12] ring-slate-500  text-slate-200 hover:text-slate-100 transition-all"
      >
        <img className="h-6 w-6 rounded-full" src={selectedCoinData ? selectedCoinData[0].img : Btc} alt="" />
        <h2>{selectedCoinData ? selectedCoinData[0].symbol.toUpperCase() : "COIN"}</h2>
        <div className="flex items-center justify-center">
          <box-icon name="chevron-down" color="#ffffff"></box-icon>
        </div>
      </button>

      {isOpen && (
        <>
          <input type="checkbox" defaultChecked id="my-modal" className="modal-toggle" />
          <div className="modal backdrop-blur">
            <div className="modal-box relative flex flex-col py-0 gap-5 justify-start items-center min-h-[90vh] bg-[#3F3E45] text-white">
              <div className="sticky top-0 flex gap-2 items-center justify-center flex-col pt-6  w-full bg-[#3F3E45]">
                <div className="modal-action">
                  <div className="modal-action  absolute right-0 top-0">
                    <button
                      onClick={handleOpenModal}
                      className="bg-[#faa018] transition-all shadow-md hover:ring-2  ring-[#faa018] h-10 w-10 rounded-full flex justify-center items-center"
                    >
                      <box-icon name="x" flip="vertical" color="#ffffff"></box-icon>
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-lg">Seleccioná la moneda</h3>
                <div className="flex gap-5 items-center justify-center h-10 py-5 px-3 w-full rounded-2xl border-2  border-gray ">
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscá tu moneda"
                    className="w-full rounded-2xl bg-[#3F3E45]  px-3 h-8 outline-none"
                  />
                  <box-icon color="#ffffff" name="search"></box-icon>
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
