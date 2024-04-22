<script setup>
import * as Yup from 'yup'
import { reactive } from 'vue'
import { useForm, useField } from 'vee-validate'
import InputTextValidate from '@/components/InputTextValidate.vue'
import { useRouter } from 'vue-router'
import AuthBanner from '@/components/AuthBanner.vue'
import { isValidEmail, onValidPassword } from '@/utils'
import { StoreApp } from '@/services/stores'

const { onActionRegisterAccount } = StoreApp()

const router = useRouter()

const formData = reactive({
  fullName: '',
  dayOfBirth: null,
  email: '',
  password: '',
  passwordConfirm: ''
})

const schema = Yup.object({
  fullName: Yup.string().required('Please enter your full name'),
  dayOfBirth: Yup.string().required('Please enter your date of birth'),
  email: Yup.string()
    .test('email', 'Your email is not valid', (v) => isValidEmail(v))
    .required('Please enter your email'),
  password: Yup.string()
    .test('password', 'Must be at least 6 characters', (v) => onValidPassword(v))
    .required('Please enter a password'),
  passwordConfirm: Yup.string()
    .when('password', (v, schema, { value }) => {
      return schema.test('', 'Confirmation password does not match', () => v[0] === value)
    })
    .required('Please enter the confirmation password')
})
const { values: infoData, handleSubmit } = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true
})

const { value: dayOfBirth, errorMessage: errDayOfBirth } = useField('dayOfBirth')

const onSubmit = handleSubmit(async () => {
  const res = await onActionRegisterAccount(infoData)
  if (res.success) {
    router.push({ name: 'Login' })
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
        <span class="text-3xl font-semibold text-blue-500">Create an account</span>
      </div>

      <div class="flex flex-column gap-3 w-25rem">
        <div class="flex gap-2">
          <InputTextValidate label="Full name" name="fullName" class="" />

          <div class="flex flex-column gap-2">
            <div>Day of birth<span class="p-error">*</span></div>
            <div class="flex flex-column gap-1">
              <Calendar v-model="dayOfBirth" showIcon :showOnFocus="false" />
              <small v-show="errDayOfBirth" class="p-error">
                {{ errDayOfBirth }}
              </small>
            </div>
          </div>
        </div>

        <InputTextValidate label="Email address" name="email" class="w-full" />

        <div class="flex gap-2">
          <InputTextValidate label="Password" name="password" type="password" class="w-full" />

          <InputTextValidate
            label="Password confirm"
            name="passwordConfirm"
            type="password"
            class="w-full"
          />
        </div>

        <Button label="Create account" @click="onSubmit" />

        <div class="w-full flex justify-content-center">
          <div class="flex gap-1">
            <span> Do you already have an account? </span>
            <span
              style="color: #059669; cursor: pointer"
              class="font-bold"
              @click="router.replace({ name: 'Login' })"
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
