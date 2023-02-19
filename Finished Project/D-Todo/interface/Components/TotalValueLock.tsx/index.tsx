import { TODO_ABI } from "@/contracts/ABIS/TodoList";
import { TODO_ADDRESS } from "@/contracts/Address";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function TotalValueLock({ account }: any) {
  const [balance, setBalance] = useState("0");

  const getBalance = async () => {
    if (typeof window.ethereum !== "undefined" && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, signer);
      const rew = await contract.getBalance();
      setBalance(ethers.utils.formatEther(rew));
    }
  };

  useEffect(() => {
    getBalance();
  }, [account]);

  return <h3 style={{ textAlign: "right" }}>TVL {balance}</h3>;
}
