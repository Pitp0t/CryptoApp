import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import useFetch from "../hooks/useFetch";
import Cartera from "../compontents/Cartera";

export default function Homepage() {
  const { getCryptoData, cryptoData } = useFetch();
  const [carterasCreada, setCarterascreadas] = useState([]);

  function crearCartera() {
    return setCarterascreadas((prev) => [...prev, { value: 0 }]);
  }

  function eliminarCartera() {}

  useEffect(() => {
    getCryptoData();
  }, []);

  if (cryptoData.length === 0) return <button className="btn btn-square loading"></button>;

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <button onClick={crearCartera} className="btn btn-circle btn-outline">
          <box-icon name="plus"></box-icon>
        </button>
        <h2 className="font-bold">Crear Cartera</h2>
      </div>

      <div className="carteras">
        {carterasCreada.map((valor) => {
          return <Cartera value={valor.value} key={nanoid()} />;
        })}
        <Cartera value={1500} />
        <Cartera value={1100} />
        <Cartera value={500} />
        <Cartera value={0} />
        <Cartera value={500} />
        <Cartera value={15400} />
        <Cartera value={200} />
        <Cartera value={2300} />
      </div>
    </div>
  );
}
