import React, { useContext, useState } from "react";
import EditTransaction from "./EditTransaction";
import { WalletContext } from "../context/WalletContext";
import { Link } from "react-router-dom";

export default function Transaccion({ fecha, venta, id, walletId, type, value, quantity, cryptoData }) {
  const { deleteTransaction } = useContext(WalletContext);
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleClick = () => {
    return setToggleEdit((prev) => !prev);
  };

  const formatedValue = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  return (
    <>
      <div className=" shadow-md flex bg-[#3F3E45] text-white justify-between items-center rounded-lg mt-1 mb-2 py-5 text-xs md:text-lg px-5">
        <div className="flex justify-center items-center  gap-5">
          <div className=" h-10 w-10 rounded-full flex justify-center items-center">
            <box-icon color="#ffffff" name="transfer"></box-icon>
          </div>
          <div>
            <h2 className="text-sm">{fecha}</h2>
            <div className="font-bold flex gap-2">
              <h2 className="text-[#faa018]">{quantity}</h2>
              <h2>{type.toUpperCase()}</h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center  gap-2">
          {venta && <box-icon color="#ffffff" name="right-top-arrow-circle"></box-icon>}
          {!venta && <box-icon color="#ffffff" name="arrow-from-top"></box-icon>}
          <h2>{formatedValue.format(value)} USD</h2>
        </div>
        <div className="flex gap-0 md:gap-2 ">
          {/* <button
            onClick={handleClick}
            className="  bg-[#faa018] transition-all shadow-md hover:ring-2  ring-[#faa018]  h-10 w-10 rounded-full flex justify-center items-center scale-75 md:scale-100 origin-right"
          >
            <box-icon color="#ffffff" type="solid" name="edit-alt"></box-icon>
          </button> */}
          <button
            onClick={() => deleteTransaction(walletId, id)}
            className="  bg-[#faa018] transition-all shadow-md hover:ring-2  ring-[#faa018] h-10 w-10 rounded-full flex justify-center items-center scale-75 md:scale-100 origin-right"
          >
            <box-icon color="#ffffff" name="trash"></box-icon>
          </button>
        </div>
      </div>
      {toggleEdit && <EditTransaction type={type} walletId={walletId} id={id} venta={venta} quantity={quantity} cryptoData={cryptoData} />}
    </>
  );
}
