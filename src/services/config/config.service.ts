import { Config } from '@/lib/config';
import configs from '@/lib/config';
import template from '@/lib/utils/template';
import { networkId } from '@/composables/useNetwork';
import { Network } from '@level-finance/sdk';

interface Env {
  APP_ENV: string;
  NETWORK: Network;
  APP_DOMAIN: string;
  IPFS_NODE: string;
  BLOCKNATIVE_DAPP_ID: string;
  PORTIS_DAPP_ID: string;
  ENABLE_STABLE_POOLS: boolean;
}

export default class ConfigService {
  public get env(): Env {
    return {
      APP_ENV: process.env.VUE_APP_ENV || 'development',
      NETWORK: networkId.value,
      APP_DOMAIN: process.env.VUE_APP_DOMAIN || 'lvl.finance',
      IPFS_NODE: process.env.VUE_APP_IPFS_NODE || 'cloudflare-ipfs.com',
      BLOCKNATIVE_DAPP_ID:
        process.env.VUE_APP_BLOCKNATIVE_DAPP_ID || 'MISSING_KEY',
      ENABLE_STABLE_POOLS: process.env.VUE_APP_ENABLE_STABLE_POOLS === 'true',
      PORTIS_DAPP_ID: process.env.VUE_APP_PORTIS_DAPP_ID || 'MISSING_KEY'
    };
  }

  public get network(): Config {
    return configs[networkId.value];
  }

  public getNetworkConfig(key: Network): Config {
    if (!Object.keys(configs).includes(key.toString()))
      throw new Error(`No config for network key: ${key}`);
    return configs[key];
  }

  public get rpc(): string {
    return template(this.network.rpc, this.network.keys);
  }

  public get ws(): string {
    return template(this.network.ws, this.network.keys);
  }

  public get loggingRpc(): string {
    return template(this.network.loggingRpc, this.network.keys);
  }
}

export const configService = new ConfigService();
