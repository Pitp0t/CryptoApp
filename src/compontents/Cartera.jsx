import React from "react";
import Coin from "../assets/coin.png";

export default function Cartera() {
  return (
    <div className=" cartera flex flex-col gap-5 relative bord rounded-lg bg-[#D9D9D9] p-5 ">
      <img className="h-60 w-60 object-contain" src={Coin} alt="" />
      <h2 className="text-center font-bold text-md">1500$ USD</h2>
      <div className="absolute top-5 right-5 cursor-pointer">
        <box-icon name="trash"></box-icon>
      </div>
      <div className="absolute top-5 left-5 cursor-pointer">
        <box-icon type="solid" name="edit-alt"></box-icon>
      </div>
      <button className="btn gap-2">
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </button>
    </div>
  );
}
