import { TODO_ABI } from "@/contracts/ABIS/todolist";
import { TODO_CONTRACT_ADDRESS } from "@/contracts/Address";
import { ethers } from "ethers";

export const getContract = () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TODO_CONTRACT_ADDRESS,
      TODO_ABI,
      signer
    );

    return contract;
  }
};

export const getBalance = async () => {
  const contract = getContract();
  try {
    const tvl = await contract.getRevenue();
    return ethers.utils.formatEther(tvl);
  } catch (e) {
    console.log(e);
  }
};

export const getReward = async () => {
  const contract = getContract();
  try {
    const rew = await contract.getReward();
    return ethers.utils.formatEther(rew);
  } catch (e) {
    console.log(e);
  }
};

export const getTodos = async () => {
  const contract = getContract();
  try {
    const tasks = await contract.getTasks();
    return tasks;
  } catch (e) {
    console.log(e);
  }
};
