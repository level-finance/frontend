<template>
  <BalPopover no-pad>
    <template v-slot:activator>
      <BalBtn class="group mr-2 p-2 relative" size="sm+">
        <ActivityIcon v-if="pendingTransactions.length === 0" />
        <!-- TODO -->
        <ActivityCounter v-else :count="pendingTransactions.length" />
      </BalBtn>
    </template>
    <BalCard class="w-72" noPad noBorder>
      <template v-slot:header>
        <div
          class="pt-5 px-6 pb-5 w-full flex items-center justify-center capitalize"
        >
          <h5 class="text-lg font-secondary">
            {{ $t('recentActivityTitle') }}
          </h5>
        </div>
      </template>
      <div
        :class="[
          'mt-2 px-6 pb-5 text-gray-dark text-sm font-bold',
          { 'h-72 overflow-auto': transactions.length > 5 }
        ]"
      >
        <template v-if="transactions.length > 0">
          <ActivityRows
            v-if="pendingTransactions.length > 0"
            class="activity-row"
            :transactions="pendingTransactions"
            :get-explorer-link="getExplorerLink"
            :is-successful-transaction="isSuccessfulTransaction"
            :is-pending-transaction-status="isPendingTransactionStatus"
            :cancel-order="cancelOrder"
          />
          <div
            v-if="
              pendingTransactions.length > 0 && finalizedTransactions.length > 0
            "
            class="bg-gray-100 dark:bg-gray-700 my-3 h-px"
          />
          <ActivityRows
            v-if="finalizedTransactions.length > 0"
            class="activity-row"
            :transactions="finalizedTransactions"
            :get-explorer-link="getExplorerLink"
            :is-successful-transaction="isSuccessfulTransaction"
            :is-pending-transaction-status="isPendingTransactionStatus"
            :cancel-order="cancelOrder"
          />
        </template>
        <template v-else>{{ $t('noRecentActivity') }}</template>
      </div>
      <template v-if="transactions.length > 0" v-slot:footer>
        <div
          class="flex justify-center w-full px-6 pb-5 rounded-b-lg bg-white dark:bg-gray-800 text-lg"
        >
          <a @click="clearAllTransactions()" class="text-green-dark">
            {{ $t('clearTransactions') }}
          </a>
        </div>
      </template>
    </BalCard>
  </BalPopover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import useBreakpoints from '@/composables/useBreakpoints';
import useTransactions from '@/composables/useTransactions';
import useNotifications from '@/composables/useNotifications';

import useWeb3 from '@/services/web3/useWeb3';
import { signOrderCancellation } from '@/services/gnosis/signing';
import { gnosisProtocolService } from '@/services/gnosis/gnosisProtocol.service';

import ActivityCounter from './ActivityCounter.vue';
import ActivityRows from './ActivityRows.vue';

export default defineComponent({
  name: 'AppNavActivityBtn',

  components: {
    ActivityCounter,
    ActivityRows
  },

  setup() {
    /**
     * COMPOSABLES
     */
    const { upToLargeBreakpoint } = useBreakpoints();
    const { isLoadingProfile, profile, account, getSigner } = useWeb3();
    const { t } = useI18n();

    const {
      transactions,
      pendingTransactions,
      finalizedTransactions,
      getExplorerLink,
      clearAllTransactions,
      isSuccessfulTransaction,
      updateTransaction,
      isPendingTransactionStatus
    } = useTransactions();

    const { addNotification } = useNotifications();

    /**
     * METHODS
     */
    async function cancelOrder(orderId: string) {
      try {
        const { signature, signingScheme } = await signOrderCancellation(
          orderId,
          getSigner()
        );

        await gnosisProtocolService.sendSignedOrderCancellation({
          cancellation: {
            orderUid: orderId,
            signature,
            signingScheme
          },
          owner: account.value
        });

        updateTransaction(orderId, 'order', {
          status: 'cancelling'
        });
      } catch (e) {
        console.log(e);
        addNotification({
          type: 'error',
          title: t('errorCancellingOrder'),
          message: (e as Error).message
        });
      }
    }

    return {
      // methods
      clearAllTransactions,
      getExplorerLink,
      isSuccessfulTransaction,
      isPendingTransactionStatus,
      cancelOrder,

      // computed
      account,
      profile,
      upToLargeBreakpoint,
      isLoadingProfile,
      transactions,
      pendingTransactions,
      finalizedTransactions
    };
  }
});
</script>

<style scoped>
.activity-row {
  @apply border-2 border-green rounded-20px px-5 py-2.5 w-full mb-3;
}
.activity-row:only-child {
  margin-bottom: 0;
}
</style>
