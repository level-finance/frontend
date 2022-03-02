<template>
  <div class="app-nav-toggle">
    <router-link
      :to="{ name: 'dashboard' }"
      :class="[
        'toggle-link',
        page === 'dashboard' ? activeClasses : 'text-white'
      ]"
      @click="trackGoal(Goals.ClickNavDashboard)"
    >
      {{ $t('dashboard') }}
    </router-link>
    <router-link
      :to="{ name: 'home' }"
      :class="['toggle-link', page === 'home' ? activeClasses : 'text-white']"
      @click="trackGoal(Goals.ClickNavInvest)"
    >
      {{ $t('pools') }}
    </router-link>
    <router-link
      :to="{ name: 'trade' }"
      :class="['toggle-link', page === 'trade' ? activeClasses : 'text-white']"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('swap') }}
    </router-link>
  </div>
</template>

<script lang="ts">
import useFathom from '@/composables/useFathom';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppNavToggle',

  props: {
    darkModeBg: { type: String, default: '800' }
  },

  setup() {
    const route = useRoute();
    const activeClasses = 'bg-gray-100 text-gray rounded-lg';
    const page = computed(() => route.name);
    const { trackGoal, Goals } = useFathom();

    return {
      page,
      activeClasses,
      trackGoal,
      Goals
    };
  }
});
</script>

<style scoped>
.app-nav-toggle {
  @apply h-10 flex items-center rounded-lg;
  font-variation-settings: 'wght' 600;
}

.toggle-link {
  @apply h-full flex items-center px-6 rounded-l-lg text-lg font-secondary;
}
</style>
