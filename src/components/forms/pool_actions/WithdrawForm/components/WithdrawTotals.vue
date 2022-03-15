<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { WithdrawMathResponse } from '../composables/useWithdrawMath';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';

/**
 * TYPES
 */
type Props = {
  math: WithdrawMathResponse;
};

/**
 * Props
 */
const props = defineProps<Props>();

/**
 * COMPOSABLES
 */
const { fNum2 } = useNumbers();

const { priceImpact, highPriceImpact, loadingAmountsOut } = toRefs(props.math);

/**
 * COMPUTED
 */
const priceImpactClasses = computed(() => ({
  'bg-red-500 text-white divide-red-400 border-none': highPriceImpact.value
}));
</script>

<template>
  <div :class="['flex text-xl font-bold', priceImpactClasses]">
    <div class="flex flex-grow items-center justify-between">
      {{ $t('priceImpact') }}
      <div class="flex items-center">
        <BalLoadingBlock v-if="loadingAmountsOut" class="w-10 h-6" />
        <span v-else>{{ fNum2(priceImpact, FNumFormats.percent) }}</span>

        <BalTooltip :text="$t('withdraw.tooltips.priceImpact')">
          <template v-slot:activator>
            <div class="flex items-center px-1">
              <BalIcon v-if="highPriceImpact" name="alert-triangle" size="sm" />
              <BalIcon v-else name="info" size="sm" class="text-gray-400" />
            </div>
          </template>
        </BalTooltip>
      </div>
    </div>
  </div>
</template>
