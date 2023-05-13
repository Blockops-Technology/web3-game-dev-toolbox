import { Chain } from "viem";
import GamingAssetContract from "./gamingAssetContract.json";
import ERC20Contract from "./erc20Contract.json";
import { ethereumWalletClient, getWalletByChain } from "./adminWallet";
import { ethereumPublicClient, getPublicClientByChain } from "./publicClients";
import axios from "axios";
import { BACKEND_URL, APECOIN_ADDRESS } from "./constants";
import { chainIdToChain } from "./helpers";

export const sendAssetToUser = async (assetId: number, userAddress: string) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/assets/${assetId}`);

    const chain: Chain = chainIdToChain(data?.project?.chain);
    const wallet = getWalletByChain(chain);

    console.log(`Sending ${data?.contractAddress} asset to user: ${userAddress} on ${chain.name}`);

    const response = await wallet.writeContract({
      address: data?.contractAddress,
      abi: GamingAssetContract.abi,
      functionName: "mint",
      args: [userAddress],
    });

    console.log("Asset sent!");

    console.log("response", response);

    return response;
  } catch (e) {
    console.log("Asset sending failed!");
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

export const verifyApeCoinHolder = async (address: string) => {
  return ethereumPublicClient.readContract({
    address: APECOIN_ADDRESS,
    abi: ERC20Contract.abi,
    functionName: "balanceOf",
    args: [address],
  });
}

export const sendApeCoinHolder = async (address: string, value: number) => {
  return ethereumWalletClient.writeContract({
    address: APECOIN_ADDRESS,
    abi: ERC20Contract.abi,
    functionName: "transfer",
    args: [address, value],
  });
}

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
