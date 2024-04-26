import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { API_APP as API } from './api'
import { Utils } from '@/utils/response'

export * as STORE_CLASS_ROOM from '@/views/classroom/services/stores'

export const StoreApp = defineStore('StoreApp', () => {
  const { onResponse } = Utils()

  // State
  const isLoading = ref(false)

  // Getter
  const onGetterIsLoading = computed(() => isLoading)

  // Action
  const onActionLoadingActive = (bl) => {
    isLoading.value = bl
  }

  // Đăng nhập
  const onActionLoginAccount = async (args) => {
    return await onResponse(API.onApiLoginAccount(args))
  }

  // Đăng ký
  const onActionRegisterAccount = async (args) => {
    return await onResponse(API.onApiRegisterAccount(args), true)
  }

  return {
    onGetterIsLoading,

    onActionLoadingActive,
    onActionLoginAccount,
    onActionRegisterAccount
  }
})
