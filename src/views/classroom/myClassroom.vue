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
  onActionJoinClassRoom
} = STORE_CLASS_ROOM.StoreClassRoom()

const formData = reactive({
  accountId: userData.value?._id,
  image: null,
  roomName: '',
  description: '',
  author: userData.value?.fullName,
  numberOfUsers: null,
  password: ''
})

const visible = ref(false)
const isPassword = ref(false)
const popUpType = ref('')
const classRoomId = ref('')
const passwordJoin = ref('')

const schema = Yup.object({
  roomName: Yup.string().required('Please enter the name room'),
  description: Yup.string().required('Please enter description'),
  numberOfUsers: Yup.string().required('Please enter number of users'),
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
  console.log(visible.value)
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
          data: { accountId: userData.value?._id, type: route.query.type },
          noLoading: true
        })
      }
    }
  })
}

const onClickRoomJoin = (classRoomId) => {
  router.push({
    name: 'Vocabulary',
    params: { id: classRoomId },
    query: { type: route.query.type }
  })
}

const onClickJoinRoom = () => {
  confirm.require({
    message: 'Are you sure you want to join this room?',
    header: 'Join room',
    rejectClass: 'p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Join',
    isPassword: true,
    accept: async () => {
      const res = await onActionJoinClassRoom({
        accountId: userData.value?._id,
        classRoomId: classRoomId.value,
        password: passwordJoin.value
      })
      if (res.success) {
        await onActionGetClassRoom({
          data: { accountId: userData.value?._id, type: route.query.type },
          noLoading: true
        })
      }
    }
  })
}

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveClassRoom(infoData)
  if (res.success) {
    await onActionGetClassRoom({
      data: { accountId: userData.value?._id, type: route.query.type },
      noLoading: true
    })
    visible.value = false
  }
})

watch(
  () => route.query.type,
  (type) => {
    onActionGetClassRoom({ data: { accountId: userData.value?._id, type: type } })
  }
)

onMounted(() => {
  onActionGetClassRoom({ data: { accountId: userData.value?._id, type: route.query.type } })
})
</script>

<template>
  <div class="p-4">
    <span class="text-2xl font-bold">{{ title }}</span>
    <div class="mt-3 flex gap-6 flex-wrap">
      <div
        v-for="(item, index) in classRoom"
        :key="index"
        class="flex gap-3 pr-3"
        style="width: 27rem"
      >
        <div class="relative">
          <img
            :src="item?.image || '/images/icon-class-room.jpg'"
            class="w-13rem h-13rem border-round-2xl"
            alt="Lỗi ảnh"
            style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
          />
          <h3 style="top: 0.5rem; left: 1rem; color: #fff; max-width: 6rem" class="absolute">
            {{ item?.roomName }}
          </h3>

          <div
            v-if="route.query.type === 'myClassRoom'"
            style="right: 0.7rem; top: 0.7rem"
            class="absolute flex flex-column justify-content-center gap-2"
          >
            <i
              class="pi pi-pen-to-square on-click"
              @click="onClickOpenPopup('Update', item?._id)"
            />
            <i class="pi pi-trash on-click" @click="onClickDeleteRoom(item?._id)" />
          </div>
        </div>

        <div class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <span class="font-bold" @click="onCopyRoomId">Copy Room ID</span>
            <span class="font-bold on-click" @click="onClickRoomJoin(item?._id, item?.password)">
              {{ item?.roomName }}
            </span>
            <span>{{ item?.description }}</span>
          </div>

          <div class="flex flex-column gap-2">
            <span class="font-bold">Author</span>
            <span>{{ item?.author }}</span>
          </div>

          <div class="flex align-items-center gap-3">
            <i v-if="!item.password" class="pi pi-globe" />
            <i v-else class="pi pi-lock" />

            <div class="flex gap-2 align-items-center">
              <i class="pi pi-users" />
              <span>{{ item?.memberInRoom?.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!classRoom.length"
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
        @click="onClickJoinRoom()"
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
            @keypress.enter="onSubmit"
          />

          <InputTextValidate
            label="Description"
            name="description"
            class="w-full"
            @keypress.enter="onSubmit"
          />

          <InputTextValidate
            label="Number of users"
            name="numberOfUsers"
            class="w-full"
            type="number"
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

  <ConfirmDialog>
    <template #message="slotProps">
      <div v-if="slotProps.message.isPassword" class="flex flex-column gap-3 align-items-center">
        <div class="flex flex-column gap-2">
          <div class="font-bold">Room ID<span class="p-error"> *</span></div>
          <InputText type="text" v-model="value" />
        </div>
        <InputOtp v-model="passwordJoin" />
      </div>
      <span v-else>{{ slotProps.message.message }}</span>
    </template>
  </ConfirmDialog>
</template>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
