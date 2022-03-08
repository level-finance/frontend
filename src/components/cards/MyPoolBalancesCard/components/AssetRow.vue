<script setup lang="ts">
import { computed } from 'vue';
import useTokens from '@/composables/useTokens';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';

/**
 * TYPES
 */
type Props = {
  address: string;
  balance: string;
};

/**
 * PROPS
 */
const props = defineProps<Props>();

/**
 * COMPOSABLES
 */
const { getToken } = useTokens();
const { fNum2, toFiat } = useNumbers();

/**
 * COMPUTED
 */
const token = computed(() => getToken(props.address));

const balanceLabel = computed(() => fNum2(props.balance, FNumFormats.token));

const fiatLabel = computed(() => {
  const fiatValue = toFiat(props.balance, props.address);
  if (Number(fiatValue) === 0 && Number(props.balance) > 0) {
    return '-';
  } else {
    return fNum2(fiatValue, FNumFormats.fiat);
  }
});
</script>

<template>
  <div class="flex justify-between">
    <div class="flex flex-col">
      <span class="text-xl font-bold">
        {{ token.symbol }}
      </span>
      <span
        v-if="token.name !== token.symbol"
        class="text-base text-black font-normal"
      >
        {{ token.name }}
      </span>
    </div>

    <div class="flex flex-col text-right">
      <span class="text-xl font-bold">
        {{ balanceLabel }}
      </span>
      <span class="text-base text-black font-normal">
        {{ fiatLabel }}
      </span>
    </div>
  </div>
</template>
