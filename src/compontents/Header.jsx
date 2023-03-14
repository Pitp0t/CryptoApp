import React, { useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar backdrop-blur  px-10 shadow justify-center items-center  text-xl fixed top-0  z-50 opacity-100  ">
      <div className="flex ">
        <NavLink className="headerLogo flex gap-2 font-bold text-xl py-2 px-5 rounded-xl text-white" to="/CryptoApp/">
          <box-icon name="coin-stack" color="#fbfbfb"></box-icon>
          CoinCrypto
        </NavLink>
      </div>
    </header>
  );
}
