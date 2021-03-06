<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';

import useWeb3 from '@/services/web3/useWeb3';
import useNumbers from '@/composables/useNumbers';
import usePoolCreation from '@/composables/pools/usePoolCreation';

import { isRequired, isValidAddress } from '@/lib/utils/validations';
import { isAddress } from 'ethers/lib/utils';

const emit = defineEmits(['update:height']);

/**
 * STATIC
 */
const FIXED_FEE_OPTIONS = ['0.001', '0.003', '0.01'];

/**
 * STATE
 */
const isCustomFee = ref(false);
const checkboxState = ref(true);
const isInvalidFee = ref(false);
const cardWrapper = ref<HTMLElement>();

/**
 * COMPOSABLES
 */
const { fNum2 } = useNumbers();
const {
  initialFee,
  feeController,
  feeManagementType,
  feeType,
  setFeeManagement,
  setFeeType,
  setFeeController,
  setTrpController,
  thirdPartyFeeController,
  fee,
  proceed,
  goBack,
  isLoadingSimilarPools
} = usePoolCreation();
const { account } = useWeb3();
const { userNetworkConfig } = useWeb3();

/**
 * COMPUTED
 */
const customInputClasses = computed(() => ({
  'bg-green': isCustomFee.value,
  'bg-transparent': !isCustomFee.value
}));

const isProceedDisabled = computed(() => {
  if (
    feeController.value === 'other' &&
    !isAddress(thirdPartyFeeController.value)
  ) {
    return true;
  }

  if (isInvalidFee.value) return true;

  return false;
});

// this does not need to be computed as it relies on a static
const feeOptions = FIXED_FEE_OPTIONS.map(option => {
  return {
    label: fNum2(option, {
      style: 'unit',
      unit: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      fixedFormat: true
    }),
    value: option
  };
});

/**
 * FUNCTIONS
 */
function onFixedInput(val: string): void {
  initialFee.value = '0';
  initialFee.value = val;
  isCustomFee.value = false;
  isInvalidFee.value = isFeeValid(val);
}

function onCustomInput(val: string): void {
  initialFee.value = (Number(val) / 100).toString();
  isCustomFee.value = true;
  isInvalidFee.value = isFeeValid(val);
}

function isFeeValid(val: string): boolean {
  return Number(val) <= 0.0001 || Number(val) > 10;
}

async function onChangeFeeManagementType(val: boolean) {
  if (!val) {
    setFeeManagement('self');
  } else {
    setFeeManagement('governance');
    setFeeType('fixed');
    setFeeController('self');
    setTrpController('');
  }
  await nextTick();
  emit('update:height', {
    height: cardWrapper.value?.offsetHeight || 0
  });
}

async function onChangeFeeType(val: string) {
  if (val === 'fixed') {
    setFeeController('self');
    setTrpController('');
  }
  await nextTick();
  emit('update:height', {
    height: cardWrapper.value?.offsetHeight || 0
  });
}

async function onChangeFeeController(val: string) {
  if (val === 'self') {
    setTrpController('');
  }
  await nextTick();
  emit('update:height', {
    height: cardWrapper.value?.offsetHeight || 0
  });
}
</script>

