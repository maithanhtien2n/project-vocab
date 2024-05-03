import { AxiosInstance } from '@/services/api'

class ApiProfile {
  getUserInfo = async ({ accountId, noLoading = false }) => {
    return await AxiosInstance({
      method: 'GET',
      url: `auth/user-info/${accountId}`,
      noLoading
    })
  }

  saveUserInfo = async (data) => {
    return await AxiosInstance({
      method: 'PUT',
      url: `auth/save-user-info`,
      data
    })
  }
}

export const API_PROFILE = new ApiProfile()
