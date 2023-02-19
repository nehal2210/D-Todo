export default function Wallet({ account, setAccount }) {
  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const acc = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(acc);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {account ? (
        <h2>wallet connected {account}</h2>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </>
  );
}
