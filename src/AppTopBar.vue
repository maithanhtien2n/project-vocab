<script setup>
import { useRouter } from 'vue-router'
import { userData } from '@/utils'

const router = useRouter()
</script>

<template>
  <div
    style="z-index: 4"
    class="fixed top-0 right-0 left-0 bg-white h-4rem flex align-items-center justify-content-between border-bottom-1 px-5 text-300"
  >
    <span class="text-2xl font-bold text-800">S Web Vocab</span>

    <div>
      <div v-if="true" class="flex align-items-center gap-2">
        <img
          v-if="userData?.avatar"
          :src="userData?.avatar || '/images/user.png'"
          onerror="this.onerror=null; this.src='/images/user.png';"
          style="width: 31px; height: 31px"
          class="border-circle"
        />

        <Avatar
          v-else
          :label="userData.email.charAt(0).toUpperCase()"
          style="background-color: #dee9fc; color: #1a2551"
          shape="circle"
        />

        <span class="text-800">{{ userData.email }}</span>
      </div>

      <Button v-else label="Sign In" outlined @click="router.push({ name: 'Login' })" />
    </div>
  </div>
</template>
