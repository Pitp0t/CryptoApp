import React from "react";
import Homepage from "./pages/Homepage";
import Wallet from "./pages/Wallet";
import NotFound from "./pages/NotFound";

import { Route, Routes } from "react-router-dom";

import "./style.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/wallet/:walletId" element={<Wallet />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
