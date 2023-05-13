import { polygonMumbai, gnosisChiado, filecoinHyperspace, scrollTestnet } from 'viem/chains';
import { linea } from "@/static/lineaChain";
const MNEMONIC = "salt add few marriage explain effort shrimp rail hungry mushroom pigeon choice";
const SUPPORTED_CHAINS = {
  POLYGON: polygonMumbai,
  GNOSIS: gnosisChiado,
  FVM: filecoinHyperspace,
  LINEA: linea,
  SCROLL: scrollTestnet,
}

export {
  MNEMONIC,
  SUPPORTED_CHAINS
}