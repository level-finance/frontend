<template>
  <component
    :is="tag"
    :class="[
      'bal-btn',
      customClasses,
      btnClasses,
      'level-btn',
      `level-btn${type ? (type === 'submit' ? '_filled' : `_${type}`) : ''}`
    ]"
    :disabled="disabled || loading"
  >
    <div v-if="loading" class="flex items-center justify-center">
      <BalLoadingIcon :size="size" />
      <span v-if="loadingLabel" class="ml-2">
        {{ loadingLabel }}
      </span>
    </div>
    <div v-else class="content">
      <span v-if="label">
        {{ label }}
      </span>
      <slot v-else />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import BalLoadingIcon from '../BalLoadingIcon/BalLoadingIcon.vue';

export default defineComponent({
  name: 'BalBtn',

  components: {
    BalLoadingIcon
  },

  props: {
    tag: {
      type: String,
      default: 'button',
      validator: (val: string): boolean =>
        ['button', 'a', 'div', 'router-link'].includes(val)
    },
    size: {
      type: String,
      default: 'md',
      validator: (val: string): boolean =>
        ['xs', 'sm', 'sm+', 'md', 'lg', 'xl-', 'xl', 'group'].includes(val)
    },
    type: {
      type: String,
      default: 'outlined',
      validator: (val: string): boolean =>
        ['outlined', 'half-filled', 'filled', 'submit'].includes(val)
    },
    color: {
      type: String,
      default: 'green'
    },
    textColor: { type: String, default: '' },
    fontFamily: { type: String, default: '' },
    noPadding: { type: Boolean, default: false },
    label: { type: String, default: '' },
    block: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingLabel: { type: String, default: 'loading...' },
    disabled: { type: Boolean, default: false },
    noShadow: { type: Boolean, default: false },
    customClasses: { type: String, default: '' }
  },

  setup(props) {
    const sizeClasses = computed(() => {
      switch (props.size) {
        case 'xs':
          return 'px-2 h-6 text-xs';
        case 'sm':
          return 'px-3 h-9 text-base';
        case 'sm+':
          return 'px-3 h-10 text-xl';
        case 'xl-':
          return 'px-6 h-11 text-lg';
        case 'xl':
          return 'px-6 h-12 text-xl';
        case '2xl':
          return 'px-6 h-12 text-lg md:text-2xl';
        case 'group':
          return 'px-2.5 h-10 text-xl';
        default:
          return 'px-7 h-12 text-xl';
      }
    });

    const circleSizeClasses = computed(() => {
      switch (props.size) {
        case 'xs':
          return 'w-6 h-6 text-sm';
        case 'xs+':
          return 'w-7 h-7 text-sm';
        case 'sm':
          return 'w-9 h-9 text-lg';
        case 'md':
          return 'w-12 h-12 text-lg';
        case 'lg':
          return 'w-16 h-16 text-2xl';
        default:
          return 'w-12 h-12 text-base';
      }
    });

    const displayClasses = computed(() => {
      if (props.circle) return 'flex justify-center items-center';
      if (props.block) return 'block w-full';
      return '';
    });

    const cursorClasses = computed(() => {
      if (props.disabled || props.loading) return 'cursor-not-allowed';
      return 'cursor-pointer';
    });

    const borderClasses = computed(() => {
      if (props.type !== 'filled' && props.type !== 'submit')
        return `border-2 border-${props.color} active:border-${props.color}-600`;
      return 'border-2 border-transparent';
    });

    const bgColorClasses = computed(() => {
      if (props.type !== 'outlined') {
        return `bg-${props.color} active:bg-${props.color}-600`;
      } else {
        return 'bg-transparent';
      }
    });

    const textColorClasses = computed(() => {
      if (props.textColor) {
        return `text-${props.textColor}`;
      }
      switch (props.type) {
        case 'outlined':
          return `text-${props.color} hover:text-${props.color} active:text-${props.color}`;
        case 'half-filled':
          return `text-${props.color} active:text-${props.color}-600`;
        case 'filled':
          return 'text-white';
        case 'submit':
          return 'text-white';
        default:
          return 'text-black';
      }
    });

    const textWeightClasses = computed(() => {
      if (props.fontFamily === 'secondary') {
        return 'font-secondary font-normal';
      } else {
        return 'font-bold';
      }
    });

    const paddingClasses = computed(() => {
      if (props.noPadding) {
        return 'p-0';
      } else {
        return 'py-1.5';
      }
    });

    const shadowClasses = computed(() => {
      if (props.noShadow) {
        return 'shadow-none';
      } else {
        return 'hover:shadow';
      }
    });

    const btnClasses = computed(() => {
      return {
        [sizeClasses.value]: !props.circle,
        [circleSizeClasses.value]: props.circle,
        [borderClasses.value]: true,
        [textColorClasses.value]: true,
        [bgColorClasses.value]: true,
        [displayClasses.value]: true,
        [cursorClasses.value]: true,
        [textWeightClasses.value]: true,
        [shadowClasses.value]: true,
        [paddingClasses.value]: true
      };
    });

    return {
      btnClasses
    };
  }
});
</script>

<style scoped>
.bal-btn {
  @apply overflow-hidden tracking-tight;
  transition: all 0.2s ease;
  text-decoration: none !important;
}

.bal-btn:focus,
.bal-btn:active {
  outline: none !important;
}

.content {
  @apply flex justify-center items-center w-full h-full;
}
</style>
