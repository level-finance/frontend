import { ref } from 'vue';
import { Network } from '@level-finance/sdk';

/**
 * STATE
 */
const DEFAULT_NETWORK_ID =
  process.env.VUE_APP_NETWORK != null
    ? (Number(process.env.VUE_APP_NETWORK) as Network)
    : Network.VELAS;

export const networkId = ref<Network>(DEFAULT_NETWORK_ID);

export const isVelasMainnet = networkId.value === Network.VELAS;

/**
 * METHODS
 */
export function setNetworkId(id: Network) {
  networkId.value = id;
}

export default function useNetwork() {
  return {
    setNetworkId,
    networkId
  };
}
