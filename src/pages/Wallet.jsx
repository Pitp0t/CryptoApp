import React, { useContext, useEffect, useState } from "react";
import Transaccion from "../compontents/Transaccion";
import Intercambio from "../compontents/Intercambio";
import { WalletContext } from "../context/WalletContext";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../compontents/Loading";

export default function Wallet() {
  const { carterasCreada, comprar, vender } = useContext(WalletContext);
  const { walletId } = useParams();
  const { cryptoData, getCryptoData } = useFetch();

  const [toggleVender, setToggleVender] = useState(false);

  const handleToggleVender = () => {
    return setToggleVender(true);
  };

  const handleToggleComprar = () => {
    return setToggleVender(false);
  };

  useEffect(() => {
    getCryptoData();
  }, []);

  if (cryptoData.length === 0) return <Loading />;

  const singleWallet = carterasCreada.filter((valor) => valor.id === walletId);
  const allCoins = singleWallet[0].coins;

  const coinsAvailable = allCoins.map((valor) => valor.name.toLowerCase());
  const filteredCryptoData = cryptoData.filter((valor) => coinsAvailable.includes(valor.symbol.toLowerCase()));

  const coinsImgsAndData = allCoins.map((valor) => {
    const coinImg = filteredCryptoData.find((crypto) => crypto.symbol.toLowerCase() === valor.name.toLowerCase());
    return { coinImg: coinImg.img, quantity: valor.quantity };
  });

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className=" mx-auto my-20  rounded-lg px-2 md:p-5  md:max-w-[700px] ">
        <div className="bg-[#3F3E45] rounded-lg pt-10 px-5 flex flex-col gap-12 md:px-10 my-5   text-white">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-extralight"> Balance :</h2>
            <h2 className="text-4xl"> {formatter.format(singleWallet[0].total)} $USD</h2>
          </div>

          {/* <button className="flex gap-2 cursor-pointer items-center bg-[#6c7b904d] text-xl font-bold  px-4 py-2 rounded-full w-fit shadow-md hover:ring-2  bg-opacity-[0.12] ring-slate-500  text-slate-200 hover:text-slate-100 transition-all">
            <h2>BUY</h2>
            <div className="flex items-center justify-center">
              <box-icon name="chevron-down" color="#ffffff"></box-icon>
            </div>
          </button> */}

          <div className=" flex justify-between   ">
            <button className={toggleVender ? "text-white   w-1/2  " : " w-1/2  border-b-4  border-[#faa018] "} onClick={handleToggleComprar}>
              COMPRAR
            </button>
            {
              <button className={toggleVender ? "   w-1/2  border-b-4  border-[#faa018]" : "text-white  w-1/2  "} onClick={handleToggleVender}>
                VENDER
              </button>
            }
          </div>
        </div>

        {singleWallet[0].coins.length > 0 && (
          <div className="  bg-[#3F3E45] rounded-lg p-5 flex-wrap  md:px-10 my-5  text-white">
            <div className="flex ">
              {coinsImgsAndData.map((valor) => {
                return (
                  <div key={valor.name} className="flex flex-col justify-center items-center relative h-12 w-12 ">
                    {/* <h2>{valor.name}</h2> */}
                    <img className="rounded-full w-10 h-10" src={valor.coinImg} alt={valor.name} />
                    <div className="absolute top-0 right-0 bg-[#6c7b90b7] transition-all shadow-md hover:ring-2 p-2 ring-[#6c7b904d] h-5 w-5 rounded-full flex justify-center items-center">
                      <h2>{formatter.format(valor.quantity)}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!toggleVender && <Intercambio venta={true} walletId={walletId} cryptoData={cryptoData} />}
        {toggleVender && <Intercambio venta={false} walletId={walletId} cryptoData={filteredCryptoData} />}
        <div className="flex gap-4 ">
          {!toggleVender && (
            <button
              onClick={() => comprar(walletId)}
              className="flex gap-5 justify-center items-center py-3 font-bold  bg-[#faa018] w-full rounded-xl shadow-md hover:ring-2  ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
            >
              <h2>COMPRAR</h2>
              <box-icon name="up-arrow-circle" color="#ffffff"></box-icon>
            </button>
          )}
          {toggleVender && (
            <button
              onClick={() => vender(walletId)}
              className=" flex gap-5 justify-center items-center py-3 font-bold  bg-[#faa018] w-full  rounded-xl shadow-md hover:ring-2   ring-[#faa018]  text-slate-200 hover:text-slate-100 transition-all"
            >
              <h2>VENDER</h2>
              <box-icon name="down-arrow-circle" color="#ffffff"></box-icon>
            </button>
          )}
        </div>
        <div className=" mt-10 ">
          {singleWallet[0].transactions.map((valor) => {
            return (
              <Transaccion
                key={valor.id}
                quantity={valor.quantity}
                walletId={walletId}
                id={valor.id}
                fecha={valor.fecha}
                type={valor.type}
                venta={valor.venta}
                value={valor.value}
                cryptoData={cryptoData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
