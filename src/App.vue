<script setup>
import { RouterView } from "vue-router";
import AppTopBar from "./AppTopBar.vue";
import Home from "./views/home/Home.vue";
</script>

<template>
  <div>
    <AppTopBar />
  </div>
  <RouterView />
</template>

<style scoped></style>
