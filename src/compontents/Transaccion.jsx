import React from "react";

export default function Transaccion() {
  return (
    <div className="bg-white border-2 flex  justify-around items-center rounded-lg my-2 py-5">
      <div className="flex justify-center items-center  gap-5">
        <box-icon name="transfer"></box-icon>
        <div>
          <h2>FECHA 20/03</h2>
          <h2>Btc-Eth</h2>
        </div>
      </div>
      <div className="flex justify-center items-center  gap-5">
        <box-icon type="solid" name="up-arrow-alt"></box-icon>
        <h2>15000$</h2>
      </div>
      <div className="flex  gap-2">
        <button className="btn btn-circle btn-outline">
          <box-icon type="solid" name="edit-alt"></box-icon>
        </button>
        <button className="btn btn-circle btn-outline">
          <box-icon name="trash"></box-icon>
        </button>
      </div>
    </div>
  );
}
