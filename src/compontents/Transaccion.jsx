import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

export default function Transaccion({ fecha, venta, id, walletId, type, value }) {
  const { deleteTransaction } = useContext(WalletContext);

  const formatedValue = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  return (
    <div className=" shadow-md flex bg-[#3F3E45] text-white justify-between items-center rounded-lg my-2 py-5 text-xs md:text-lg px-5">
      <div className="flex justify-center items-center  gap-5">
        <div className=" h-10 w-10 rounded-full flex justify-center items-center">
          <box-icon color="#ffffff" name="transfer"></box-icon>
        </div>
        <div>
          <h2 className="text-sm">{fecha}</h2>
          <h2 className="font-bold">{type.toUpperCase()}</h2>
        </div>
      </div>
      <div className="flex justify-center items-center  gap-2">
        {venta && <box-icon color="#ffffff" name="right-top-arrow-circle"></box-icon>}
        {!venta && <box-icon color="#ffffff" name="arrow-from-top"></box-icon>}
        <h2>{formatedValue.format(value)} USD</h2>
      </div>
      <div className="flex gap-0 md:gap-2 ">
        <button className="  bg-[#faa018] transition-all shadow-md hover:ring-2  ring-[#faa018]  h-10 w-10 rounded-full flex justify-center items-center scale-75 md:scale-100 origin-right">
          <box-icon color="#ffffff" type="solid" name="edit-alt"></box-icon>
        </button>
        <button
          onClick={() => deleteTransaction(walletId, id)}
          className="  bg-[#faa018] transition-all shadow-md hover:ring-2  ring-[#faa018] h-10 w-10 rounded-full flex justify-center items-center scale-75 md:scale-100 origin-right"
        >
          <box-icon color="#ffffff" name="trash"></box-icon>
        </button>
      </div>
    </div>
  );
}