<template>
  <div ref="cardWrapper">
    <BalCard>
      <BalStack vertical>
        <BalStack vertical spacing="xs">
          <span class="text-base text-black">{{
            userNetworkConfig?.name
          }}</span>
          <BalStack horizontal align="center" spacing="xs">
            <button
              @click="goBack"
              class="text-blue-500 hover:text-blue-700 flex"
            >
              <BalIcon class="flex text-green" name="chevron-left" />
            </button>
            <h5 class="font-bold dark:text-gray-300">
              {{ $t('createAPool.setPoolFees') }}
            </h5>
          </BalStack>
        </BalStack>
        <BalStack vertical spacing="sm">
          <div>
            <h6 class="mb-1">Initial swap fee</h6>
            <h6 class="text-gray">{{ $t('createAPool.bestFeeOption') }}</h6>
          </div>
          <BalStack spacing="xs" horizontal>
            <BalBtnGroup
              :options="feeOptions"
              v-model="initialFee"
              @update:modelValue="onFixedInput"
            />
            <div>
              <BalBtn
                :class="['custom-input', customInputClasses]"
                size="group"
                :textColor="'black'"
                @click="onCustomInput(fee)"
              >
                <input
                  class="w-12 text-right bg-transparent font-bold h-5"
                  v-model="fee"
                  placeholder="0.1"
                  type="number"
                  step="any"
                  @update:modelValue="onCustomInput"
                />
                <!-- <BalTextInput
              class="w-20"
              v-model="fee"
              placeholder="0.1"
              size="xs"
              type="number"
              @input="onCustomInput"
            >
              <template v-slot:append>
                %
              </template>
            </BalTextInput> -->
                <div class="px-1 leading-5">
                  %
                </div>
              </BalBtn>
            </div>
          </BalStack>
          <BalAlert
            class="w-full"
            :title="$t('invalidFee')"
            type="error"
            v-if="isInvalidFee"
          >
            {{ $t('invalidFeeExplain') }}
          </BalAlert>
        </BalStack>
        <BalStack horizontal spacing="none" align="center">
          <BalCheckbox
            @update:modelValue="onChangeFeeManagementType"
            v-model="checkboxState"
            name="areFeesGovernanceManaged"
            size="sm"
            :label="$t('createAPool.governanceFees')"
            noMargin
          />
          <BalTooltip
            :text="$t('createAPool.governanceFeesTooltip')"
            icon-size="sm"
            class="ml-2 mt-1"
          />
        </BalStack>
        <BalStack vertical spacing="sm" v-if="feeManagementType === 'self'">
          <h6 class="mb-1">{{ $t('createAPool.alternativeFeeManagement') }}</h6>
          <BalRadio
            v-model="feeType"
            value="fixed"
            @update:modelValue="onChangeFeeType"
            name="feeManagementOptions"
          >
            <template v-slot:label>
              <span>
                {{ $t('createAPool.fixedFeeRadioLabel') }}
              </span>
            </template>
          </BalRadio>
          <BalRadio
            v-model="feeType"
            value="dynamic"
            @update:modelValue="onChangeFeeType"
            name="feeManagementOptions"
          >
            <template v-slot:label>
              <span>
                {{ $t('createAPool.dynamicFeeRadioLabel') }}
              </span>
            </template>
          </BalRadio>
        </BalStack>
        <BalStack vertical spacing="sm" v-if="feeType === 'dynamic'">
          <h6 class="mb-1">{{ $t('createAPool.setAnAddress') }}</h6>
          <BalRadio
            v-model="feeController"
            value="self"
            @update:modelValue="onChangeFeeController"
            name="addressOption"
          >
            <template v-slot:label>
              <span>
                {{ $t('createAPool.myAddressOption', [_shorten(account)]) }}
              </span>
            </template>
          </BalRadio>
          <BalRadio
            v-model="feeController"
            value="other"
            @update:modelValue="onChangeFeeController"
            name="addressOption"
          >
            <template v-slot:label>
              <span>
                {{ $t('createAPool.customAddressOption') }}
              </span>
            </template>
          </BalRadio>
        </BalStack>
        <BalStack
          vertical
          v-if="feeController === 'other' && feeType === 'dynamic'"
          spacing="xs"
        >
          <h6>{{ $t('createAPool.customAddressTitle') }}</h6>
          <p class="text-gray-600 mb-1">
            {{ $t('createAPool.customAddressInfo') }}
          </p>
          <BalStack vertical spacing="xs">
            <BalTextInput
              v-model="thirdPartyFeeController"
              placeholder="0xBA4...2069"
              type="text"
              size="sm"
              validateOn="blur"
              :rules="[
                isRequired($t('A controller address')),
                isValidAddress()
              ]"
              name="customAddress"
            />
          </BalStack>
        </BalStack>
        <BalBtn
          :disabled="isProceedDisabled || isLoadingSimilarPools"
          type="submit"
          block
          @click="proceed"
          >{{ $t('next') }}</BalBtn
        >
      </BalStack>
    </BalCard>
  </div>
</template>

<style scoped>
.custom-input {
  @apply flex border-2 items-center px-1 rounded-20px shadow-inner h-full;
}
</style>
