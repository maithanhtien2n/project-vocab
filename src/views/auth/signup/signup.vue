<script setup>
import { ref } from "vue";

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const birthdate = ref();
</script>

<template>
  <div class="flex align-items-center h-screen">
    <!-- Left -->
    <div
      class="flex flex-column bg-blue-200 h-full w-6 p-5 gap-5 align-items-center"
    >
      <div class="w-full">
        <img
          src="/public/images/homeBackground.jpg"
          class="w-full flex justify-content-center border-round"
        />
      </div>
      <div
        class="text-lg font-medium text-blue-900 flex flex-column text-center"
      >
        <span
          >Xin chào! Chào mừng bạn đến với "S Web Vocab" - trang web được thiết
          kế để tạo và học từ vựng trong các ngôn ngữ khác nhau. Tại đây, bạn có
          thể khám phá và phát triển vốn từ vựng của mình một cách hiệu quả và
          thú vị.</span
        >
      </div>
    </div>

    <!-- Right -->
    <div class="w-6 flex justify-content-center">
      <div class="flex w-max flex-column gap-5">
        <div class="text-center">
          <span class="text-4xl font-semibold text-blue-500"
            >Create an account</span
          >
        </div>
        <div class="card flex flex-column gap-2 justify-content-center">
          <!-- Fullname -->
          <div class="flex flex-column gap-1">
            <label for="fullname"
              >Full Name <span class="text-red-500">*</span>
            </label>
            <InputText
              id="fullname"
              v-model="fullname"
              placeholder="Your name"
            />
          </div>
          <!-- Email -->
          <div class="flex flex-column gap-1">
            <label for="email"
              >Email Address <span class="text-red-500">*</span>
            </label>
            <InputText
              id="email"
              v-model="email"
              placeholder="Example@gmail.com"
            />
          </div>
          <!-- Password -->
          <div class="flex flex-column gap-1">
            <label for="password">
              Password <span class="text-red-500">*</span>
            </label>
            <Password
              v-model="password"
              placeholder="Enter password"
              toggleMask
              inputClass="w-22rem"
            />
          </div>
          <!-- Confirm password -->
          <div class="flex flex-column gap-1">
            <label for="confirmPassword">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <Password
              v-model="confirmPassword"
              placeholder="Enter confirm password"
              toggleMask
              inputClass="w-22rem"
            />
          </div>
          <!-- Birthdate -->
          <div class="flex flex-column gap-1">
            <label for="birthdate" birthdate> Date of Birth </label>
            <Calendar
              v-model="birthdate"
              showIcon
              :showOnFocus="false"
              inputId="birthdate"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex flex-column gap-1">
          <div class="flex justify-content-center">
            <Button label="Create your account" class="shadow-3 w-full" />
          </div>
          <div class="flex gap-2 justify-content-center">
            <span>Already have an account ?</span>
            <a
              href="#"
              class="text-blue-500 font-medium hover:text-blue-700"
              style="text-decoration: none"
              >Log In</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
