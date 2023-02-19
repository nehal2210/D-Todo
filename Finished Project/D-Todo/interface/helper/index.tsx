import { ethers } from "ethers";
import { TODO_ADDRESS } from "@/contracts/Address";
import { TODO_ABI } from "@/contracts/ABIS/TodoList";

export const getList = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, signer);
    try {
      const tasks = await contract.getTasks();

      return tasks;
    } catch (e) {
      console.log(e);
    }
  }
};
