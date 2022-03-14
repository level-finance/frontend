<template>
  <Basic />
</template>

<script>
import { applyReactInVue } from 'veaury';
// This is a React component
import Dashboard from '/react_app/Dashboard.tsx';
import { ref } from 'vue';

export default {
  components: {
    // Use HOC 'applyReactInVue'
    Basic: applyReactInVue(Dashboard)
  },
  setup() {
    return {
      foo: ref('Hello!')
    };
  }
};
</script>

<style></style>
