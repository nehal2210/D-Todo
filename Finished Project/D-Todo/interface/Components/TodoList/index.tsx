import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { TODO_ADDRESS } from "@/contracts/Address";
import { TODO_ABI } from "@/contracts/ABIS/TodoList";
import { getList } from "@/helper";
export default function TodoList({ data, setData, account }: any) {
  const toggleTask = async (id: Number) => {
    if (typeof window.ethereum !== "undefined" && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(TODO_ADDRESS, TODO_ABI, signer);
      try {
        let tx = await contract.toggleTask(id);
        await tx.wait();
        getTaskList();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getTaskList = async () => {
    const tasks = await getList();
    setData(tasks);
  };

  useEffect(() => {
    getTaskList();
  }, [account]);

  return (
    <>
      {data?.map((t: any, i) => {
        return (
          <>
            {t.work !== "" && (
              <li key={i}>
                {t.status ? <s>{t.work}</s> : t.work}
                <button
                  style={{ color: "lightgreen", margin: "5px" }}
                  onClick={() => toggleTask(i)}
                >
                  Done
                </button>
              </li>
            )}
          </>
        );
      })}
    </>
  );
}
