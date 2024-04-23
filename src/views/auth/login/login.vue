<script setup>
import * as Yup from 'yup'
import { reactive } from 'vue'
import { useForm } from 'vee-validate'
import InputTextValidate from '@/components/InputTextValidate.vue'
import { useRouter } from 'vue-router'
import AuthBanner from '@/components/AuthBanner.vue'
import { StoreApp } from '@/services/stores'
import { appLocalStorage } from '@/utils'
import { updateAuthorizationHeader } from '@/services/api'

const router = useRouter()

const { onActionLoginAccount } = StoreApp()

const formData = reactive({
  email: '',
  password: ''
})

const schema = Yup.object({
  email: Yup.string().required('Please enter your email'),
  password: Yup.string().required('Please enter a password')
})

const { values: infoData, handleSubmit } = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(async () => {
  const res = await onActionLoginAccount(infoData)
  if (res.success) {
    updateAuthorizationHeader(res?.data?.accessToken)
    appLocalStorage.value = res?.data
    router.push({ name: 'MyClassroom', query: { type: 'myClassRoom' } })
  }
})
</script>

<template>
  <div class="flex align-items-center h-screen">
    <!-- Left -->
    <AuthBanner />

    <!-- Right -->
    <div class="flex-1 flex flex-column align-items-center gap-4">
      <div class="flex flex-column align-items-center">
        <span class="text-xl text-color-secondary font-medium">Welcome to</span>
        <span class="text-5xl font-semibold text-blue-500">S Web Vocab</span>
        <span class="text-base text-400">Log in to continue.</span>
      </div>

      <div class="flex flex-column gap-3 w-20rem">
        <InputTextValidate
          name="email"
          class="w-full"
          placeholder="Email"
          @keypress.enter="onSubmit"
        />

        <InputTextValidate
          name="password"
          type="password"
          class="w-full"
          placeholder="Password"
          @keypress.enter="onSubmit"
        />

        <Button label="Sign In" @click="onSubmit" />

        <div class="flex gap-3 align-items-center">
          <span class="flex-1 border-top-1 text-300" />
          <span class="text-700">or</span>
          <span class="flex-1 border-top-1 text-300" />
        </div>

        <Button
          label="Sign Up"
          class="w-full"
          outlined
          @click="router.replace({ name: 'SignUp' })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
