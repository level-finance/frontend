<script setup lang="ts">
import { HtmlInputEvent } from '@/types';
import { ref, computed, watchEffect } from 'vue';
import useTokens from '@/composables/useTokens';
import TokenSelectInput from '@/components/inputs/TokenSelectInput/TokenSelectInput.vue';
import { TokenInfo } from '@/types/TokenList';

/**
 * TYPES
 */
type InputValue = string | number;

type Props = {
  address?: string;
  weight?: number;
  label?: string;
  fixedToken?: boolean;
  hint?: string;
  hintAmount?: string;
  excludedTokens?: string[];
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  address: '',
  weight: 0,
  hintAmount: ''
});

const emit = defineEmits<{
  (e: 'blur', value: string): void;
  (e: 'input', value: string): void;
  (e: 'update:weight', value: string): void;
  (e: 'update:address', value: string): void;
  (e: 'update:isValid', value: boolean): void;
  (e: 'update:isLocked', value: boolean): void;
  (e: 'keydown', value: HtmlInputEvent);
  (e: 'delete'): void;
}>();

/**
 * STATE
 */
const _weight = ref<InputValue>('');
const _address = ref<string>('');
const lockPath = ref<HTMLElement>();
const lockIcon = ref<HTMLElement>();
const isLocked = ref(false);

/**
 * COMPOSABLEs
 */
const { getToken } = useTokens();
import anime from 'animejs';

/**
 * COMPUTED
 */
const hasToken = computed(() => !!_address.value);

const token = computed((): TokenInfo | undefined => {
  if (!hasToken.value) return undefined;
  return getToken(_address.value);
});

/**
 * METHODS
 */
function lockWeight(keepLocked?: boolean) {
  if (isLocked.value && !keepLocked) {
    anime({
      targets: lockPath.value,
      d: 'M7 11V7a5 4 0 0 1 10 -2v-1',
      easing: 'spring(0.2, 80, 10, 0)'
    });
    isLocked.value = false;
  } else {
    if (!isLocked.value) {
      anime({
        targets: lockPath.value,
        d: 'M7 11V7a5 5 0 0 1 10 0v4',
        easing: 'spring(0.2, 80, 10, 0)'
      });

      anime({
        delay: 125,
        targets: lockIcon.value,
        translateY: '1px',
        easing: 'linear',
        duration: 100,
        complete: () => {
          anime({
            targets: lockIcon.value,
            translateY: '0px',
            easing: 'linear',
            duration: 100
          });
        }
      });
    }
    isLocked.value = true;
  }
  emit('update:isLocked', isLocked.value);
}

function onInput(event) {
  emit('input', event);
  lockWeight(true);
}

/**
 * CALLBACKS
 */
watchEffect(() => {
  _weight.value = props.weight;
  _address.value = props.address;
});
</script>

<template>
  <BalTextInput
    name="weight"
    v-model="_weight"
    :placeholder="hintAmount || '0.0'"
    type="number"
    :label="label"
    :decimalLimit="token?.decimals || 18"
    validateOn="input"
    autocomplete="off"
    autocorrect="off"
    noShadow
    noBorder
    noRadius
    step="any"
    spellcheck="false"
    v-bind="$attrs"
    inputAlignRight
    @blur="emit('blur', $event)"
    @input="onInput"
    @update:modelValue="emit('update:weight', $event)"
    @update:isValid="emit('update:isValid', $event)"
    @keydown="emit('keydown', $event)"
    size="auto"
  >
    <template v-slot:prepend>
      <TokenSelectInput
        v-model="_address"
        :fixed="fixedToken"
        class="mr-2"
        @update:modelValue="emit('update:address', $event)"
        :excludedTokens="excludedTokens"
      />
    </template>
    <template v-slot:append>
      <BalStack class="h-full" align="center" horizontal spacing="none">
        <BalIcon name="percent" size="sm" class="text-gray-600" />
        <BalBtn
          @click="emit('delete')"
          circle
          size="xs+"
          class="ml-2"
          type="filled"
          :no-padding="true"
        >
          <BalIcon name="trash-2" size="sm" />
        </BalBtn>
        <BalBtn
          @click="lockWeight(false)"
          circle
          size="xs+"
          class="ml-2"
          :type="isLocked ? 'outlined' : 'filled'"
          :no-padding="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-unlock"
            ref="lockIcon"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path ref="lockPath" d="M7 11V7a5 4 0 0 1 10 -2v-1"></path>
          </svg>
        </BalBtn>
      </BalStack>
    </template>
  </BalTextInput>
</template>

<style scoped>
.ease-color {
  transition: color border-color easeOut 0.1s;
}
</style>
