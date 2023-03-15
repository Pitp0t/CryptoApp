import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { nanoid } from "nanoid";
import { WalletContext } from "../../src/context/WalletContext";
import WalletProvider from "../../src/context/WalletContext";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("WalletProvider", () => {
  const mockedWallets = [
    { id: nanoid(), balance: 3000, transactions: [] },
    { id: nanoid(), balance: 5000, transactions: [] },
  ];

  it("renders without crashing", () => {
    render(
      <WalletProvider>
        <WalletContext.Consumer>{(value) => <p>Context value: {JSON.stringify(value)}</p>}</WalletContext.Consumer>
      </WalletProvider>
    );
  });

  it("test comprar function adds a value", () => {
    const { getByTestId } = render(
      <WalletProvider>
        <WalletContext.Consumer>
          {({ comprar, carterasCreada }) => (
            <div>
              <button onClick={() => comprar(1000, "BTC")} data-testid="comprar-btn">
                Comprar
              </button>
              <ul>
                {carterasCreada.map((wallet) => (
                  <div>
                    <li key={wallet.id}>
                      {wallet.id} - Balance: {wallet.balance}{" "}
                    </li>
                    <div>
                      <ul>
                        {" "}
                        {wallet.transactions.map((transaction) => (
                          <li key={transaction.id}>
                            {" "}
                            {transaction.id} - {transaction.value} - {transaction.venta}{" "}
                          </li>
                        ))}{" "}
                      </ul>
                    </div>{" "}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </WalletContext.Consumer>
      </WalletProvider>
    );
    fireEvent.click(getByTestId("comprar-btn"));
    // Expect length of transactions to be 1
    expect(screen.getAllByText(/1000/i)).toHaveLength(1);
    // Expect balance to be 4000
    expect(screen.getByText(/Balance: 4000/i)).toBeInTheDocument();
  });

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
    fireEvent.click(getByTestId("create-wallet-btn"));
    expect(screen.getByText(/Balance: 2000/i)).toBeInTheDocument();
  });

  it("deletes a wallet", () => {
    const { getByTestId } = render(
      <WalletProvider>
        <WalletContext.Consumer>
          {({ deleteWallet, carterasCreada }) => (
            <div>
              <button onClick={() => deleteWallet(mockedWallets[0].id)} data-testid="delete-wallet-btn">
                Delete Wallet
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
    fireEvent.click(getByTestId("delete-wallet-btn"));
    expect(screen.queryByText(/Balance: 3000/i)).not.toBeInTheDocument();
  });
});
