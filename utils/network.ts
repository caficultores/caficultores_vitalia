export enum Network {
  POLYGON_AMOY = 'polygon-amoy',
  POLYGON = 'polygon',
  ETHEREUM_SEPOLIA = 'ethereum-sepolia',
  ETHEREUM = 'ethereum',
  ETHERLINK_TESTNET = 'etherlink-testnet',
  ZKSYNC = 'zksync',
  ZKSYNC_SEPOLIA = 'zksync-sepolia',
  BASE_SEPOLIA = 'base-sepolia',
  BASE = 'base',
}

export const getNetworkUrl = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return 'https://polygon-rpc.com/';
    case Network.POLYGON_AMOY:
      return 'https://rpc-amoy.polygon.technology/';
    case Network.ETHEREUM_SEPOLIA:
      return 'https://eth-sepolia.g.alchemy.com/v2/fYFybLQFR9Zr2GCRcgALmAktStFKr0i0';
    case Network.ETHEREUM:
      return 'https://eth-mainnet.g.alchemy.com/v2/fYFybLQFR9Zr2GCRcgALmAktStFKr0i0';
    case Network.ETHERLINK_TESTNET:
      return 'https://node.ghostnet.etherlink.com';
    case Network.ZKSYNC:
      return 'https://mainnet.era.zksync.io';
    case Network.ZKSYNC_SEPOLIA:
      return 'https://sepolia.era.zksync.dev';
    case Network.BASE_SEPOLIA:
      return 'https://sepolia.base.org';
    case Network.BASE:
      return 'https://mainnet.base.org';
    default:
      throw new Error('Network not supported');
  }
};

export const getChainId = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return `0x${Number(137).toString(16)}`;
    case Network.POLYGON_AMOY:
      return `0x${Number(80002).toString(16)}`;
    case Network.ETHEREUM_SEPOLIA:
      return `0x${Number(11155111).toString(16)}`;
    case Network.ZKSYNC:
      return `0x${Number(324).toString(16)}`;
    case Network.ZKSYNC_SEPOLIA:
      return `0x${Number(300).toString(16)}`;
    case Network.ETHEREUM:
      return `0x${Number(1).toString(16)}`;
    case Network.ETHERLINK_TESTNET:
      return `0x${Number(128123).toString(16)}`;
    case Network.BASE_SEPOLIA:
      return `0x${Number(84532).toString(16)}`;
    case Network.BASE:
      return `0x${Number(8453).toString(16)}`;
  }
};

export const getNetworkToken = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON_AMOY:
    case Network.POLYGON:
      return 'MATIC';
    case Network.ETHEREUM:
    case Network.ETHEREUM_SEPOLIA:
    case Network.ZKSYNC:
    case Network.ZKSYNC_SEPOLIA:
    case Network.BASE_SEPOLIA:
    case Network.BASE:
      return 'ETH';
    case Network.ETHERLINK_TESTNET:
      return 'XTZ';
  }
};

export const getFaucetUrl = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON_AMOY:
      return 'https://faucet.polygon.technology/';
    case Network.ETHEREUM_SEPOLIA:
      return 'https://sepoliafaucet.com/';
    case Network.ETHERLINK_TESTNET:
      return 'https://faucet.etherlink.com/';
    case Network.ZKSYNC_SEPOLIA:
      return 'https://faucet.quicknode.com/ethereum/sepolia';
  }
};

export const getNetworkName = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return 'Polygon (Mainnet)';
    case Network.POLYGON_AMOY:
      return 'Polygon (Amoy)';
    case Network.ETHEREUM_SEPOLIA:
      return 'Ethereum (Sepolia)';
    case Network.ETHEREUM:
      return 'Ethereum (Mainnet)';
    case Network.ETHERLINK_TESTNET:
      return 'Etherlink (Testnet)';
    case Network.ZKSYNC:
      return 'zkSync (Mainnet)';
    case Network.ZKSYNC_SEPOLIA:
      return 'zkSync (Sepolia)';
    case Network.BASE_SEPOLIA:
      return 'Base (Sepolia)';
    case Network.BASE:
      return 'Base (Mainnet)';
  }
};

export const getBlockExplorer = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return 'https://polygonscan.com';
    case Network.POLYGON_AMOY:
      return 'https://www.oklink.com/amoy';
    case Network.ETHEREUM:
      return 'https://etherscan.io';
    case Network.ETHEREUM_SEPOLIA:
      return 'https://sepolia.etherscan.io';
    case Network.ETHERLINK_TESTNET:
      return 'https://testnet-explorer.etherlink.com';
    case Network.ZKSYNC:
      return 'https://explorer.zksync.io';
    case Network.ZKSYNC_SEPOLIA:
      return 'https://sepolia.explorer.zksync.io';
    case Network.BASE_SEPOLIA:
      return 'https://sepolia-explorer.base.org';
    case Network.BASE:
      return 'https://base.blockscout.com';
  }
};

export const isEip1559Supported = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
    case Network.POLYGON_AMOY:
    case Network.ETHEREUM_SEPOLIA:
    case Network.ETHEREUM:
    case Network.ZKSYNC:
    case Network.ZKSYNC_SEPOLIA:
      return true;
    case Network.ETHERLINK_TESTNET:
      return false;
  }
};
