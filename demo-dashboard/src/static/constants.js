import { polygonMumbai, gnosisChiado, filecoinHyperspace } from 'viem/chains';
import { linea } from "@/static/lineaChain";
const MNEMONIC = "salt add few marriage explain effort shrimp rail hungry mushroom pigeon choice";
const SUPPORTED_CHAINS = {
  POLYGON: polygonMumbai,
  GNOSIS: gnosisChiado,
  FVM: filecoinHyperspace,
  LINEA: linea,
}

export {
  MNEMONIC,
  SUPPORTED_CHAINS
}