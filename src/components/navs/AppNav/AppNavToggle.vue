<template>
  <div :class="`app-nav-toggle bg-gray-50 dark:bg-gray-${darkModeBg}`">
    <router-link
      :to="{ name: 'home' }"
      :class="[
        'toggle-link px-6 rounded-l-lg',
        { [activeClasses]: page === 'home' }
      ]"
      @click="trackGoal(Goals.ClickNavInvest)"
    >
      {{ $t('invest') }}
    </router-link>
    <router-link
      :to="{ name: 'trade' }"
      :class="[
        'toggle-link px-6 rounded-r-lg',
        { [activeClasses]: page === 'trade' }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('trade') }}
    </router-link>
    <router-link
      :to="{ name: 'dashboard' }"
      :class="[
        'toggle-link px-6 rounded-r-lg',
        { [activeClasses]: page === 'dashboard' }
      ]"
      @click="trackGoal(Goals.ClickNavDashboard)"
    >
      {{ $t('dashboard') }}
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
    const activeClasses = 'gradient-blue-l-to-r text-white rounded-lg';
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
  @apply h-10 flex items-center rounded-lg shadow;
  font-variation-settings: 'wght' 600;
}

.toggle-link {
  @apply h-full flex items-center;
}
</style>
