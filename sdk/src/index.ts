import { Chain } from "viem";
import GamingAssetContract from "./gamingAssetContract.json";
import { getWalletByChain } from "./adminWallet";
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
export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
