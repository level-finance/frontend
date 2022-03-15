<script setup lang="ts">
import { configService } from '@/services/config/config.service';
// Composables
import usePoolTransfers from '@/composables/contextual/pool-transfers/usePoolTransfers';
import WithdrawForm from '@/components/forms/pool_actions/WithdrawForm/WithdrawForm.vue';
import TradeSettingsPopover, {
  TradeSettingsContext
} from '@/components/popovers/TradeSettingsPopover.vue';

/**
 * STATE
 */
const { network } = configService;
const { pool, loadingPool, transfersAllowed } = usePoolTransfers();
</script>

<template>
  <div>
    <BalLoadingBlock v-if="loadingPool || !transfersAllowed" class="h-96" />
    <BalCard v-else exposeOverflow>
      <template #header>
        <div class="w-full">
          <div class="text-base text-black leading-none">
            {{ network.chainName }}
          </div>
          <div class="flex items-center justify-between">
            <h6 class="font-secondary font-normal">
              {{
                $t('withdrawFromPool')
                  .toLowerCase()
                  .replace('a', 'A')
              }}
            </h6>
            <TradeSettingsPopover :context="TradeSettingsContext.invest" />
          </div>
        </div>
      </template>
      <WithdrawForm :pool="pool" />
    </BalCard>
  </div>
</template>
