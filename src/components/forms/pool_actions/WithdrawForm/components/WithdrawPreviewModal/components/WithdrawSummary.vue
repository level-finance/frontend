<script setup lang="ts">
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import useUserSettings from '@/composables/useUserSettings';
import { FullPool } from '@/services/balancer/subgraph/types';

/**
 * TYPES
 */
type Props = {
  pool: FullPool;
  fiatTotal: string;
  priceImpact: number;
};

/**
 * PROPS & EMITS
 */
defineProps<Props>();

/**
 * COMPOSABLES
 */
const { fNum2 } = useNumbers();
const { currency } = useUserSettings();
</script>

<template>
  <div class="summary-table">
    <h6 class="p-3">
      {{ $t('summary') }}
    </h6>
    <div class="flex flex-col p-3">
      <div class="summary-table-row">
        <div class="summary-table-label">
          {{ $t('total') }}
        </div>
        <div class="summary-table-number">
          {{ fNum2(fiatTotal, FNumFormats.fiat) }}
          <BalTooltip
            :text="$t('tooltips.withdraw.total', [currency.toUpperCase()])"
            icon-size="sm"
            class="ml-2 flex items-center"
          />
        </div>
      </div>
      <div class="summary-table-row">
        <div class="summary-table-label">
          {{ $t('priceImpact') }}
        </div>
        <div class="summary-table-number">
          {{ fNum2(priceImpact, FNumFormats.percent) }}
          <BalTooltip
            :text="$t('tooltips.withdraw.priceImpact')"
            icon-size="sm"
            width="72"
            class="ml-2 flex items-center"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-table {
  @apply rounded-20px border-3 border-green divide-y-3 divide-green mt-4;
}

.summary-table-row {
  @apply grid grid-cols-2;
}

.summary-table-label {
  @apply flex items-center;
  @apply text-xl font-bold;
}

.summary-table-number {
  @apply flex items-center justify-end;
  @apply text-xl font-bold;
}
</style>
