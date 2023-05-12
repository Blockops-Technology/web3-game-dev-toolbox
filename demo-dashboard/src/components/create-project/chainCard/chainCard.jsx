const ChainCard = ({chain, active, chainLogo, onClick}) => {
  const handleClick = async () => {
    onClick(chain);
  }

  return (
    <div
      onClick={handleClick}
      className={`p-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700 hover:border-white hover:cursor-pointer ${active && "border-white"}`}
    >
      <img className="max-h-[35px]" src={chainLogo} alt={chain + " logo"} />
    </div>
  );
}

export default ChainCard;