import { createPublicClient, http } from "viem";
import { filecoinHyperspace, gnosisChiado, polygonMumbai, scrollTestnet } from "viem/chains";
import { linea } from "@/static/lineaChain";
import { mantle } from "@/static/mantleChain";

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

const scrollPublicClient = createPublicClient({
  chain: scrollTestnet,
  transport: http()
});


const mantlePublicClient = createPublicClient({
  chain: mantle,
  transport: http()
});

const getPublicClientByChain = (chain) => {
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
    case scrollTestnet.name:
      walletClient = scrollPublicClient;
      break;
    case mantle.name:
      walletClient = mantlePublicClient;
      break;
    default:
      walletClient = polygonPublicClient;
  }

  return walletClient;
}

export {
  polygonPublicClient,
  gnosisChiadoPublicClient,
  fvmPublicClient,
  lineaPublicClient,
  scrollPublicClient,
  mantlePublicClient,
  getPublicClientByChain
}