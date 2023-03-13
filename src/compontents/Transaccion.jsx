import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

export default function Transaccion({ fecha, venta, id, walletId, type, value }) {
  const { deleteTransaction } = useContext(WalletContext);

  return (
    <div className="bg-white border-2 flex  justify-around items-center rounded-lg my-2 py-5 text-xs md:text-lg px-5">
      <div className="flex justify-center items-center  gap-5">
        <box-icon name="transfer"></box-icon>
        <div>
          <h2>{fecha}</h2>
          <h2 className="font-bold">{type.toUpperCase()}</h2>
        </div>
      </div>
      <div className="flex justify-center items-center  gap-2">
        {venta && <box-icon name="right-top-arrow-circle"></box-icon>}
        {!venta && <box-icon name="arrow-from-top"></box-icon>}
        <h2>{value} USD</h2>
      </div>
      <div className="flex gap-0 md:gap-2 ">
        <button className="btn btn-circle btn-outline scale-75 md:scale-100 origin-right">
          <box-icon type="solid" name="edit-alt"></box-icon>
        </button>
        <button onClick={() => deleteTransaction(walletId, id)} className="btn btn-circle btn-outline  scale-75 md:scale-100 origin-center">
          <box-icon name="trash"></box-icon>
        </button>
      </div>
    </div>
  );
}
