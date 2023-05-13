import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { sendAssetToUser } from "sdk";
import { chainIdToChain } from "@/helpers/chainIdToChain";

const MintTokenFunctionality = () => {
  const [chainId, setChainId] = useState();
  const [userAddress, setUserAddress] = useState();
  const [assetAddress, setAssetAddress] = useState();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const handleChainIdChange = (e) => setChainId(e.target.value);
  const handleUserAddressChange = (e) => setUserAddress(e.target.value);
  const handleAssetAddressChange = (e) => setAssetAddress(e.target.value);
  const runVerifyOwnership = async () => {
    setLoading(true);
    const chain = chainIdToChain(chainId);
    const response = await sendAssetToUser(chain, userAddress, assetAddress);
    setResponse(response);
    setLoading(false);
  }

  return (
    <div className="p-9 my-10 rounded-lg bg-zinc-900 border border-zinc-700">
      <div className="mb-10">
        <p className="text-lg font-bold">Mint NFT for players</p>
      </div>

      <p className="mb-2">Chain ID:</p>
      <Input className="mb-5" value={chainId} onChange={handleChainIdChange} />
      <p className="mb-2">User Address:</p>
      <Input className="mb-5" value={userAddress} onChange={handleUserAddressChange} />
      <p className="mb-2">Asset Contract Address:</p>
      <Input value={assetAddress} onChange={handleAssetAddressChange} />

      <div className="my-7">
        <p className="mb-2">Response</p>
        <p>Transaction: {loading ? "Loading..." : response} </p>
      </div>

      <Button onClick={runVerifyOwnership}>Mint token</Button>
    </div>
  );
}

export default MintTokenFunctionality;