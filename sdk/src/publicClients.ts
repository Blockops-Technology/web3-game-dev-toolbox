import {Chain, createPublicClient, http} from "viem";
import {filecoinHyperspace, gnosisChiado, mainnet, polygonMumbai} from "viem/chains";
import { linea } from "./lineaChain";

const ethereumPublicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

const polygonPublicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http()
});

const gnosisChiadoPublicClient = createPublicClient({
  chain: gnosisChiado,
  transport: http()
});

const fvmPublicClient = createPublicClient({
  chain: filecoinHyperspace,
  transport: http()
});

const lineaPublicClient = createPublicClient({
  chain: linea,
  transport: http()
});

const getPublicClientByChain = (chain: Chain) => {
  let walletClient;

  switch (chain.name) {
    case polygonMumbai.name:
      walletClient = polygonPublicClient;
      break;
    case gnosisChiado.name:
      walletClient = gnosisChiadoPublicClient;
      break;
    case filecoinHyperspace.name:
      walletClient = fvmPublicClient;
      break;
    case linea.name:
      walletClient = lineaPublicClient;
      break;
    default:
      walletClient = polygonPublicClient;
  }

  return walletClient;
}

export {
  ethereumPublicClient,
  polygonPublicClient,
  gnosisChiadoPublicClient,
  fvmPublicClient,
  lineaPublicClient,
  getPublicClientByChain
}