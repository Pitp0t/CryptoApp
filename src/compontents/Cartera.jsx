import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Coin from "../assets/coin2.png";
import { WalletContext } from "../context/WalletContext";

export default function Cartera({ transactions, id, balance, cryptoData }) {
  const { deleteWallet, editarCartera } = useContext(WalletContext);
  const [inputEditValue, setInputEditValue] = useState();
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleToggle = () => {
    return setToggleEdit((prev) => !prev);
  };

  const handleEditarCartera = () => {
    editarCartera(inputEditValue, id);
    setToggleEdit(false);
  };

  const formatedValue = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  const typeActivos = transactions.map((valor) => valor.type);
  const noDuplicatedActivos = new Set(typeActivos);
  const noDuplicatedActivosArr = Array.from(noDuplicatedActivos);
  const coins = cryptoData.filter((valor) => noDuplicatedActivosArr.includes(valor.symbol));
  const coinsImgs = coins.map((valor) => valor.img);

  const everyImg = coinsImgs.map((valor, indx) => {
    if (indx < 4) {
      return (
        <div className="bg-[#6c7b904d] transition-all shadow-md hover:ring-2  ring-[#6c7b904d] h-8 w-8 rounded-full flex justify-center items-center">
          <img className="rounded-full" key={valor} src={valor}></img>
        </div>
      );
    }
    return;
  });

  const dottedCoins = (
    <div className="bg-[#6c7b904d] transition-all shadow-md hover:ring-2  ring-[#6c7b904d] h-8 w-8 rounded-full flex justify-center items-center">
      <h3 className=" text-[20px] font-medium">+</h3>
    </div>
  );

  return (
    <div id={id} className=" cartera flex flex-col items-center justify-center gap-5 relative bord rounded-lg bg-[#3F3E45]  text-white text-sm p-5 ">
      <img className="h-40 w-40 object-contain" src={Coin} alt="" />

      {toggleEdit && (
        <div className=" border-2 border-[#faa018] rounded-full p-1 flex justify-center items-center gap-2 mx-5">
          <input
            onChange={(e) => setInputEditValue(e.target.value)}
            min="0"
            className="border-none bg-transparent outline-none text-xl text-center  w-3/4 text-[white]"
            type="number"
          />
          <button
            onClick={handleEditarCartera}
            className=" h-12 w-12 rounded-full flex justify-center items-center hover:bg-[#faa018]  transition-colors top-2 left-2 cursor-pointer"
          >
            <box-icon name="save" color="#ffffff"></box-icon>
          </button>
        </div>
      )}

      {!toggleEdit && <h2 className="text-white font-medium text-xl">{formatedValue.format(balance)} $USD</h2>}
      <div className="flex h-6 justify-start items-center gap-2 text-3xl ">
        {everyImg.length > 4 ? (
          <>
            {everyImg}
            {dottedCoins}
          </>
        ) : (
          everyImg
        )}
      </div>
      <button
        onClick={handleToggle}
        className="absolute h-12 w-12 rounded-full flex justify-center items-center hover:bg-[#5866784d]  transition-colors top-2 left-2 cursor-pointer"
      >
        <box-icon color="#ffffff" type="solid" name="edit-alt"></box-icon>
      </button>
      <button
        onClick={() => deleteWallet(id)}
        className="absolute h-12 w-12 rounded-full flex justify-center items-center hover:bg-[#5866784d]  transition-colors top-2 right-2 cursor-pointer"
      >
        <box-icon color="#ffffff" name="trash"></box-icon>
      </button>
      <Link
        to={`wallet/${id}`}
        className=" bg-[#faa018]  transition-all px-14 py-2 gap-2 font-bold shadow-md hover:ring-2  ring-[#faa018]  rounded-full flex justify-center items-center "
      >
        Ver cartera
        <box-icon name="wallet" color="#ffffff"></box-icon>
      </Link>
    </div>
  );
}
