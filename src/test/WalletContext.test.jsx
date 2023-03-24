import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { nanoid } from "nanoid";
import { WalletContext } from "../../src/context/WalletContext";
import WalletProvider from "../../src/context/WalletContext";
import { fireEvent } from "@testing-library/dom";
import Modal from "../compontents/Modal";

import "@testing-library/jest-dom";

describe("WalletProvider", () => {
  const mockedWallets = [
    { id: "id1", balance: 3000, transactions: [] },
    { id: "id2", balance: 5000, transactions: [] },
  ];

  const selectedCoinDataMock = [
    { id: nanoid(), symbol: "BTC", name: "bitcoin", img: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880", price: "2" },
    { id: nanoid(), symbol: "ETH", name: "etherum", img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579", price: "1" },
  ];

  const singleCoin = [
    { id: nanoid(), symbol: "ETH", name: "bitcoin", img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579", price: "2" },
  ];

  const valueMock = 10;

  it("renders without crashing", () => {
    render(
      <WalletProvider>
        <WalletContext.Consumer>{(value) => <p>Context value: {JSON.stringify(value)}</p>}</WalletContext.Consumer>
      </WalletProvider>
    );
  });

  // it("test comprar function adds a value", () => {
  //   const { getByTestId } = render(
  //     <WalletProvider>
  //       <WalletContext.Consumer>
  //         {({ comprar, carterasCreada, setSelectedCoinData, setValue }) => (
  //           <div>
  //             <button onClick={() => comprar(mockedWallets[0].id)} data-testid="comprar-btn">
  //               Comprar
  //             </button>
  //             <button onClick={() => setSelectedCoinData(selectedCoinDataMock)} data-testid="selectCoinData-btn">
  //               SelectCoin
  //             </button>
  //             <button onClick={() => setValue(valueMock)} data-testid="setValue-btn">
  //               Set VALUE
  //             </button>
  //             <ul>
  //               {carterasCreada.map((wallet) => (
  //                 <div>
  //                   <li key={wallet.id}>
  //                     {wallet.id} - Balance: {wallet.balance}
  //                   </li>
  //                   <div>
  //                     <ul>
  //                       {wallet.transactions.map((transaction) => (
  //                         <li key={transaction.id}>
  //                           {transaction.id} - {transaction.value} - {transaction.venta}
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </div>
  //                 </div>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  //       </WalletContext.Consumer>
  //     </WalletProvider>
  //   );
  //   localStorage.setItem("wallets", JSON.stringify(mockedWallets));

  //   fireEvent.click(getByTestId("selectCoinData-btn"));
  //   fireEvent.click(getByTestId("setValue-btn"));
  //   fireEvent.click(getByTestId("comprar-btn"));
  //   // Expect length of transactions to be 1
  //   // expect(screen.getAllByText(/1000/i)).toHaveLength(1);
  //   // Expect balance to be 4000
  //   expect(screen.queryByText(/Balance/i)).toBeInTheDocument();
  // });

  it("creates a new wallet", () => {
    const { getByTestId } = render(
      <WalletProvider>
        <WalletContext.Consumer>
          {({ createWallet, carterasCreada }) => (
            <div>
              <button onClick={createWallet} data-testid="create-wallet-btn">
                Create Wallet
              </button>
              <ul>
                {carterasCreada.map((wallet) => (
                  <li key={wallet.id}>
                    {wallet.id} - Balance: {wallet.balance}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </WalletContext.Consumer>
      </WalletProvider>
    );
    localStorage.setItem("wallets", JSON.stringify([]));
    fireEvent.click(getByTestId("create-wallet-btn"));
    expect(screen.getByText(/Balance: 2000/i)).toBeInTheDocument();
  });

  it("Opens Modal", () => {
    const { getByTestId } = render(
      <WalletProvider>
        <WalletContext.Consumer>
          {({ setSelectedCoinData, selectedCoinData }) => (
            <Modal cryptoData={selectedCoinDataMock}>
              <button onClick={setSelectedCoinData(singleCoin)} data-testid="setCartera-btn">
                SetCoin
              </button>
              <h2>{selectedCoinData ? selectedCoinData[0].symbol.toUpperCase() : "COIN"}</h2>
            </Modal>
          )}
        </WalletContext.Consumer>
      </WalletProvider>
    );
    localStorage.setItem("wallets", JSON.stringify(mockedWallets));
    const button = screen.getByText(/SetCoin/i);
    fireEvent.click(button);
    expect(screen.queryByText(/BTC/i)).toBeDefined();
  });

  // it("deletes a wallet", () => {
  //   const { getByTestId } = render(
  //     <WalletProvider>
  //       <WalletContext.Consumer>
  //         {({ deleteWallet, carterasCreada, setCarterascreadas }) => (
  //           <div>
  //             <button onClick={() => setCarterascreadas([mockedWallets[0]])} data-testid="setCartera-btn">
  //               SetCarteras
  //             </button>

  //             <button onClick={() => deleteWallet("id1")} data-testid="delete-wallet-btn">
  //               Delete Wallet
  //             </button>

  //             <ul>
  //               {carterasCreada.map((wallet) => (
  //                 <li key={wallet.id}>
  //                   {wallet.id} - Balance: {wallet.balance}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  //       </WalletContext.Consumer>
  //     </WalletProvider>
  //   );

  //   fireEvent.click(getByTestId("setCartera-btn"));
  //   expect(screen.queryByText(/Balance:3000/i)).toBeInTheDocument();

  //   // fireEvent.click(getByTestId("delete-wallet-btn"));
  // });
});
