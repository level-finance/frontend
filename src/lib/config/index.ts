import velas from './velas.json';
import { Network } from '@level-finance/sdk';

export interface Config {
  key: string;
  chainId: Network;
  chainName: string;
  name: string;
  shortName: string;
  network: string;
  portisNetwork?: string;
  unknown: boolean;
  rpc: string;
  publicRpc?: string;
  ws: string;
  loggingRpc: string;
  explorer: string;
  explorerName: string;
  subgraph: string;
  poolsUrlV1: string;
  poolsUrlV2: string;
  subgraphs: {
    aave: string;
  };
  supportsEIP1559: boolean;
  supportsElementPools: boolean;
  nativeAsset: {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
    deeplinkId: string;
    logoURI: string;
    minTransactionBuffer: string;
  };
  addresses: {
    exchangeProxy: string;
    merkleRedeem: string;
    merkleOrchard: string;
    multicall: string;
    vault: string;
    weightedPoolFactory: string;
    stablePoolFactory: string;
    weth: string;
    stETH: string;
    wstETH: string;
    lidoRelayer: string;
    balancerHelpers: string;
    batchRelayer: string;
  };
  keys: Record<string, string>;
  strategies: Record<
    string,
    {
      type: string;
      name: string;
    }
  >;
}

const config: Record<Config['chainId'], Config> = {
  [Network.VELAS]: velas
};

export default config;
