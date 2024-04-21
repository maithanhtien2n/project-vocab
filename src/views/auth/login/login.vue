<script setup>
import { ref } from "vue";

const email = ref(null);
const password = ref(null);
</script>

<template>
  <div class="flex align-items-center h-screen">
    <!-- Left -->
    <div
      class="flex flex-column bg-blue-200 h-full w-6 p-5 gap-5 align-items-center"
    >
      <div class="w-full">
        <img src="" class="w-full flex justify-content-center border-round" />
      </div>
      <div
        class="text-lg font-medium text-blue-900 flex flex-column text-center"
      >
        <span>
          Xin chào! Chào mừng bạn đến với "S Web Vocab" - trang web được thiết
          kế để tạo và học từ vựng trong các ngôn ngữ khác nhau. Tại đây, bạn có
          thể khám phá và phát triển vốn từ vựng của mình một cách hiệu quả và
          thú vị.
        </span>
      </div>
    </div>

    <!-- Right -->
    <div class="w-6 flex justify-content-center">
      <div class="flex w-max flex-column gap-6">
        <div class="flex flex-column text-center">
          <span class="text-xl text-color-secondary font-medium"
            >Welcome to</span
          >
          <span class="text-5xl font-semibold text-blue-500">S Web Vocab</span>
          <span class="text-base text-400">Log in to continue.</span>
        </div>
        <div class="flex flex-column gap-2 w-auto">
          <div class="p-input-icon-left flex justify-content-center">
            <!-- <i class="pi pi-envelope" /> -->
            <InputText v-model="email" placeholder="Email" class="w-full" />
          </div>
          <div class="flex justify-content-center">
            <!-- <i class="pi pi-lock" /> -->
            <Password
              v-model="password"
              :feedback="false"
              placeholder="Password"
              toggleMask
              inputClass="w-22rem"
            />
          </div>
          <a
            href="#"
            class="text-blue-500 hover:text-blue-700"
            style="text-decoration: none"
            >Forgot password?</a
          >
        </div>
        <div class="flex flex-column gap-2">
          <div class="flex justify-content-center">
            <Button label="Log in" class="shadow-3 w-full" />
          </div>
          <div class="flex gap-2 justify-content-center">
            <span>Don't have an account ?</span>
            <a
              href="#"
              class="text-blue-500 font-medium hover:text-blue-700"
              style="text-decoration: none"
              >Sign Up</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:p-inputtext.p-icon-field-right {
  padding-right: 3rem !important;
}
</style>
