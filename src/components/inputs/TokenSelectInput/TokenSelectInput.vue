<script setup lang="ts">
import { ref, computed } from 'vue';
import SelectTokenModal from '@/components/modals/SelectTokenModal/SelectTokenModal.vue';
import useTokens from '@/composables/useTokens';
import useNumbers from '@/composables/useNumbers';
import { TokenInfo } from '@/types/TokenList';
import BalBtn from '@/components/_global/BalBtn/BalBtn.vue';

/**
 * TYPES
 */
type Props = {
  modelValue: string;
  fixed?: boolean;
  weight?: number | string;
  excludedTokens?: string[];
  options?: string[];
  disableInjection?: boolean;
  outlined?: boolean;
  color?: string;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  fixed: false,
  weight: 0,
  excludedTokens: () => [],
  options: () => [],
  disableInjection: false,
  outlined: false,
  color: ''
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

/**
 * STATE
 */
const openTokenModal = ref(false);

/**
 * COMPOSABLEs
 */
const { getToken } = useTokens();
const { fNum2 } = useNumbers();

/**
 * COMPUTED
 */
const hasToken = computed(() => !!props.modelValue);

const token = computed((): TokenInfo | null => {
  if (!hasToken.value) return null;
  return getToken(props.modelValue);
});

/**
 * METHODS
 */
function toggleModal(): void {
  if (!props.fixed) openTokenModal.value = !openTokenModal.value;
}

function tokenFor(option: string): TokenInfo {
  return getToken(option);
}
</script>

<template>
  <div>
    <BalBtn
      v-if="hasToken && options.length === 0"
      :class="[
        'token-select-input group',
        {
          'px-3 text-black': outlined
        }
      ]"
      :type="outlined ? 'outlined' : 'filled'"
      @click="toggleModal"
      size="sm+"
      :color="color"
    >
      <div class="w-6 leading-none mr-3">
        <BalAsset :address="token?.address" />
      </div>
      <span class="text-lg font-medium">
        {{ token?.symbol }}
      </span>
      <span
        v-if="Number(weight) > 0"
        class="text-white ml-2 text-lg"
        :class="{ 'text-black': outlined }"
      >
        {{
          fNum2(weight, {
            style: 'unit',
            unit: 'percent',
            maximumFractionDigits: 0
          })
        }}
      </span>
      <BalIcon
        v-if="outlined"
        name="chevron-down"
        size="lg"
        class="text-green ml-2"
        :class="{ 'text-orange': outlined }"
      />
    </BalBtn>

    <BalBtn v-else-if="hasToken && fixed && options.length > 0" size="sm+">
      <BalDropdown
        :options="options"
        minWidth="40"
        @selected="emit('update:modelValue', $event)"
      >
        <template #activator>
          <div
            class="token-select-input level-btn level-btn_filled group selectable"
          >
            <div class="w-6 leading-none mr-3">
              <BalAsset :address="token?.address" />
            </div>
            <span class="text-lg font-medium">
              {{ token?.symbol }}
            </span>
            <span
              v-if="Number(weight) > 0"
              class="text-white ml-2 text-lg"
              :class="{ 'text-black': outlined }"
            >
              {{
                fNum2(weight, {
                  style: 'unit',
                  unit: 'percent',
                  maximumFractionDigits: 0
                })
              }}
            </span>
          </div>
        </template>
        <template #option="{ option: address }">
          <div
            :set="(optionToken = tokenFor(address) || {})"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <BalAsset :address="optionToken?.address" />
              <span class="ml-2 font-bold text-lg">
                {{ optionToken?.symbol }}
              </span>
            </div>
          </div>
        </template>
      </BalDropdown>
    </BalBtn>

    <BalBtn
      v-else
      class="token-select-input"
      type="filled"
      @click="toggleModal"
      size="sm+"
    >
      {{ $t('selectToken') }}
    </BalBtn>

    <teleport to="#modal">
      <SelectTokenModal
        v-if="openTokenModal"
        :excludedTokens="[...excludedTokens, modelValue]"
        :includeEther="true"
        :disableInjection="disableInjection"
        @close="openTokenModal = false"
        @select="emit('update:modelValue', $event)"
      />
    </teleport>
  </div>
</template>

<style scoped>
.token-select-input {
  @apply flex items-center whitespace-nowrap max-h-10;
  font-variation-settings: 'wght' 700;
}

.selectable {
  @apply cursor-pointer;
}
</style>
