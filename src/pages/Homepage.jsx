import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import useFetch from "../hooks/useFetch";
import Cartera from "../compontents/Cartera";

export default function Homepage() {
  const { getCryptoData, cryptoData } = useFetch();

  useEffect(() => {
    getCryptoData();
  }, []);

  if (cryptoData.length === 0) return <button className="btn btn-square loading"></button>;

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <button className="btn btn-circle btn-outline">
          <box-icon name="plus"></box-icon>
        </button>
        <h2 className="font-bold">Crear Cartera</h2>
      </div>

      <div className="carteras">
        <Cartera />
        <Cartera />
        <Cartera />
        <Cartera />
        <Cartera />
        <Cartera />
        <Cartera />
        <Cartera />
      </div>
    </div>
  );
}
