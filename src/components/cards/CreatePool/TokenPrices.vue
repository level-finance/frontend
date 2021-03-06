<script lang="ts" setup>
import usePoolCreation from '@/composables/pools/usePoolCreation';
import useBreakpoints from '@/composables/useBreakpoints';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import useTokens from '@/composables/useTokens';

import { computed } from 'vue';

type Props = {
  toggleUnknownPriceModal: () => void;
};

defineProps<Props>();

/**
 * COMPOSABLES
 */
const { upToLargeBreakpoint } = useBreakpoints();
const { tokensList } = usePoolCreation();
const { tokens, priceFor, injectedPrices } = useTokens();
const { fNum2 } = useNumbers();

/**
 * COMPUTED
 */
const validTokens = computed(() => tokensList.value.filter(t => t !== ''));
const knownTokens = computed(() =>
  validTokens.value.filter(
    token => priceFor(token) !== 0 && !injectedPrices.value[token]
  )
);
const unknownTokens = computed(() =>
  validTokens.value.filter(
    token => priceFor(token) === 0 || injectedPrices.value[token]
  )
);
const hasUnknownPrice = computed(() =>
  validTokens.value.some(token => priceFor(token) === 0)
);
</script>

<template>
  <BalCard noPad shadow="none" :noBorder="upToLargeBreakpoint">
    <div class="p-4" v-if="!upToLargeBreakpoint">
      <BalStack horizontal spacing="sm" align="center">
        <h6 class="dark:text-gray-300">
          {{ $t('tokenPrices') }}
        </h6>
        <BalTooltip class="mt-1" :text="$t('correctTokenPricing')" />
      </BalStack>
    </div>
    <div v-if="knownTokens.length" class="p-2 px-4">
      <BalStack vertical isDynamic spacing="sm">
        <BalStack
          v-for="token in knownTokens"
          :key="`tokenPrice-known-${token}`"
          justify="between"
          align="center"
        >
          <h6>{{ tokens[token]?.symbol }}</h6>
          <BalStack horizontal justify="center" align="center">
            <div>
              <div class="-mr-1">
                <h6 class="text-green">
                  {{ fNum2(priceFor(token), FNumFormats.fiat) }}
                </h6>
              </div>
            </div>
            <img
              class="h-5"
              :src="require('@/assets/images/icons/coingecko.svg')"
            />
          </BalStack>
        </BalStack>
      </BalStack>
      <BalStack
        vertical
        isDynamic
        spacing="xs"
        :class="{ 'mt-1': knownTokens.length }"
      >
        <button
          @click="toggleUnknownPriceModal"
          :class="[
            'mt-1',
            {
              'text-red-500 hover:text-red-700': hasUnknownPrice,
              'hover:text-blue-500': !hasUnknownPrice
            }
          ]"
          v-for="token in unknownTokens"
          :key="`tokenPrice-unknown-${token}`"
        >
          <BalStack horizontal isDynamic justify="between">
            <span
              :class="[
                'text-left',
                { 'font-bold': injectedPrices[token] === undefined }
              ]"
              >{{ tokens[token]?.symbol }}</span
            >
            <BalStack
              v-if="injectedPrices[token] !== undefined"
              horizontal
              align="center"
              class="text-right"
            >
              <span class="break-words">{{
                fNum2(injectedPrices[token], FNumFormats.fiat)
              }}</span>
              <BalIcon size="sm" name="edit" class="mr-px" />
            </BalStack>
            <BalStack v-else spacing="base" horizontal align="center">
              <div class="w-full justify-end">
                <span class="text-left font-bold">{{ $t('enterAPrice') }}</span>
              </div>
              <BalIcon name="alert-circle" />
            </BalStack>
          </BalStack>
        </button>
      </BalStack>
    </div>
  </BalCard>
</template>
