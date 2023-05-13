import {filecoinHyperspace, gnosisChiado, polygonMumbai} from "viem/chains";
import {linea} from "./lineaChain";

const MNEMONIC = "salt add few marriage explain effort shrimp rail hungry mushroom pigeon choice";
const BACKEND_URL = "http://localhost:3003"

const SUPPORTED_CHAINS = {
  POLYGON: polygonMumbai,
  GNOSIS: gnosisChiado,
  FVM: filecoinHyperspace,
  LINEA: linea,
}

export {
  MNEMONIC,
  SUPPORTED_CHAINS,
  BACKEND_URL
}