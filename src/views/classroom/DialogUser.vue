div
<script setup>
import { computed, onMounted } from 'vue'
import { STORE_CLASS_ROOM } from '@/services/stores'
import { useRoute } from 'vue-router'

const route = useRoute()

const {
  onGetterMemberList: member,
  onActionGetMemberList,
  onActionUpdateRoleMember,
  onActionLeaveMember
} = STORE_CLASS_ROOM.StoreClassRoom()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['cancel'])

const isOpened = computed({
  get: () => props.visible,
  set: () => emits('cancel')
})

const onChangeRole = (role) => {
  onActionUpdateRoleMember({
    classRoomId: route.params.id,
    memberInRoomId: role?._id,
    isCensor: role?.isCensor
  }).then(() => {
    onActionGetMemberList(route.params.id)
  })
}

const onClickRemoveMember = (item) => {
  console.log(item)
  console.log(route)
  onActionLeaveMember(route.params.id, {
    typeRemove: 'REMOVE_MEMBER',
    memberInRoomId: item._id
  }).then(() => {
    onActionGetMemberList(route.params.id)
  })
}

onMounted(() => {
  onActionGetMemberList(route.params.id)
})
</script>

<template>
  <Dialog v-model:visible="isOpened" modal dismissableMask class="w-25rem">
    <template #header>
      <span class="text-2xl font-bold">Danh sách User</span>
    </template>

    <div class="flex flex-column gap-3 w-full">
      <div
        v-for="item in member"
        :key="item._id"
        class="flex justify-content-between w-full align-items-center"
      >
        <div class="flex gap-3 align-items-center">
          <img :src="item.avatar || '/images/user.png'" class="w-3rem h-3rem" />

          <div class="flex flex-column gap-2">
            <div>{{ item.fullName }}</div>

            <InputSwitch
              v-if="item.role !== 'ROOM_MASTER' && route.query.type === 'myClassRoom'"
              v-model="item.isCensor"
              @change="onChangeRole(item)"
              v-tooltip.top="'Quyền chỉnh sửa'"
            />
          </div>
        </div>

        <div class="flex align-items-center gap-2">
          <div class="cursor-pointer">
            {{
              item.role === 'ROOM_MASTER'
                ? 'Chủ phòng'
                : item.role === 'MEMBER'
                  ? 'Thành viên'
                  : 'Người kiểm duyệt'
            }}
          </div>

          <i
            v-if="item.role !== 'ROOM_MASTER' && route.query.type === 'myClassRoom'"
            v-tooltip.top="'Xoá thành viên'"
            class="pi pi-times cursor-pointer"
            @click="onClickRemoveMember(item)"
          ></i>
        </div>
      </div>
    </div>
  </Dialog>
</template>
