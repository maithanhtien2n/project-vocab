<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div
    class="fixed top-0 right-0 left-0 bg-white h-4rem flex align-items-center justify-content-between border-bottom-1 px-5 text-300"
  >
    <span class="text-2xl font-bold text-800">S Web Vocab</span>

    <div>
      <Button label="Sign In" outlined @click="router.push({ name: 'Login' })" />
    </div>
  </div>
</template>
