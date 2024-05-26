<script setup>
import { computed } from 'vue'

const emits = defineEmits(['cancel', 'delete'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const isOpened = computed({
  get: () => props.visible,
  set: () => emits('cancel')
})
</script>

<template>
  <Dialog
    v-model:visible="isOpened"
    modal
    class="overflow-hidden border-round-2xl"
    :style="{
      width: '25rem',
      maxHeight: 'calc(100% - 2rem)'
    }"
  >
    <template #header>
      <div class="text-center font-semibold text-base lg:text-lg mx-auto">Xác nhận</div>
    </template>

    <template #default>
      <div class="text-center p-0 m-0 flex justify-content-center">
        <span>Bạn có chắc chắn muốn xóa phòng này?</span>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-3 w-full">
        <Button
          label="Bỏ qua"
          class="p-button-outlined flex-1 text-sm lg:text-base w-full"
          @click="emits('cancel')"
        />

        <Button
          label="Xác nhận"
          class="p-button-danger bg-custom-color-3 flex-1 text-sm lg:text-base mr-0 w-full"
          @click="emits('delete')"
        />
      </div>
    </template>
  </Dialog>
</template>

<style></style>
