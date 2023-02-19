import { TODO_ABI } from "@/contracts/ABIS/TodoList";
import { TODO_ADDRESS } from "@/contracts/Address";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Reward({ account }: any) {
  const [reward, setReward] = useState("0");

  const getReward = async () => {
    if (typeof window.ethereum !== "undefined" && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, signer);
      const rew = await contract.getReward();
      setReward(ethers.utils.formatEther(rew));
    }
  };

  useEffect(() => {
    getReward();
  }, [account]);

  return <h3>Complete Task to earn Reward of Eth {reward}</h3>;
}
