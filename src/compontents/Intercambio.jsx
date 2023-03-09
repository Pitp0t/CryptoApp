import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function Intercambio() {
  const { getCryptoData, cryptoData } = useFetch();

  useEffect(() => {
    getCryptoData();
  }, []);

  function preventDefault(e) {
    return e.preventDefault;
  }

  return (
    <div className="bg-white rounded-lg p-10 my-5 flex flex-col gap-10">
      <div className="flex justify-around gap-5">
        <button className="btn gap-2 w-1/2">
          Comprar
          <box-icon color="#ffffff" name="plus"></box-icon>
        </button>
        <button className="btn gap-2 w-1/2">
          Vender
          <box-icon color="#ffffff" name="minus"></box-icon>
        </button>
      </div>
      <form className="flex flex-col justify-center gap-10 items-center ">
        <div class="form-control form-select w-full">
          <div class="input-group">
            <select class="select select-bordered w-full">
              <option disabled selected>
                Pick category
              </option>
              {cryptoData.map((valor) => {
                return <option>{valor.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <label className="input-group w-full">
            <span>Price</span>
            <input type="text" placeholder="10" className="input input-bordered w-full" />
            <span>USD</span>
          </label>
        </div>
        <h2>Total : 1400$</h2>
        <button onClick={preventDefault} className="btn gap-2">
          <box-icon color="#ffffff" name="left-arrow-circle"></box-icon>
          Comprar
        </button>
      </form>
    </div>
  );
}
