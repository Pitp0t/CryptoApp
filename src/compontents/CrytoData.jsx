import React from "react";
import Coin from "../assets/coin.png";

export default function CrtyptoData({ name, id, img, symbol, handleClick }) {
  return (
    <div onClick={() => handleClick(id)} className="flex  items-center gap-5 my-5 p-2 rounded-2xl cursor-pointer hover:bg-[#878dff]">
      <img className="h-8 w-8" src={img} alt="" />
      <div>
        <h2 className="font-bold">{symbol.toUpperCase()}</h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
}
