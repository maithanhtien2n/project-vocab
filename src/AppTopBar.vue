<script setup>
import { computed, ref } from "vue";
import { usePrimeVue } from "primevue/config";

// set default theme folder-name to currentTheme
const currentTheme = ref("lara-light-purple"); // lara-light-purple or lara-dark-purple (1st parameter)

const PrimeVue = usePrimeVue();

const checkTheme = computed(() => {
  if (currentTheme.value === "lara-light-purple") {
    return false;
  } else {
    return true;
  }
});

// change current theme to next
const toggleTheme = () => {
  // What is next theme? (2nd parameter)
  let nextTheme = "lara-light-purple";
  if (currentTheme.value === "lara-light-purple")
    nextTheme = "lara-dark-purple";
  else if (currentTheme.value === "lara-dark-purple")
    nextTheme = "lara-light-purple";

  // 1. Current theme name
  // 2. Next theme name
  // 3. id of <link>, what reference to where set theme css file --> fix, single id to <link>
  PrimeVue.changeTheme(currentTheme.value, nextTheme, "id-to-link", () => {});

  // So current theme now:
  currentTheme.value = nextTheme;
};
</script>

<template>
  <div
    :class="checkTheme ? 'layout-topbar-dark' : 'layout-topbar'"
    class="flex justify-content-between h-3rem md:h-4rem"
  >
    <div>
      <span
        class="line-clamp-1 text-sm md:text-xl font-semibold cursor-pointer text-purple-700"
      >
        S Web Vocab
      </span>
    </div>

    <div>
      <Button @click="toggleTheme" class="p-1 md:p-2">
        <i
          :class="checkTheme ? 'pi pi-moon' : 'pi pi-sun'"
          class="text-sm md:text-xl"
        ></i>
      </Button>
    </div>
  </div>
</template>
