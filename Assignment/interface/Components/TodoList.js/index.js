import { getBalance, getReward, getTodos } from "@/helper";
import { useEffect } from "react";

export default function TodoList({ data, setData }) {
  const getData = async () => {
    const todos = await getTodos();
    setData(todos);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data?.map((task, i) => {
        return (
          <>
            <li key={i}>{task}</li>
            <button>Done</button>
          </>
        );
      })}
    </>
  );
}
