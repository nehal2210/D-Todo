import { useState } from "react";
import { ethers } from "ethers";
import { TODO_ADDRESS } from "@/contracts/Address";
import { TODO_ABI } from "@/contracts/ABIS/TodoList";
export default function AddTodo({ account }: any) {
  const [task, setTask] = useState();

  const creatTask = async () => {
    if (typeof window.ethereum !== "undefined" && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, signer);

      try {
        let tx = await contract.createTask(task, {
          value: ethers.utils.parseEther("0.1"),
        });
        await tx.wait();
        alert("task Added");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type={"text"}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task}
      />
      <button style={{ margin: "10px" }} onClick={creatTask}>
        Add Task
      </button>
    </div>
  );
}
