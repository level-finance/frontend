import { ref } from 'vue';
import { lsSet } from '@/lib/utils';
import LS_KEYS from '@/constants/local-storage.keys';

// const osDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
// const lsDarkMode =
//   lsGet(LS_KEYS.App.DarkMode, osDarkMode.toString()) === 'true';

// STATE
const darkMode = ref<boolean>(false);

// MUTATIONS
function setDarkMode(val: boolean): void {
  darkMode.value = val;
  lsSet(LS_KEYS.App.DarkMode, darkMode.value.toString());
  if (darkMode.value) {
    document.documentElement.classList.add('dark', 'bg-gray-900');
  } else {
    document.documentElement.classList.remove('dark', 'bg-gray-900');
  }
}

// INIT
setDarkMode(darkMode.value);

export default function useDarkMode() {
  function toggleDarkMode(): void {
    setDarkMode(!darkMode.value);
  }

  return {
    darkMode,
    toggleDarkMode
  };
}
