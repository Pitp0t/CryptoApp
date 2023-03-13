import React from "react";

export default function CrtyptoData({ name, id, img, symbol, handleClick }) {
  return (
    <div onClick={() => handleClick(id)} className="transaction flex bg[] items-center gap-5 my-5 p-2 rounded-2xl cursor-pointer hover:bg-[#faa01894]">
      <img className="h-8 w-8" src={img} alt="" />
      <div>
        <h2 className="font-bold">{symbol.toUpperCase()}</h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
}
