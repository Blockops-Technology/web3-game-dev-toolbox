import { fvmWalletClient, gnosisChiadoWalletClient, lineaWalletClient, polygonWalletClient } from "@/lib/adminWallet";
import GamingAssetContract from "@/static/gamingAssetContract.json";
import { filecoinHyperspace, gnosisChiado, polygonMumbai } from "viem/chains";
import { linea } from "@/static/lineaChain";

const deployGamingAssetContract = async (chain, assetName, symbol, tokenUrl) => {
  let walletClient;

  switch (chain.name) {
    case polygonMumbai.name:
      walletClient = polygonWalletClient;
      break;
    case gnosisChiado.name:
      walletClient = gnosisChiadoWalletClient;
      break;
    case filecoinHyperspace.name:
      walletClient = fvmWalletClient;
      break;
    case linea.name:
      walletClient = lineaWalletClient;
      break;
    default:
      walletClient = polygonWalletClient;
  }

  return  walletClient.deployContract({
    abi: GamingAssetContract.abi,
    args: [assetName, symbol, tokenUrl],
    bytecode: GamingAssetContract.bytecode,
  })
}

export {
  deployGamingAssetContract
}