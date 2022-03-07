<template>
  <div>
    <div class="flex items-center flex-wrap">
      <div class="flex items-center flex-wrap">
        <BalBtn
          @click="onClick"
          class="mr-5 b-2 bg-orange font-bold flex items-center"
        >
          <BalIcon name="search" size="sm" class="mr-2" />
          {{ $t('filterByToken') }}
        </BalBtn>
        <img
          v-if="modelValue?.length > 0"
          src="@/assets/images/icons/cross.svg"
          alt="Cross Icon"
          class="mr-5"
        />
        <BalChip
          v-for="token in modelValue"
          class="mr-2"
          color="white"
          :key="token"
          size="2xl"
          outline
          :closeable="true"
          @closed="$emit('remove', token)"
        >
          <BalAsset :address="token" :size="24" class="flex-auto" />
          <span class="mx-2">{{ tokens[token]?.symbol }}</span>
        </BalChip>
      </div>
      <div
        v-if="account && !dynamicDataLoading && !hasNoBalances"
        class="text-xl text-gray font-bold overflow-x-auto"
      >
        <span class="mr-2">{{ $t('inYourWallet') }}:</span>
        <span
          v-for="token in sortedBalances"
          :key="`wallet-${token.symbol}`"
          class="mr-6 cursor-pointer hover:text-blue-700"
          @click="addToken(token.address)"
        >
          {{ token?.symbol }}
        </span>
      </div>
      <div
        v-else
        class="text-xl text-gray font-bold flex flex-wrap items-center py-3"
      >
        <span class="mr-2">{{ $t('popularBases') }}</span>
        <span
          v-for="token in whiteListedTokens"
          :key="`popular-${token.symbol}`"
          class="mr-3 md:mr-4 cursor-pointer hover:text-gray-700 dark:hover:text-white transition-colors"
          @click="addToken(token.address)"
        >
          {{ token?.symbol }}
        </span>
      </div>
    </div>
    <teleport to="#modal">
      <SelectTokenModal
        v-if="selectTokenModal"
        :excluded-tokens="modelValue"
        @close="selectTokenModal = false"
        @select="addToken"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import SelectTokenModal from '@/components/modals/SelectTokenModal/SelectTokenModal.vue';
import { pick, take } from 'lodash';
import { NATIVE_ASSET_ADDRESS, TOKENS } from '@/constants/tokens';
import { getAddress } from '@ethersproject/address';
import useWeb3 from '@/services/web3/useWeb3';
import useTokens from '@/composables/useTokens';

export default defineComponent({
  name: 'TokenSearchInput',

  components: {
    SelectTokenModal
  },

  emits: ['add', 'remove'],

  props: {
    modelValue: { type: Array as PropType<string[]>, default: () => [] },
    loading: { type: Boolean, default: true }
  },

  setup(props, { emit }) {
    /**
     * STATE
     */
    const selectTokenModal = ref(false);

    /**
     * COMPOSABLES
     */
    const { tokens, balances, dynamicDataLoading } = useTokens();
    const { account, appNetworkConfig } = useWeb3();

    /**
     * COMPUTED
     */
    // sorted by biggest bag balance, limited to biggest 5
    const sortedBalances = computed(() => {
      const addressesWithBalance = Object.entries(balances.value)
        .filter(balance => balance[1] !== '0.0')
        .map(balance => balance[0]);
      const tokensWithBalance = Object.values(
        pick(tokens.value, addressesWithBalance)
      );

      return take(tokensWithBalance, 6);
    });

    const hasNoBalances = computed(() => !sortedBalances.value.length);

    const whiteListedTokens = computed(() =>
      Object.values(tokens.value)
        .filter(token => TOKENS.Popular.Symbols.includes(token.symbol))
        .filter(token => !props.modelValue.includes(token.address))
    );

    /**
     * METHODS
     */
    function addToken(token: string) {
      let _token = token;
      // special case for ETH where we want it to filter as WETH regardless
      // as ETH is the native asset
      if (getAddress(token) === NATIVE_ASSET_ADDRESS) {
        _token = appNetworkConfig.addresses.weth;
      }
      // const newSelected = [...props.modelValue, _token];
      emit('add', _token);
    }

    function onClick() {
      if (!props.loading) selectTokenModal.value = true;
    }

    return {
      // state
      selectTokenModal,
      // computed
      tokens,
      dynamicDataLoading,
      balances,
      sortedBalances,
      account,
      hasNoBalances,
      whiteListedTokens,
      // methods
      addToken,
      onClick
    };
  }
});
</script>
