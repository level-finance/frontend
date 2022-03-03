<template>
  <div :class="['app-hero']">
    <div class="w-full">
      <template v-if="isWalletReady">
        <h1
          v-text="$t('myInvestments')"
          class="text-base font-medium text-white opacity-90 font-body mb-2"
        />
        <BalLoadingBlock
          v-if="isLoadingUserPools"
          class="h-10 w-40 mx-auto"
          white
        />
        <span v-else class="text-3xl font-bold text-white">
          {{
            fNum2(totalInvestedAmount || '', {
              style: 'currency',
              fixedFormat: true
            })
          }}
        </span>
      </template>
      <template v-else>
        <div class="relative flex items-start justify-start">
          <div class="ml-16 mt-28 relative" style="max-width: 940px">
            <img
              src="@/assets/images/bg/hero-lines.svg"
              alt="Hero Lines"
              class="absolute -left-16 -top-16"
            />
            <div class="flex items-center">
              <img src="@/assets/images/logo-level-dark.svg" alt="Logo Dark" />
              <h1 class="text-green text-5xl font-bold whitespace-pre-line">
                <span class="text-gray"> — </span>
                <span>{{ $t('ammHeader') }}</span>
                <span class="text-gray">.</span>
              </h1>
            </div>
            <h2
              v-text="$t('ammPlatform')"
              class="mt-6 ml-16 w-11/12 text-left text-lg font-bold md:text-xl pb-2"
            />
          </div>
          <img src="@/assets/images/hero-curve.svg" alt="Curve" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import useNumbers from '@/composables/useNumbers';
import usePools from '@/composables/pools/usePools';

import { EXTERNAL_LINKS } from '@/constants/links';
import useFathom from '@/composables/useFathom';
import useWeb3 from '@/services/web3/useWeb3';
import useDarkMode from '@/composables/useDarkMode';

export default defineComponent({
  name: 'AppHero',

  setup() {
    // COMPOSABLES
    const { fNum2 } = useNumbers();
    const { isWalletReady, toggleWalletSelectModal } = useWeb3();
    const { trackGoal, Goals } = useFathom();
    const { totalInvestedAmount, isLoadingUserPools } = usePools();
    const { darkMode } = useDarkMode();

    const classes = computed(() => ({
      ['h-72']: !isWalletReady.value,
      ['h-40']: isWalletReady.value
    }));

    function onClickConnect() {
      toggleWalletSelectModal(true);
      trackGoal(Goals.ClickHeroConnectWallet);
    }

    return {
      // data
      totalInvestedAmount,
      isLoadingUserPools,
      Goals,

      // computed
      isWalletReady,
      classes,
      darkMode,

      // methods
      toggleWalletSelectModal,
      fNum2,
      onClickConnect,
      trackGoal,
      // constants
      EXTERNAL_LINKS
    };
  }
});
</script>

<style>
.app-hero {
  @apply container mx-auto;
  @apply bg-cover bg-center flex items-center justify-start text-center px-4;
  transition: all 0.3s ease-in-out;
}
</style>
