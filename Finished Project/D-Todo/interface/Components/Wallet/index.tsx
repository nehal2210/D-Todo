import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Wallet({ account, setAccount }: any) {
  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const a = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(a);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      {account ? (
        <h3>Wallet connected at : {account}</h3>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </>
  );
}
