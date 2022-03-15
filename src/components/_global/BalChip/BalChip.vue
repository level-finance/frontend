<script setup lang="ts">
import { withDefaults, defineEmits } from 'vue';

import {
  useChipClasses,
  useCloseIconClasses
} from './composables/useChipStyles';

import BalIcon from '../BalIcon/BalIcon.vue';

type Props = {
  label?: string;
  closeable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'gray' | 'gradient' | 'white' | 'red';
  outline?: boolean;
  rounded?: boolean;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  label: '',
  closeable: false,
  size: 'md',
  color: 'gray',
  rounded: false,
  outline: true
});

const emit = defineEmits(['closed']);

const classes = useChipClasses(props);
const { classes: iconClasses, iconSize } = useCloseIconClasses(props);
</script>

<template>
  <div :class="['bal-chip', classes]">
    <div class="content-container">
      <span v-if="label">
        {{ label }}
      </span>
      <slot v-else />
      <div v-if="closeable" @click="emit('closed')">
        <img
          src="@/assets/images/icons/cross.svg"
          alt="Cross Icon"
          :class="['close', iconClasses]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bal-chip {
  @apply inline-block whitespace-nowrap font-bold;
}
.content-container {
  @apply flex items-center leading-none h-full;
}
.close {
  @apply cursor-pointer ml-1 -mb-px text-green-300;
}
</style>
