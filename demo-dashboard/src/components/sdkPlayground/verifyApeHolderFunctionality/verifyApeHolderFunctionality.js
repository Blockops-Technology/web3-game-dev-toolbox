import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { verifyApeCoinHolder } from "sdk";

const VerifyApeHolderFunctionality = () => {
  const [userAddress, setUserAddress] = useState();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const handleUserAddressChange = (e) => setUserAddress(e.target.value);
  const runVerifyApeHolder = async () => {
    setLoading(true);
    const response = await verifyApeCoinHolder(userAddress);
    console.log(Number(response))
    setResponse(Number(response));
    setLoading(false);
  }

  return (
    <div className="p-9 my-10 rounded-lg bg-zinc-900 border border-zinc-700">
      <div className="mb-10">
        <p className="text-lg font-bold">Verify ApeHolder</p>
        <p>Verify that player is ApeHolder.</p>
      </div>

      <p className="mb-2">Player Address:</p>
      <Input className="mb-5" value={userAddress} onChange={handleUserAddressChange} />

      <div className="my-7">
        <p className="mb-2">Response</p>
        <p>{
          loading ?
            "Loading..." :
            response > 0 ?
              "Player is ApeCoin holder" :
              "Not an ApeCoin holder, must be Pepe fan"
        } </p>
      </div>

      <Button onClick={runVerifyApeHolder}>Verify</Button>
    </div>
  );
}

export default VerifyApeHolderFunctionality;