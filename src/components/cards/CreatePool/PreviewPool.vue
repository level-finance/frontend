<script lang="ts" setup>
import { ref, computed, onBeforeMount } from 'vue';
import CreateActions from '@/components/cards/CreatePool/CreateActions.vue';
import AnimatePresence from '@/components/animate/AnimatePresence.vue';

import usePoolCreation from '@/composables/pools/usePoolCreation';
import useTokens from '@/composables/useTokens';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import useWeb3 from '@/services/web3/useWeb3';

import { useI18n } from 'vue-i18n';
import { bnum, shortenLabel } from '@/lib/utils';
import BigNumber from 'bignumber.js';

/**
 * PROPS & EMITS
 */
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

/**
 * STATE
 */

const poolCreated = ref(false);

/**
 * COMPOSABLES
 */
const {
  seedTokens,
  poolLiquidity,
  poolTypeString,
  initialFee,
  name: poolName,
  symbol: poolSymbol,
  useNativeAsset,
  feeManagementType,
  feeController,
  thirdPartyFeeController,
  createPoolTxHash,
  goBack,
  setActiveStep,
  sortSeedTokens,
  getScaledAmounts,
  saveState
} = usePoolCreation();

const { tokens, priceFor, nativeAsset, wrappedNativeAsset } = useTokens();
const { fNum2 } = useNumbers();
const { t } = useI18n();
const { userNetworkConfig, account } = useWeb3();

/**
 * LIFECYCLE
 */
onBeforeMount(() => {
  sortSeedTokens();
});

/**
 * COMPUTED
 */
const title = computed((): string =>
  poolCreated.value
    ? t('poolCreated')
    : t('previewPool', [poolTypeString.value])
);

// translations are breaking when directly using this label
const initialWeightLabel = computed(() => t('initialWeight'));

const tokenAddresses = computed((): string[] => {
  return seedTokens.value.map(token => {
    if (
      token.tokenAddress == wrappedNativeAsset.value.address &&
      useNativeAsset.value
    ) {
      return nativeAsset.address;
    }
    return token.tokenAddress;
  });
});

const tokenAmounts = computed((): string[] => {
  return getScaledAmounts();
});

const hasMissingPoolNameOrSymbol = computed(() => {
  return poolSymbol.value === '' || poolName.value === '';
});

const initialWeights = computed(() => {
  const _initialWeights: Record<string, BigNumber> = {};
  for (const seedToken of seedTokens.value) {
    _initialWeights[seedToken.tokenAddress] = bnum(seedToken.amount)
      .times(priceFor(seedToken.tokenAddress))
      .div(poolLiquidity.value);
  }
  return _initialWeights;
});

// an invalid initial weight is one where the the weight
// is less than 1% of the pools value
const hasInvalidInitialWeight = computed(() => {
  return Object.values(initialWeights.value).some(initialWeight =>
    initialWeight.lt(0.01)
  );
});

/**
 * METHODS
 */
function handleSuccess(): void {
  poolCreated.value = true;
  emit('success');
}

function navigateToPoolFee() {
  setActiveStep(1);
}

function getSwapFeeManager() {
  if (feeManagementType.value === 'governance') {
    return t('levelGovernance');
  } else {
    if (feeController.value === 'self') {
      return `${t('myWallet')}: ${shortenLabel(account.value)}`;
    } else {
      return shortenLabel(thirdPartyFeeController.value);
    }
  }
}

function getInitialWeightHighlightClass(tokenAddress: string) {
  return {
    'text-gray-500': initialWeights[tokenAddress]?.gte(0.01),
    'text-yellow-500': initialWeights[tokenAddress]?.lt(0.01)
  };
}
</script>

