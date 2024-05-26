<script setup>
import * as Yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { computed, ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userData } from '@/utils'
import ImageValidate from '@/components/ImageValidate.vue'
import InputTextValidate from '@/components/InputTextValidate.vue'
import { useConfirm } from 'primevue/useconfirm'
import { STORE_CLASS_ROOM } from '@/services/stores'

const confirm = useConfirm()

const router = useRouter()
const route = useRoute()

const {
  onGetterClassRooms: classRoom,
  onActionGetClassRoom,
  onActionGetDetailClassRoom,
  onActionSaveClassRoom,
  onActionDeleteClassRoom,
  onActionIsPassword,
  onActionJoinClassRoom
} = STORE_CLASS_ROOM.StoreClassRoom()

const formData = reactive({
  image: null,
  roomName: '',
  description: '',
  author: userData.value?.fullName,
  numberOfUsers: null,
  password: ''
})

const visible = ref(false)
const isShowPopupJoinRoom = ref(false)
const isPassword = ref(false)
const popUpType = ref('')
const classRoomId = ref('')
const passwordJoin = ref('')
const showCopied = ref(null)

const schema = Yup.object({
  roomName: Yup.string().required('Please enter the name room'),
  description: Yup.string().required('Please enter description'),
  password: Yup.string().test(
    'password',
    'Please enter a password',
    (value) => !(isPassword.value && !value)
  )
})

const {
  values: infoData,
  handleSubmit,
  resetForm,
  setFieldValue
} = useForm({
  initialValues: formData,
  validationSchema: schema
})

const { value: password, setValue: setPassword, errorMessage: errPassword } = useField('password')

const title = computed(() => {
  switch (route.query.type) {
    case 'myClassRoom':
      return 'MY CLASS ROOM'
    case 'joinedClassroom':
      return 'JOINED CLASS ROOM'
    default:
      return ''
  }
})

const onClickOpenPopup = async (action, id) => {
  if (action === 'Create') {
    resetForm({ values: formData })
  }

  if (action === 'Update') {
    const res = await onActionGetDetailClassRoom(id)
    if (res.success) {
      resetForm({ values: res.data })
      if (res.data?.image) {
        setFieldValue('image', {
          name: res.data?.image?.split('$')[1],
          base64: res.data?.image
        })
      }
    }
  }

  popUpType.value = action
  visible.value = true
}

const onClickDeleteRoom = (classRoomId) => {
  confirm.require({
    message: 'Sure you want to delete this room?',
    header: 'Confirmation',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: async () => {
      const res = await onActionDeleteClassRoom(classRoomId)
      if (res.success) {
        await onActionGetClassRoom({
          data: { type: route.query.type },
          noLoading: true
        })
      }
    }
  })
}

const onCopyIdRoom = (roomID) => {
  // Tạo một phần tử input tạm thời
  const tempInput = document.createElement('input')

  // Thiết lập giá trị của input là nội dung của text
  tempInput.value = roomID

  // Đưa input vào DOM
  document.body.appendChild(tempInput)

  // Chọn nội dung của input
  tempInput.select()

  // Sao chép nội dung đã chọn vào clipboard
  document.execCommand('copy')

  // Xóa input tạm thời khỏi DOM
  document.body.removeChild(tempInput)

  showCopied.value = roomID
  setTimeout(() => {
    showCopied.value = null
  }, 500)
}

const onClickRoomJoin = (classRoomId) => {
  router.push({
    name: 'Vocabulary',
    params: { id: classRoomId },
    query: { type: route.query.type }
  })
}

const isHavePassword = ref(false)

const onClickJoinRoom = async () => {
  if (isHavePassword.value) {
    const res = await onActionJoinClassRoom({
      accountId: userData.value?._id,
      classRoomId: classRoomId.value,
      password: passwordJoin.value
    })

    if (res.success) {
      await onActionGetClassRoom({
        data: { type: route.query.type },
        noLoading: true
      })
      isShowPopupJoinRoom.value = false
      isHavePassword.value = false
      passwordJoin.value = ''
      classRoomId.value = ''
    }
  } else {
    const res = await onActionIsPassword({
      classRoomId: classRoomId.value
    })

    if (res.success) {
      if (res.data.isPassword) {
        isHavePassword.value = true
      } else {
        const res = await onActionJoinClassRoom({
          accountId: userData.value?._id,
          classRoomId: classRoomId.value,
          password: passwordJoin.value
        })

        if (res.success) {
          await onActionGetClassRoom({
            data: { type: route.query.type },
            noLoading: true
          })
          isShowPopupJoinRoom.value = false
          isHavePassword.value = false
          passwordJoin.value = ''
          classRoomId.value = ''
        }
        isHavePassword.value = false
      }
    }
  }
}

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveClassRoom(infoData)
  if (res.success) {
    await onActionGetClassRoom({
      data: { type: route.query.type },
      noLoading: true
    })
    visible.value = false
    isPassword.value = false
  }
})

watch(
  () => route.query.type,
  (type) => {
    onActionGetClassRoom({ data: { type: type } })
  }
)

onMounted(() => {
  onActionGetClassRoom({ data: { type: route.query.type } })
})
</script>

