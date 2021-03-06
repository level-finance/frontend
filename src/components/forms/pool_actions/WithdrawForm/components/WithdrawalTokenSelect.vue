<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
// Types
import { FullPool } from '@/services/balancer/subgraph/types';
import { TokenInfo } from '@/types/TokenList';
// Composables
import useTokens from '@/composables/useTokens';
import useWithdrawalState from '../composables/useWithdrawalState';
import { usePool } from '@/composables/usePool';

/**
 * TYPES
 */
type Props = {
  pool: FullPool;
  initToken?: string;
};

/**
 * Props
 */
const props = withDefaults(defineProps<Props>(), {
  initToken: 'all'
});

/**
 * STATE
 */
const selectedOption = ref(props.initToken);

/**
 * COMPOSABLES
 */
const { getTokens, getToken, nativeAsset } = useTokens();
const { isProportional, tokenOut } = useWithdrawalState(toRef(props, 'pool'));
const { isWethPool, isStablePhantomPool } = usePool(toRef(props, 'pool'));

/**
 * COMPUTED
 */
const tokenAddresses = computed(() => {
  if (isStablePhantomPool.value) return props.pool?.mainTokens || [];
  if (isWethPool.value)
    return [nativeAsset.address, ...props.pool.tokenAddresses];
  return props.pool.tokenAddresses;
});

const tokens = computed(() => getTokens(tokenAddresses.value));

const options = computed(() => ['all', ...tokenAddresses.value]);

const selectedToken = computed((): TokenInfo => getToken(selectedOption.value));

const assetSetWidth = computed(
  () => 40 + (tokenAddresses.value.length - 2) * 10
);

/**
 * METHODS
 */
function handleSelected(newToken: string): void {
  if (newToken === 'all') {
    isProportional.value = true;
    selectedOption.value = 'all';
  } else {
    isProportional.value = false;
    selectedOption.value = newToken;
    tokenOut.value = newToken;
  }
}
</script>

<template>
  <BalDropdown :options="options" minWidth="4" @selected="handleSelected">
    <template #activator>
      <BalBtn size="sm+" :color="'orange'" :textColor="'black'">
        <div>
          <BalAssetSet
            v-if="isProportional"
            :addresses="tokenAddresses"
            :width="50"
          />
          <BalAsset v-else :address="selectedToken.address" class="mr-2" />
        </div>
        <span class="text-xl font-bold">
          <span v-if="isProportional">All tokens</span>
          <span v-else>{{ selectedToken.symbol }}</span>
        </span>
        <BalIcon name="chevron-down" size="md" class="text-green ml-2" />
      </BalBtn>
    </template>
    <template #option="{ option }">
      <div v-if="option === 'all'" class="flex items-center justify-between">
        <div class="flex items-center">
          <div>
            <BalAssetSet :addresses="tokenAddresses" :width="assetSetWidth" />
          </div>
          {{ $t('allTokens') }}
        </div>
        <BalIcon
          v-if="selectedOption === option"
          name="check"
          class="text-green ml-2"
        />
      </div>
      <div v-else class="flex items-center justify-between">
        <div class="flex items-center">
          <BalAsset :address="option" class="mr-2" />
          {{ tokens[option]?.symbol }}
        </div>
        <BalIcon
          v-if="selectedOption === option"
          name="check"
          class="text-green ml-2"
        />
      </div>
    </template>
  </BalDropdown>
</template>

<style scoped>
.token-select-input {
  @apply rounded-20px flex items-center h-10 px-2 whitespace-nowrap;
}
</style>
