import { useEffect, useState } from "react";
import { getBalance, getContract, getReward } from "@/helper";
import { ethers } from "ethers";

export default function AddTodo() {
  const [task, setTask] = useState("");

  const creatTask = async () => {
    const contract = getContract();
    const tx = await contract.createTask(task, {
      value: ethers.utils.parseEther("0.1"),
    });
    await tx.wait();
  };

  useEffect(() => {
    const contract = getContract();
    contract.on("TaskCreated", (id, work, status) => {
      getReward();
      getBalance();
      alert("Task created at id ", id);
    });
  }, []);

  return (
    <>
      <input
        type={"text"}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task}
      ></input>
      <button onClick={creatTask}>Add task</button>
    </>
  );
}
