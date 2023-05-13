import {filecoinHyperspace, gnosisChiado, polygonMumbai} from "viem/chains";
import {linea} from "./lineaChain";

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