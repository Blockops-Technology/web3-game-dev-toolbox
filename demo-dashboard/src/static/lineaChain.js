export const linea = {
  id: 59140,
  name: 'Linea',
  network: 'linea',
  nativeCurrency: {
    decimals: 18,
    name: 'Linea',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.goerli.linea.build'] },
    default: { http: ['https://rpc.goerli.linea.build'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://explorer.goerli.linea.build' },
    default: { name: 'SnowTrace', url: 'https://explorer.goerli.linea.build' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 498623,
    },
  },
}