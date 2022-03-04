<template>
  <button class="wallet-connect-btn" @click="connectWallet(wallet)">
    <div class="flex items-center" style="width: 70%">
      <img
        :src="require(`@/assets/images/connectors/${wallet}.svg`)"
        class="h-10 w-10 mr-4"
      />
      <h5 class="text-gray-dark font-bold dark:text-white text-3xl">
        <span class="capitalize">{{ WalletNameMap[wallet] }}</span>
      </h5>
    </div>
  </button>
</template>

<script lang="ts">
import { Wallet, WalletNameMap } from '@/services/web3/web3.plugin';
import { defineComponent, PropType } from 'vue';
import useWeb3 from '@/services/web3/useWeb3';
export default defineComponent({
  props: {
    wallet: {
      type: String as PropType<Wallet>,
      required: true
    }
  },
  setup() {
    const { connectWallet } = useWeb3();
    return {
      WalletNameMap,
      connectWallet
    };
  }
});
</script>

<style>
.wallet-connect-btn {
  @apply transition-all;
  @apply bg-white dark:bg-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800;
  @apply border-3 border-green dark:border-gray-900;
  @apply p-4 flex justify-start items-center w-full h-14 rounded-20px mb-3 shadow-lg;
  box-shadow: 0px 2px 8px 0px #32323233;
}
</style>
