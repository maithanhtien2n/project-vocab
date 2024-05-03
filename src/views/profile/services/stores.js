import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Utils } from '@/utils/response'
import { API_PROFILE } from '@/services/api'

export const StoreProfile = defineStore('StoreProfile', () => {
  // Các hàm khác
  const { onResponse } = Utils()
  const API = API_PROFILE.API_PROFILE

  // State
  const userInfo = ref({})

  // Getter
  const onGetterUserInfo = computed(() => userInfo)

  // Action
  const onActionGetUserInfo = async ({ accountId, noLoading }) => {
    const res = await onResponse(API.getUserInfo({ accountId, noLoading }))
    userInfo.value = res.data
    return res
  }

  const onActionSaveUserInfo = async (data) => {
    const res = await onResponse(API.saveUserInfo(data), true)
    return res
  }

  return {
    // Getter
    onGetterUserInfo,

    // Action
    onActionGetUserInfo,
    onActionSaveUserInfo
  }
})
