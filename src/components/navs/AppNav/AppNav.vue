<template>
  <AppNavAlert v-if="currentAlert" :alert="currentAlert" />
  <nav id="app-nav" ref="appNav" class="pt-2 px-4 lg:px-6 sticky top-0">
    <router-link :to="{ name: 'home' }">
      <AppLogo class="mb-6" />
    </router-link>
    <div class="w-full flex items-center justify-between">
      <router-link
        :to="{ name: 'home' }"
        @click="trackGoal(Goals.ClickNavLogo)"
      >
        <AppIcon />
      </router-link>
      <AppNavActions />
    </div>
    <div class="h-full flex items-start justify-center">
      <!-- <div class="w-2/3 lg:w-1/3 flex items-start">
        <router-link
          :to="{ name: 'home' }"
          @click="trackGoal(Goals.ClickNavLogo)"
        >
          <AppIcon />
        </router-link>
      </div> -->

      <div
        v-if="!upToLargeBreakpoint"
        style="margin-left: -65px; margin-top: -4px;"
        class="mt-auto flex justify-center items-end"
      >
        <AppNavToggle />
      </div>

      <!-- <div class="w-1/3 flex justify-end mt-2 mb-5">
        <AppNavActions />
      </div> -->
    </div>
  </nav>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import useBreakpoints from '@/composables/useBreakpoints';
import AppLogo from '@/components/images/AppLogo.vue';
import AppIcon from '@/components/images/AppIcon.vue';
import AppNavAlert from './AppNavAlert.vue';
import AppNavToggle from './AppNavToggle.vue';
import AppNavActions from './AppNavActions.vue';
import useFathom from '@/composables/useFathom';
import useWeb3 from '@/services/web3/useWeb3';
import useAlerts from '@/composables/useAlerts';

export default defineComponent({
  components: {
    AppLogo,
    AppIcon,
    AppNavAlert,
    AppNavToggle,
    AppNavActions
  },

  setup() {
    // COMPOSABLES
    const { bp, upToLargeBreakpoint } = useBreakpoints();
    const { trackGoal, Goals } = useFathom();
    const { connector } = useWeb3();
    const { currentAlert } = useAlerts();

    // DATA
    const appNav = ref(null);

    // COMPUTED
    const hideNetworkSelect = computed(() => connector.value?.id === 'gnosis');

    return {
      // data
      appNav,
      // computed
      bp,
      currentAlert,
      upToLargeBreakpoint,
      hideNetworkSelect,
      // methods
      trackGoal,
      Goals
    };
  }
});
</script>

<style scoped>
#app-nav {
  @apply w-full z-20;
  @apply bg-gray-dark;
  transition: all 0.2s ease-in-out;
}
</style>
