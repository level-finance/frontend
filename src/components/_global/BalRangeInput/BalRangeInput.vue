<template>
  <div class="pr-2">
    <div class="flex justify-between text-sm text-gray-500">
      <div>
        <slot v-if="$slots.leftLabel || leftLabel" name="leftLabel">
          {{ leftLabel }}
        </slot>
      </div>
      <div>
        <slot v-if="$slots.rightLabel || rightLabel" name="rightLabel">
          {{ rightLabel }}
        </slot>
      </div>
    </div>
    <vue-slider
      v-model="range"
      v-bind="$attrs"
      @change="onChange"
      @drag-end="onDragEnd"
      :dot-style="dotStyle"
      :rail-style="railStyle"
      :process-style="processStyle"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import { theme } from '@/../tailwind.config';
import useDarkMode from '@/composables/useDarkMode';

export default defineComponent({
  name: 'BalRangeInput',

  components: {
    VueSlider
  },

  emits: ['change', 'update:modelValue', 'dragEnd'],

  props: {
    modelValue: { type: [String, Number], default: '0' },
    leftLabel: { type: String, default: '' },
    rightLabel: { type: String, default: '' }
  },

  setup(props, { emit }) {
    const range = ref(0);
    const { darkMode } = useDarkMode();

    const colors = theme.extend.colors;

    function onChange(value) {
      emit('change', value);
      emit('update:modelValue', value);
    }

    function onDragEnd() {
      emit('dragEnd', props.modelValue);
    }

    const dotStyle = computed(() => {
      return {
        backgroundColor: colors.red['500'],
        borderColor: colors.red['500'],
        borderWidth: 0,
        backgroundImage: `linear-gradient(to top right, ${colors.green['400']}, ${colors.green['500']})`
      };
    });

    const railStyle = computed(() => {
      return {
        background: darkMode.value ? colors.gray['900'] : colors.gray['100']
      };
    });

    const processStyle = computed(() => {
      return {
        backgroundImage: `linear-gradient(to top right, ${colors.green['400']}, ${colors.green['500']})`
      };
    });

    watch(
      () => props.modelValue,
      newVal => {
        range.value = Number(newVal) || 0;
      },
      { immediate: true }
    );

    return {
      range,
      onChange,
      onDragEnd,
      dotStyle,
      railStyle: railStyle,
      processStyle
    };
  }
});
</script>