<template>
  <BalStack vertical spacing="xs" class="mb-24 font-bold">
    <BalCard>
      <BalStack vertical spacing="xs">
        <span class="text-xs text-gray-700 dark:text-gray-500">{{
          userNetworkConfig?.name
        }}</span>
      </BalStack>
      <BalStack vertical>
        <div class="flex items-center">
          <BalCircle
            v-if="poolCreated"
            size="8"
            color="green"
            class="text-white mr-2"
          >
            <BalIcon name="check" />
          </BalCircle>
          <BalStack horizontal align="center" spacing="xs">
            <button
              @click="goBack"
              class="text-green hover:text-green-600 flex"
            >
              <BalIcon class="flex" name="chevron-left" />
            </button>

            <h5 class="font-bold dark:text-gray-300">{{ title }}</h5>
          </BalStack>
        </div>
        <BalCard
          square
          class="border-t-3 border-b-3 border-l-0 border-r-0 -mx-4 px-4"
          noPad
        >
          <div class="p-2">
            <h6 class="text-lg font-bold">
              {{ $t('createAPool.tokensAndSeedLiquidity') }}
            </h6>
          </div>
          <BalStack vertical spacing="none">
            <div
              v-for="token in seedTokens"
              :key="`tokenpreview-${token.tokenAddress}`"
              class="p-4"
            >
              <BalStack horizontal justify="between">
                <BalStack horizontal align="center">
                  <BalAsset :address="token.tokenAddress" :size="36" />
                  <BalStack vertical spacing="none">
                    <span class="font-bold">
                      {{ fNum2(token.weight / 100, FNumFormats.percent) }}
                      {{ tokens[token.tokenAddress]?.symbol }}
                    </span>
                    <span
                      :class="[
                        'text-lg',
                        getInitialWeightHighlightClass(token.tokenAddress)
                      ]"
                    >
                      {{ initialWeightLabel }}:
                      {{
                        fNum2(
                          initialWeights[token.tokenAddress].toString(),
                          FNumFormats.percent
                        )
                      }}
                    </span>
                  </BalStack>
                </BalStack>
                <BalStack vertical spacing="none" align="end">
                  <span class="font-bold">
                    {{ fNum2(token.amount, FNumFormats.token) }}
                  </span>
                  <span class="text-lg text-gray-500">
                    {{
                      fNum2(
                        bnum(token.amount)
                          .times(priceFor(token.tokenAddress))
                          .toString(),
                        FNumFormats.fiat
                      )
                    }}
                  </span>
                </BalStack>
              </BalStack>
            </div>
          </BalStack>
          <BalStack horizontal justify="between" class="p-4">
            <h6>{{ $t('total') }}</h6>
            <h6>
              {{ fNum2(poolLiquidity.toString(), FNumFormats.fiat) }}
            </h6>
          </BalStack>
        </BalCard>
        <BalCard noBorder noPad>
          <div class="px-2">
            <h6 class="text-lg">{{ $t('summary') }}</h6>
          </div>
          <BalStack vertical spacing="xs" class="px-2 text-gray">
            <BalStack horizontal justify="between">
              <span class="text-lg">{{ $t('poolSymbol') }}:</span>
              <BalInlineInput
                size="xs"
                v-model="poolName"
                @save="saveState"
                inputAlignRight
              />
            </BalStack>
            <BalStack horizontal justify="between">
              <span class="text-lg">{{ $t('poolName') }}:</span>
              <BalInlineInput
                size="xs"
                v-model="poolSymbol"
                @save="saveState"
                inputAlignRight
              />
            </BalStack>
            <BalStack horizontal justify="between">
              <span class="text-lg">{{ $t('poolType') }}:</span>
              <span class="text-lg capitalize">{{ poolTypeString }}</span>
            </BalStack>
            <BalStack horizontal justify="between" class="mt-1">
              <span class="text-lg">{{ $t('swapFee') }}:</span>
              <BalStack horizontal spacing="sm">
                <span class="text-lg">{{
                  fNum2(initialFee, FNumFormats.percent)
                }}</span>
                <button class="hover:text-green-500" @click="navigateToPoolFee">
                  <BalIcon name="edit" size="xs" />
                </button>
              </BalStack>
            </BalStack>
            <BalStack horizontal justify="between">
              <span class="text-lg">{{ $t('swapFeeManager') }}:</span>
              <BalStack horizontal spacing="sm">
                <span class="text-lg">{{ getSwapFeeManager() }}</span>
                <button class="hover:text-green-500" @click="navigateToPoolFee">
                  <BalIcon name="edit" size="xs" />
                </button>
              </BalStack>
            </BalStack>
          </BalStack>
        </BalCard>
        <AnimatePresence
          :isVisible="hasMissingPoolNameOrSymbol"
          unmountInstantly
        >
          <BalAlert :title="$t('missingPoolNameOrSymbol')" type="error">
            {{ $t('missingPoolNameOrSymbolInfo') }}
          </BalAlert>
        </AnimatePresence>
        <AnimatePresence
          :isVisible="hasInvalidInitialWeight && createPoolTxHash !== ''"
          unmountInstantly
        >
          <BalAlert
            :title="$t('createAPool.invalidInitialWeightsTitle')"
            type="warning"
          >
            {{ $t('createAPool.invalidInitialWeightsInfo') }}
          </BalAlert>
        </AnimatePresence>
        <!-- <BalAlert
          type="error"
          class="mb-4"
          :title="
            t('createAPool.arbTitle', [
              fNum2(arbitrageDelta.value, FNumFormats.fiat),
              fNum2(arbitrageDelta.delta, FNumFormats.percent)
            ])
          "
        >
          {{ t('createAPool.arbReason') }}
        </BalAlert> -->
        <CreateActions
          :createDisabled="hasMissingPoolNameOrSymbol"
          :tokenAddresses="tokenAddresses"
          :amounts="tokenAmounts"
          @success="handleSuccess"
        />
      </BalStack>
    </BalCard>
  </BalStack>
</template>
