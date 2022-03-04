<template>
  <div
    class="toggle-btn w-9 h-9 flex justify-center items-center cursor-pointer rounded-full group"
    @click="toggle"
  >
    <div
      class="ease-in-out duration-300"
      :class="{ 'transform rotate-180': isRotated }"
    >
      <img :src="require('@/assets/images/icons/switch.svg')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['toggle'],
  setup(_props, { emit }) {
    const isRotated = ref(false);

    function toggle(): void {
      isRotated.value = !isRotated.value;
      emit('toggle');
    }

    return {
      isRotated,
      toggle
    };
  }
});
</script>
<style scoped>
.icon-trade-toggle {
  @apply transition-transform ease-out duration-200;
}

.toggle-btn:hover .icon-trade-toggle {
  transform: scale(1.2);
}
</style>
