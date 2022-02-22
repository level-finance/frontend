export interface TokenListMap {
  Balancer: {
    Default: string;
    Vetted: string;
  };
  External: string[];
}

interface TokenListMapByNetwork {
  [networkKey: string]: TokenListMap;
}

/**
 * Mapping of the TokenLists used on each network
 */
export const TOKEN_LIST_MAP: TokenListMapByNetwork = {
  '106': {
    Balancer: {
      Default:
        'https://raw.githubusercontent.com/level-finance/frontend/master/public/json/velas.vetted.tokenlist.json',
      Vetted:
        'https://raw.githubusercontent.com/level-finance/frontend/master/public/json/velas.vetted.tokenlist.json'
    },
    External: []
  }
};
