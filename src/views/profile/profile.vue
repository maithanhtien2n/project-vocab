<script setup>
import { ref } from 'vue'

// const toast = useToast();
const passwordVisible = ref(false)

const profile = ref({
  image: '/public/images/user.png',
  name: 'Nguyễn Thị A',
  email: 'anguyenthi@gmail.com',
  phoneNumber: '0123456789',
  gender: 'Nữ',
  birthDate: '01/01/2002',
  address: 'Bách Khoa, Hai Bà Trưng, Hà Nội'
})

const changePassword = ref({
  password: null,
  newPassword: null,
  confirmPassword: null
})

const genderType = ref([
  {
    code: '1',
    name: 'Nam'
  },
  {
    code: '0',
    name: 'Nữ'
  }
])

const onUpload = (event) => {
  const reader = new FileReader()
  reader.readAsDataURL(event.target.files[0])
  reader.onload = (e) => {
    profile.value.image = e.target.result
  }
}
</script>

<template>
  <div class="flex flex-column p-4">
    <span class="text-2xl font-bold">PROFILE</span>
    <div class="flex flex-column lg:flex-row gap-8 p-3 align-items-center justify-content-center">
      <!-- Ảnh  -->
      <div class="flex flex-column gap-3 relative">
        <div style="overflow: hidden" class="w-15rem h-15rem">
          <img
            :src="profile.image"
            class="w-full h-full border-circle border-1 text-300"
            style="object-fit: cover"
          />
        </div>
        <!-- File upload -->
        <div
          class="flex flex-column gap-2 absolute bottom-0 border-circle"
          style="margin-left: 11rem; height: 50px; width: 2.5rem"
          for="upload"
        >
          <div
            class="bg-white relative overflow-hidden flex align-items-center text-600 justify-content-center w-3rem h-10rem border-1 border-dashed border-circle"
          >
            <div class="flex flex-column text-center">
              <i style="font-size: 1.2rem" class="pi pi-camera" />
              <input
                type="file"
                style="top: -5rem"
                accept="image/*"
                class="absolute bottom-0 left-0 right-0 cursor-pointer"
                @change="onUpload"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- thông tin -->
      <div class="flex flex-column gap-2">
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Full name</span>
          <InputText v-model="profile.name" class="h-1 w-8 pl-2" />
        </div>

        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Email</span>
          <InputText v-model="profile.email" class="h-1 w-8 pl-2" />
        </div>

        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Mobile number</span>
          <InputText v-model="profile.phoneNumber" class="h-1 w-8 pl-2" />
        </div>

        <!-- Gender -->
        <div class="flex gap-5 text-base align-items-center h-2rem">
          <span class="w-8rem font-semibold">Gender</span>
          <div v-for="gender in genderType" :key="gender.code">
            <RadioButton
              v-model="profile.gender"
              :inputId="gender.code"
              :name="gender.name"
              :value="gender.name"
            />
            <label class="ml-2">{{ gender.name }}</label>
          </div>
        </div>

        <!-- Birth Date -->
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Date of birth</span>
          <div class="w-20rem">
            <Calendar
              inputClass="pl-2"
              v-model="profile.birthDate"
              dateFormat="dd/mm/yy"
              showIcon
              class="w-full"
            />
          </div>
        </div>

        <!-- address -->
        <div class="flex gap-5 text-base align-items-center card">
          <span class="w-8rem font-semibold">Address</span>
          <Textarea v-model="profile.address" rows="3" class="pl-2 w-20rem" />
        </div>

        <!-- Thay đỏi mật khẩu -->
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Password</span>
          <Button
            label="Change password"
            outlined
            class="h-1 w-8"
            @click="passwordVisible = true"
          />
        </div>

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
            @click="onClickSave"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog Change Password -->
  <Dialog
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
  </Dialog>
</template>
