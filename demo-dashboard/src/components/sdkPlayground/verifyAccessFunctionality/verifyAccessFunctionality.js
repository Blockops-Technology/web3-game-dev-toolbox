import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { verifyAccess } from "sdk";
import { chainIdToChain } from "@/helpers/chainIdToChain";

const VerifyAccessFunctionality = () => {
  const [assetId, setAssetId] = useState();
  const [userAddress, setUserAddress] = useState();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const handleAssetIdChange = (e) => setAssetId(e.target.value);
  const handleUserAddressChange = (e) => setUserAddress(e.target.value);
  const runVerifyOwnership = async () => {
    setLoading(true);
    const response = await verifyAccess(assetId, userAddress);
    console.log(Number(response))
    setResponse(Number(response));
    setLoading(false);
  }

  return (
    <div className="p-9 my-10 rounded-lg bg-zinc-900 border border-zinc-700">
      <div className="mb-10">
        <p className="text-lg font-bold">Token gating</p>
        <p>Verify access by verifying if player holds enough of required tokens</p>
      </div>

      <p className="mb-2">Asset ID:</p>
      <Input className="mb-5" value={assetId} onChange={handleAssetIdChange} />
      <p className="mb-2">Player Address:</p>
      <Input className="mb-5" value={userAddress} onChange={handleUserAddressChange} />

      <div className="my-7">
        <p className="mb-2">Response</p>
        <p>Player owns required assets: {loading ? "Loading..." : response} </p>
      </div>

      <Button onClick={runVerifyOwnership}>Verify</Button>
    </div>
  );
}

export default VerifyAccessFunctionality;