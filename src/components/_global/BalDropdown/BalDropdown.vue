<script setup lang="ts">
import { ref } from 'vue';

/**
 * TYPES
 */
type Props = {
  options: Array<any>;
  minWidth?: string;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: 'selected', value: any): void;
}>();

/**
 * STATE
 */
const showDropdown = ref(false);

/**
 * METHODS
 */
function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
}

function hideDropdown(): void {
  showDropdown.value = false;
}

function handleRowClick(option: any): void {
  emit('selected', option);
  hideDropdown();
}
</script>

<template>
  <div class="relative" v-click-outside="hideDropdown">
    <div class="activator" @click="toggleDropdown">
      <slot name="activator" />
    </div>
    <div class="bal-dropdown min-w-max" v-if="showDropdown">
      <div
        v-for="(option, i) in props.options"
        :key="i"
        class="bal-dropdown-row"
        @click="handleRowClick(option)"
      >
        <slot name="option" :option="option" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bal-dropdown {
  @apply absolute rounded-20px z-10;
  @apply bg-white;
  @apply border-3 border-green divide-y-2 divide-green;
  @apply w-full mt-1.5;
}

.bal-dropdown-row {
  @apply p-3 whitespace-nowrap hover:bg-green-400 cursor-pointer;
  @apply first:rounded-t-20px last:rounded-b-20px;
}
</style>