<template>
  <Dialog v-model:visible="isShowPopupJoinRoom" modal class="w-30rem">
    <template #header>
      <span class="text-2xl font-bold">Join room</span>
    </template>

    <div class="flex flex-column gap-3 align-items-center w-full">
      <div class="flex flex-column gap-2 w-full">
        <div class="font-bold">Room ID<span class="p-error"> *</span></div>
        <InputText type="text" v-model="classRoomId" class="w-full" />
      </div>

      <InputOtp v-if="isHavePassword" v-model="passwordJoin" />
    </div>

    <template #footer>
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="isShowPopupJoinRoom = false"
      />
      <Button type="button" label="Join" @click="onClickJoinRoom" />
    </template>
  </Dialog>
  <div class="p-4">
    <span class="text-2xl font-bold">{{ title }}</span>
    <div class="mt-3 flex gap-3 flex-wrap">
      <div
        v-for="(item, index) in classRoom"
        :key="index"
        @click="onClickRoomJoin(item?._id, item?.password)"
        class="flex gap-3 cursor-pointer border-round-2xl shadow-2 hover:shadow-4 transition-duration-100"
        style="width: 25rem"
      >
        <div class="w-25rem h-14rem relative">
          <div class="absolute bg-white p-1 border-round" style="top: 0.5rem; left: 0.5rem">
            <span
              v-tooltip.top="'Sao chép ID phòng'"
              class="line-clamp-1"
              style="word-break: break-word; overflow-wrap: anywhere"
              @click.stop="onCopyIdRoom(item?._id)"
            >
              {{ showCopied === item?._id ? 'Copied!' : 'Copy ID' }}
            </span>
          </div>

          <img
            :src="item?.image || '/images/icon-class-room.jpg'"
            class="w-full h-full border-round-2xl border-noround-right bg-green-200"
            style="object-fit: cover"
            alt="Lỗi ảnh"
          />
        </div>

        <div class="flex flex-column gap-3 align-content-between w-full py-3 relative">
          <div class="flex flex-column gap-3 w-full">
            <div class="flex flex-column gap-2">
              <span
                class="font-bold on-click line-clamp-1 w-10"
                style="word-break: break-word; overflow-wrap: anywhere"
              >
                {{ item?.roomName }}
              </span>

              <span
                class="line-clamp-3 w-10"
                style="height: 3.5rem; word-break: break-word; overflow-wrap: anywhere"
              >
                {{ item?.description }}
              </span>
            </div>

            <div class="flex flex-column gap-2">
              <span class="font-bold">Author</span>

              <span>{{ item?.author }}</span>
            </div>
          </div>

          <div class="flex align-items-center gap-3">
            <i v-if="!item.password" class="pi pi-globe" />

            <i v-else class="pi pi-lock" v-tooltip.right="'Phòng có khóa'" />

            <div class="flex gap-2 align-items-center" v-tooltip.right="'Số lượng người'">
              <i class="pi pi-users" />

              <span>{{ item?.memberInRoom?.length }}</span>
            </div>
          </div>

          <div
            style="right: 1rem; top: 0.7rem"
            class="absolute flex flex-column justify-content-center gap-2"
          >
            <i
              v-if="route.query.type === 'myClassRoom'"
              class="pi pi-pen-to-square on-click hover:text-green-400 transition-duration-100"
              v-tooltip.right="'Sửa phòng'"
              @click.stop="onClickOpenPopup('Update', item?._id)"
            />

            <i
              class="pi pi-trash on-click hover:text-red-400 transition-duration-100"
              v-tooltip.right="'Xóa phòng'"
              @click.stop="onClickDeleteRoom(item?._id)"
            />
          </div>
        </div>
      </div>

      <div
        v-if="!classRoom?.length"
        class="w-full h-23rem flex justify-content-center align-items-center"
      >
        <span> There are no rooms yet.</span>
      </div>
    </div>

    <!-- Add Dialog -->
    <div class="card flex justify-content-center bottom-right absolute">
      <Button
        v-if="route.query.type === 'myClassRoom'"
        style="bottom: 5rem; right: 7rem"
        class="fixed"
        icon="pi pi-plus"
        rounded
        aria-label="Filter"
        @click="onClickOpenPopup('Create')"
      />

      <Button
        v-if="route.query.type === 'joinedClassroom'"
        style="bottom: 5rem; right: 7rem"
        class="fixed"
        label="Join room"
        @click="isShowPopupJoinRoom = true"
      />

      <Dialog v-model:visible="visible" modal :style="{ width: '27rem' }">
        <template #header>
          <span class="font-bold text-2xl">{{ popUpType }} Room</span>
        </template>

        <div class="flex flex-column gap-2">
          <div class="flex gap-3 align-items-end">
            <ImageValidate name="image" class="image w-6rem h-6rem" />
            <span class="p-text-secondary block mb-5">
              Fill in the details to create a new room.
            </span>
          </div>

          <InputTextValidate
            label="Room name"
            name="roomName"
            class="w-full"
            :inputTextProps="{ maxlength: 50 }"
            @keypress.enter="onSubmit"
          />

          <InputTextValidate
            label="Description"
            name="description"
            class="w-full"
            :inputTextProps="{ maxlength: 100 }"
            @keypress.enter="onSubmit"
          />

          <InputTextValidate
            label="Number of users"
            name="numberOfUsers"
            class="w-full"
            type="number"
            :inputTextProps="{ maxlength: 6 }"
            @keypress.enter="onSubmit"
          />

          <div class="flex mt-2 align-items-center justify-content-between">
            <div class="flex gap-2">
              <Checkbox v-model="isPassword" :binary="true" @click="setPassword('')" />
              <span> Make as private </span>
            </div>
            <div>
              <InputOtp v-if="isPassword" v-model="password" />
              <small v-show="errPassword" class="p-error">
                {{ errPassword }}
              </small>
            </div>
          </div>
        </div>

        <template #footer>
          <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
          <Button :label="popUpType" @click="onSubmit" autofocus />
        </template>
      </Dialog>
    </div>
  </div>

  <ConfirmDialog />
</template>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
