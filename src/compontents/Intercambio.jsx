import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";

export default function Intercambio() {
  const { getCryptoData, cryptoData } = useFetch();

  useEffect(() => {
    console.log("asdasd");
    getCryptoData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const formattedDate = `${date} ${time}`;
    console.log(formattedDate);
  }

  return (
    <div className="bg-[#334155] rounded-lg p-10 my-5 flex flex-col gap-10">
      <div className="flex justify-center ">
        <input className="border-none bg-transparent outline-none text-3xl w-full text-white" type="number" placeholder="0" />
        <Modal />
      </div>

      {/* <form className="flex flex-col justify-center gap-10 items-center ">
        <div className="form-control form-select w-full">
          <div className="input-group">
            <select className="select select-bordered w-full">
              <option disabled selected>
                Pick category
              </option>
              {cryptoData.map((valor) => {
                return <option key={valor.id}>{valor.name}</option>;
              })}
            </select>
          </div>
        </div>

        <h2>Total : 1400$</h2>S
        <button type="button " onClick={handleSubmit} className="btn gap-2">
          <box-icon color="#ffffff" name="left-arrow-circle"></box-icon>
          Comprar
        </button>
      </form> */}
    </div>
  );
}
