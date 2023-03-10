import React, { useEffect } from "react";
import Btc from "../assets/coin.png";
import useFetch from "../hooks/useFetch";

export default function Modal() {
  const { getCryptoData, cryptoData } = useFetch();

  useEffect(() => {
    getCryptoData();
  }, []);

  return (
    <div>
      <a
        href="#my-modal-2"
        className="flex gap-2 items-center bg-[#6c7b904d] text-xl font-bold px-5 py-2 rounded-full w-fit shadow-md hover:ring-2  bg-opacity-[0.12] ring-slate-500  text-slate-200 hover:text-slate-100 transition-all"
      >
        <img className="h-6 w-6 rounded-full" src={Btc} alt="" />
        <h2>BTC</h2>
        <box-icon name="chevron-down" color="#ffffff"></box-icon>
      </a>

      <div className="modal " id="my-modal-2">
        <div className="modal-box relative flex flex-col justify-center items-center">
          <div className="modal-action">
            <a href="#" className="btn p-2 rounded-full absolute right-2 top-2">
              <box-icon name="x" flip="vertical" color="#ffffff"></box-icon>
            </a>
          </div>

          <h3 className="font-bold text-lg">Seleccioná la moneda</h3>
          <div className="flex gap-5 items-center justify-center h-10 px-3 w-full rounded-2xl border-2 border-black ">
            <input type="text " className="w-full rounded-2xl px-3 h-8 outline-none" />
            <box-icon name="search"></box-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
