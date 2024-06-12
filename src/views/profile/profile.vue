<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import * as Yup from 'yup'
import { useForm, useField } from 'vee-validate'
import InputTextValidate from '@/components/InputTextValidate.vue'
import ImageValidate from '@/components/ImageValidate.vue'
import { STORE_PROFILE } from '@/services/stores'
import { userData, appLocalStorage, formatDateToDDMMYY } from '@/utils'

const { onGetterUserInfo, onActionGetUserInfo, onActionSaveUserInfo } = STORE_PROFILE.StoreProfile()

const formData = reactive({
  avatar: null,
  fullName: '',
  email: '',
  phoneNumber: '',
  gender: '',
  dayOfBirth: '',
  address: ''
})

const accountId = computed(() => userData.value._id)

const schema = Yup.object({
  fullName: Yup.string().required('Please enter your full name'),
  phoneNumber: Yup.string().required('Please enter your phone number'),
  dayOfBirth: Yup.string().required('Please enter your day of birth')
})

const {
  values: infoData,
  handleSubmit,
  resetForm,
  setFieldValue
} = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true
})

const { value: gender } = useField('gender')
const { value: dayOfBirth, errorMessage: errDayOfBirth } = useField('dayOfBirth')
const { value: address } = useField('address')

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveUserInfo({ ...infoData, accountId: accountId.value })
  if (res.success) {
    onActionGetUserInfo({ accountId: accountId.value, noLoading: true }).then((res) => {
      if (res.success) {
        appLocalStorage.value.userData = res?.data
      }
    })
  }
})

// const changePassword = ref({
//   password: null,
//   newPassword: null,
//   confirmPassword: null
// })

// const passwordVisible = ref(false)

watch(onGetterUserInfo, (newUserInfo) => {
  resetForm({ values: Object.assign(formData, newUserInfo) })
  if (newUserInfo.avatar) {
    setFieldValue('avatar', {
      name: newUserInfo?.avatar.split('$')[1],
      base64: newUserInfo?.avatar
    })
  }
  setFieldValue('dayOfBirth', formatDateToDDMMYY(newUserInfo?.dayOfBirth))
})

onMounted(() => {
  onActionGetUserInfo({ accountId: accountId.value })
})
</script>

<template>
  <div class="flex flex-column p-4">
    <span class="text-2xl font-bold">PROFILE</span>
    <div class="flex flex-column lg:flex-row gap-8 p-3 align-items-center justify-content-center">
      <!-- Ảnh  -->
      <ImageValidate name="avatar" class="image w-13rem h-13rem" :required="false" />

      <!-- thông tin -->
      <div class="flex flex-column gap-2">
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Full name</span>
          <InputTextValidate name="fullName" class="h-1 w-8" />
        </div>

        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Email</span>
          <InputTextValidate name="email" class="h-1 w-8" :disabled="true" />
        </div>

        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Phone number</span>
          <InputTextValidate name="phoneNumber" type="number" class="h-1 w-8" />
        </div>

        <!-- Gender -->
        <div class="flex gap-5">
          <span class="w-8rem font-semibold">Gender</span>
          <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center gap-2">
              <RadioButton v-model="gender" name="gender" value="MALE" />
              <label>Nam</label>
            </div>
            <div class="flex align-items-center gap-2">
              <RadioButton v-model="gender" name="gender" value="FEMALE" />
              <label>Nữ</label>
            </div>
          </div>
        </div>

        <!-- Birth Date -->
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Date of birth</span>
          <div class="w-20rem">
            <Calendar
              inputClass="pl-2"
              v-model="dayOfBirth"
              dateFormat="dd/mm/yy"
              showIcon
              class="w-full"
            />
            <small v-show="errDayOfBirth" class="p-error">
              {{ errDayOfBirth }}
            </small>
          </div>
        </div>

        <!-- address -->
        <div class="flex gap-5 text-base align-items-center card">
          <span class="w-8rem font-semibold">Address</span>
          <Textarea v-model="address" rows="3" class="pl-2 w-20rem" />
        </div>

        <!-- Thay đỏi mật khẩu -->
        <!-- <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Password</span>
          <Button
            label="Change password"
            outlined
            class="h-1 w-8"
            @click="passwordVisible = true"
          />
        </div> -->

        <!-- Save Button -->
        <div class="card flex justify-content-end mt-3">
          <Button
            v-tooltip="{
              value: 'Confirm to proceed',
              showDelay: 1000,
              hideDelay: 300
            }"
            label="Save"
            class="w-full h-1"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog Change Password -->
  <!-- <Dialog
    v-model:visible="passwordVisible"
    modal
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <span class="font-semibold w-full text-center text-2xl">Change Password</span>
    </template>

    <div class="flex flex-column gap-3">
      <div class="flex align-items-center">
        <span class="w-11rem"> Current password<span class="text-red-500">*</span> </span>
        <Password v-model="changePassword.password" :feedback="false" toggleMask />
      </div>

      <div class="flex align-items-center">
        <span class="w-11rem"> New password<span class="text-red-500">*</span> </span>
        <Password v-model="changePassword.newPassword" toggleMask />
      </div>

      <div class="flex align-items-center">
        <span class="w-11rem"> Confirm password<span class="text-red-500">*</span> </span>
        <Password v-model="changePassword.confirmPassword" toggleMask />
      </div>
    </div>

    <div class="flex justify-content-end gap-2 pt-3">
      <div class="card flex justify-content-center">
        <Button label="Cancel" @click="passwordVisible = false" outlined />
      </div>
      <div class="card flex justify-content-center">
        <Button label="Save" @click="onClickChangePassword" />
      </div>
    </div>
  </Dialog> -->
</template>
