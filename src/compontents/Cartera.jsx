import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Coin from "../assets/coin.png";
import { nanoid } from "nanoid";

export default function Cartera({ value }) {
  const { cartId } = useParams();
  const cartInfo = useRef();

  function ConsoleId({ value }) {
    return console.log(cartInfo.current.id);
  }

  return (
    <div ref={cartInfo} id={nanoid()} className=" cartera flex flex-col gap-5 relative bord rounded-lg bg-[#D9D9D9] p-5 ">
      <img className="h-60 w-60 object-contain" src={Coin} alt="" />
      <h2 className="text-center font-bold text-md">{value} USD</h2>
      <div className="absolute top-5 right-5 cursor-pointer">
        <box-icon name="trash"></box-icon>
      </div>
      <div className="absolute top-5 left-5 cursor-pointer">
        <box-icon type="solid" name="edit-alt"></box-icon>
      </div>
      <button onClick={ConsoleId} className="btn gap-2">
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </button>
    </div>
  );
}
