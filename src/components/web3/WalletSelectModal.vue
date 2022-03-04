<template>
  <BalModal
    :show="isVisible"
    @close="$emit('close')"
    title="Connect to A wallet"
  >
    <p class="pb-3 text-sm font-bold">
      {{ $t('byConnectingWallet') }}
      <router-link :to="{ name: 'terms-of-use' }" target="_blank">
        <span className="link">{{ $t('policies.termsOfUse') }}</span
        >,
      </router-link>
      <router-link :to="{ name: 'cookies-policy' }" target="_blank">
        <span className="link">{{ $t('policies.cookiesPolicy') }}</span>
      </router-link>
      {{ $t('and') }}
      <router-link :to="{ name: 'privacy-policy' }" target="_blank">
        <span className="link">{{ $t('policies.privacyPolicy') }}</span
        >.
      </router-link>
    </p>
    <WalletButton v-for="wallet in wallets" :wallet="wallet" :key="wallet" />
    <div
      class="
        px-7 py-5
        bg-green-200
        border-green-dark
        border-3
        rounded-20px
      "
    >
      <h6>{{ $t('newToVelas') }}</h6>
      <p class="text-sm">
        {{ $t('setUpVelasWallet') }}
        <BalLink :href="EXTERNAL_LINKS.Velas.Wallets" external>
          {{ $t('learnMore') }}
          <span class="align-middle"
            ><BalIcon name="arrow-up-right" size="sm"
          /></span>
        </BalLink>
      </p>
    </div>
  </BalModal>
</template>

<script lang="ts">
import { SupportedWallets } from '@/services/web3/web3.plugin';
import WalletButton from '@/components/web3/WalletButton.vue';
import { EXTERNAL_LINKS } from '@/constants/links';
import { defineComponent } from 'vue';
export default defineComponent({
  emits: ['close'],
  components: {
    WalletButton
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      wallets: SupportedWallets.filter(id => id !== 'gnosis'),
      EXTERNAL_LINKS
    };
  }
});
</script>
