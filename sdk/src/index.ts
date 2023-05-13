import { Chain } from "viem";
import GamingAssetContract from "./gamingAssetContract.json";
import { getWalletByChain } from "./adminWallet";
import { getPublicClientByChain } from "./publicClients";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import {chainIdToChain} from "./helpers";

export const sendAssetToUser = async (chain: Chain, userAddress: string, assetContractAddress: string) => {
  const wallet = getWalletByChain(chain);

  try {
    console.log(`Sending ${assetContractAddress} asset to user: ${userAddress} on ${chain.name}`);

    const tnxHash = await wallet.writeContract({
      address: assetContractAddress,
      abi: GamingAssetContract.abi,
      functionName: "mint",
      args: [userAddress],
    });

    console.log("Asset sent!");

    return tnxHash;
  } catch (e) {
    console.log("Asset sending failed");
    return e;
  }
}

export const verifyAccess = async (assetId: number, userAddress: string) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/assets/${assetId}`);

    const chain: Chain = chainIdToChain(data?.project?.chain);
    const wallet = getPublicClientByChain(chain);

    console.log(`Checking if user ${userAddress} has an asset from the contract ${data?.contractAddress} on ${chain.name}`);

    const response = await wallet.readContract({
      address: data?.contractAddress,
      abi: GamingAssetContract.abi,
      functionName: "balanceOf",
      args: [userAddress],
    });

    console.log("response", response);

    return response;
  } catch (e) {
    console.log("Check failed!");
    return e;
  }
}

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
