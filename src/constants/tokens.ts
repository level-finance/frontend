import { configService } from '@/services/config/config.service';

export const NATIVE_ASSET_ADDRESS = configService.network.nativeAsset.address;
export const DEFAULT_TOKEN_DECIMALS = 18;

export const TOKENS = {
  Popular: {
    Symbols: ['WBTC', 'DAI', 'USDC', 'WETH', 'WVLX']
  },
  AddressMap: {
    '1': {
      BAL: '0xba100000625a3754423978a60c9317c58a424e3d'
    }
  },
  Prices: {
    ChainMap: {
      /**
       * Addresses must be lower case and map from kovan to mainnet, e.g
       * [kovan address]: mainnet address
       */
      '106': {
        platformId: 'ethereum',
        tokens: {
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee':
            '0x8c543aed163909142695f2d2acd0d55791a9edb9',
          '0xc579d1f3cf86749e05cd06f7ade17856c2ce3126':
            '0x8c543aed163909142695f2d2acd0d55791a9edb9'
        }
      }
    },
    // TODO - remove once coingecko supports wstETH
    ExchangeRates: {
      wstETH: {
        stETH: 1.0352
      }
    }
  }
};
