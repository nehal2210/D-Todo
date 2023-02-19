import { getBalance, getReward } from "@/helper";
import { useEffect } from "react";

export default function Reward({ reward, setReward }) {
  const getRewards = async () => {
    const rew = await getReward();
    setReward(rew);
  };

  useEffect(() => {
    getRewards();
  }, []);

  return (
    <h2 style={{ textAlign: "left" }}>
      Complete Your tasks to get Rewards of Eth : {reward}
    </h2>
  );
}
