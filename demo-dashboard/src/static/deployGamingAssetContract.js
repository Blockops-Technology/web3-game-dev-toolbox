import {
  fvmWalletClient,
  gnosisChiadoWalletClient,
  lineaWalletClient,
  mantleWalletClient,
  polygonWalletClient,
  scrollWalletClient
} from "@/lib/adminWallet";
import GamingAssetContract from "@/static/gamingAssetContract.json";
import { filecoinHyperspace, gnosisChiado, polygonMumbai, scrollTestnet } from "viem/chains";
import { linea } from "@/static/lineaChain";
import { mantle } from "@/static/mantleChain";

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
    case scrollTestnet.name:
      walletClient = scrollWalletClient;
      break;
    case mantle.name:
      walletClient = mantleWalletClient;
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