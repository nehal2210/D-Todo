import { getBalance } from "@/helper";
import { useEffect } from "react";

export default function TotalValueLock({ totalValue, setTotalValue }) {
  const getTotalValue = async () => {
    const tvl = await getBalance();
    setTotalValue(tvl);
  };

  useEffect(() => {
    getTotalValue();
  }, []);

  return <h2 style={{ textAlign: "right" }}>TVL : {totalValue}</h2>;
}
