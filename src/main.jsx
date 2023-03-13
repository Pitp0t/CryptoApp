import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import WalletPorvider from "./context/WalletContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WalletPorvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WalletPorvider>
);
