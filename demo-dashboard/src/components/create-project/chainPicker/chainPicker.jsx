import ChainCard from "@/components/create-project/chainCard/chainCard";
import { SUPPORTED_CHAINS } from "@/static/constants";

const ChainPicker = ({selectedChain, setSelectedChain}) => {
  const handleChainSelect = (chain) => setSelectedChain(chain);

  return (
    <>
      <p className="mt-10 mb-2">Deploy assets to:</p>
      <div className="mb-10 grid grid-cols-2 gap-4">
        <ChainCard
          chain={SUPPORTED_CHAINS.POLYGON}
          active={selectedChain.name === SUPPORTED_CHAINS.POLYGON.name}
          onClick={handleChainSelect}
          chainLogo="/images/polygon-logo.svg"
        />
        <ChainCard
          chain={SUPPORTED_CHAINS.GNOSIS}
          active={selectedChain.name === SUPPORTED_CHAINS.GNOSIS.name}
          onClick={handleChainSelect}
          chainLogo="/images/gnosis-chain-logo.svg"
        />
        <ChainCard
          chain={SUPPORTED_CHAINS.FVM}
          active={selectedChain.name === SUPPORTED_CHAINS.FVM.name}
          onClick={handleChainSelect}
          chainLogo="/images/fvm-logo.svg"
        />
        <ChainCard
          chain={SUPPORTED_CHAINS.LINEA}
          active={selectedChain.name === SUPPORTED_CHAINS.LINEA.name}
          onClick={handleChainSelect}
          chainLogo="/images/linea-logo.svg"
        />
        <ChainCard
          chain={SUPPORTED_CHAINS.SCROLL}
          active={selectedChain.name === SUPPORTED_CHAINS.SCROLL.name}
          onClick={handleChainSelect}
          chainLogo="/images/scroll-logo.png"
        />
        <ChainCard
          chain={SUPPORTED_CHAINS.MANTLE}
          active={selectedChain.name === SUPPORTED_CHAINS.MANTLE.name}
          onClick={handleChainSelect}
          chainLogo="/images/mantle-logo.svg"
        />
      </div>
    </>
  );
}

export default ChainPicker;