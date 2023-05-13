export const mantle = {
  id: 5001,
  name: 'Mantle',
  network: 'mantle',
  nativeCurrency: {
    decimals: 18,
    name: 'Bit',
    symbol: 'BIT',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.mantle.xyz/'] },
    default: { http: ['https://rpc.testnet.mantle.xyz/'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://explorer.testnet.mantle.xyz/' },
    default: { name: 'SnowTrace', url: 'https://explorer.testnet.mantle.xyz/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 561333,
    },
  },
}