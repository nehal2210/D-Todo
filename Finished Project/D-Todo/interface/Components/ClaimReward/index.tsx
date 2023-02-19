import { TODO_ABI } from "@/contracts/ABIS/TodoList";
import { TODO_ADDRESS } from "@/contracts/Address";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function ClaimReward({ account }: any) {
  const claimReward = async () => {
    if (typeof window.ethereum !== "undefined" && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, signer);
      const tx = await contract.TodosCompleted();
      await tx.wait();
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, provider);
    contract.on("TaskComplete", (reward) => {
      alert(`Congratulations You got  ${ethers.utils.formatEther(reward)}`);
    });
  }, []);

  return (
    <div style={{ margin: "25px" }}>
      <p>Complete all tasks to claim reward</p>
      <button onClick={claimReward}>Claim Reward</button>
    </div>
  );
}
