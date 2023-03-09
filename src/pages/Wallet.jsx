import React from "react";
import Transaccion from "../compontents/Transaccion";
import Intercambio from "../compontents/Intercambio";

export default function Wallet() {
  return (
    <>
      <div className="bg-[#D9D9D9]  mx-auto my-20  rounded-lg p-0 md:p-10 md:max-w-[1280px] ">
        <div className=" flex justify-between bg-white rounded-lg p-10 items-center flex-col md:flex-row text-center md:text-left gap-10">
          <div className="flex flex-col gap-2">
            <h2>Balance Total</h2>
            <h2 className="font-bold text-5xl">15.000$ USD</h2>
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
          <Transaccion />
          <Transaccion />
          <Transaccion />
          <Transaccion />
          <Transaccion />
          <Transaccion />
        </div>
      </div>
    </>
  );
}
