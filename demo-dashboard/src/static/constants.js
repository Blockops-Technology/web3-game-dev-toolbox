import { polygonMumbai, gnosisChiado, filecoinHyperspace, scrollTestnet } from 'viem/chains';
import { linea } from "@/static/lineaChain";
import { mantle } from "@/static/mantleChain";
const MNEMONIC = "salt add few marriage explain effort shrimp rail hungry mushroom pigeon choice";
const SUPPORTED_CHAINS = {
  POLYGON: polygonMumbai,
  GNOSIS: gnosisChiado,
  FVM: filecoinHyperspace,
  LINEA: linea,
  SCROLL: scrollTestnet,
  MANTLE: mantle,
}

export {
  MNEMONIC,
  SUPPORTED_CHAINS
}