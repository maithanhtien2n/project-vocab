<script setup>
import { StoreApp } from '@/services/stores'

window.scrollTo(0, 0)

const { onGetterIsLoading: isLoading } = StoreApp()
</script>

<template>
  <!-- Loading -->
  <div v-show="isLoading" class="loading-overlay">
    <div class="loading-content">
      <ProgressSpinner
        style="width: 38px; height: 38px"
        strokeWidth="4"
        animationDuration=".7s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
  </div>

  <Dialog v-model:visible="isLoading" modal class="opacity-0" />
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.9;
  background-image: linear-gradient(to top, #f0f0f0, var(--greenLight));
  z-index: 999999999999999999 !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-content {
  position: relative; /* Chỉnh lại position */
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}
</style>
