import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { sendApeCoinHolder } from "sdk";

const SendApeHolderFunctionality = () => {
  const [userAddress, setUserAddress] = useState();
  const [amount, setAmount] = useState();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const handleUserAddressChange = (e) => setUserAddress(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const runVerifyApeHolder = async () => {
    setLoading(true);
    const parsedAmount = parseEther(amount);
    const response = await sendApeCoinHolder(userAddress, parsedAmount);
    console.log(response)
    setResponse(response);
    setLoading(false);
  }

  return (
    <div className="p-9 my-10 rounded-lg bg-zinc-900 border border-zinc-700">
      <div className="mb-10">
        <p className="text-lg font-bold">Verify ApeHolder</p>
        <p>Send ApeCoins to players hustle-free.</p>
      </div>

      <p className="mb-2">Send ApeCoins:</p>
      <Input className="mb-5" value={userAddress} onChange={handleUserAddressChange} />
      <p className="mb-2">Amount:</p>
      <Input className="mb-5" value={userAddress} onChange={handleAmountChange} />

      <div className="my-7">
        <p className="mb-2">Response</p>
        <p>Transaction: {loading ? "Loading..." : response} </p>
      </div>

      <Button onClick={runVerifyApeHolder}>Send ApeCoin to player</Button>
    </div>
  );
}

export default SendApeHolderFunctionality;