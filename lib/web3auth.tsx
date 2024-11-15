import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";

import { getBlockExplorer, getChainId, getNetworkName, getNetworkToken, getNetworkUrl } from "@/utils/network";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ?? "";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: String(getChainId()),
  rpcTarget: getNetworkUrl(),
  displayName: getNetworkName(),
  blockExplorerUrl: getBlockExplorer(),
  ticker: getNetworkToken(),
  tickerName: getNetworkToken(),
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});
export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

export { decodeToken };
