import { filecoinHyperspace, gnosisChiado, polygonMumbai } from "viem/chains";
import { linea } from "./lineaChain";

const chainIdToChain = (chainId: number) => {
    switch (chainId) {
        case polygonMumbai.id:
            return polygonMumbai;
        case gnosisChiado.id:
            return gnosisChiado;
        case filecoinHyperspace.id:
            return filecoinHyperspace;
        case linea.id:
            return linea;
        default:
            return polygonMumbai;
    }
}

export {
    chainIdToChain
}