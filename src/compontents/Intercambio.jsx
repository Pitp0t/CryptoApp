import React, { useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";
import { WalletContext } from "../context/WalletContext";
import { useForm } from "react-hook-form";

export default function Intercambio() {
  const { getCryptoData } = useFetch();
  const { setValue, value, calculoValor, calculoPrecio, selectedCoinData } = useContext(WalletContext);

  useEffect(() => {
    console.log("FETCH DATA");
    getCryptoData();
  }, []);

  useEffect(() => {
    calculoPrecio();
  }, [value, selectedCoinData]);

  function updateValue(e) {
    const value = e.target.value;
    setValue(value);
  }

  return (
    <div className="bg-[#3F3E45] rounded-lg py-10 px-5  md:px-10 my-5 flex flex-col gap-10">
      <div className="flex justify-betwen ">
        <input
          value={value ? value : ""}
          min="0"
          onChange={(e) => updateValue(e)}
          className="border-none bg-transparent outline-none text-3xl w-full text-white"
          type="number"
          placeholder="0.1"
        />
        <Modal />
      </div>
      <h2 className=" text-slate-200">{calculoValor !== "" ? calculoValor : 0} $USD</h2>
    </div>
  );
}
