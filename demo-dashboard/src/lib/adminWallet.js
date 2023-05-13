import { createWalletClient, http } from 'viem'
import { filecoinHyperspace, gnosisChiado, polygonMumbai, scrollTestnet } from 'viem/chains';
import { mnemonicToAccount } from "viem/accounts";
import { MNEMONIC } from "@/static/constants";
import { linea } from "@/static/lineaChain";
import { mantle } from "@/static/mantleChain";

const account = mnemonicToAccount(MNEMONIC);

// viem add chain and switch chain not working for some reason
// Not to lose precious hackathon time creating instance of a wallet for every chain
// Otherwise should be done inside chain picker
const polygonWalletClient = createWalletClient({
  account,
  chain: polygonMumbai,
  transport: http()
});

const gnosisChiadoWalletClient = createWalletClient({
  account,
  chain: gnosisChiado,
  transport: http()
});

const fvmWalletClient = createWalletClient({
  account,
  chain: filecoinHyperspace,
  transport: http()
});

const lineaWalletClient = createWalletClient({
  account,
  chain: linea,
  transport: http()
});

const scrollWalletClient = createWalletClient({
  account,
  chain: scrollTestnet,
  transport: http()
});

const mantleWalletClient = createWalletClient({
  account,
  chain: mantle,
  transport: http()
});

const getWalletByChain = (chain) => {
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

  return walletClient;
}

export {
  polygonWalletClient,
  gnosisChiadoWalletClient,
  fvmWalletClient,
  lineaWalletClient,
  scrollWalletClient,
  mantleWalletClient,
  getWalletByChain,
}