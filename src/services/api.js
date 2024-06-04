import axios from 'axios'
import { accessToken, onDeleteAppLocalStorage } from '@/utils'

export * as API_CLASS_ROOM from '@/views/classroom/services/api'
export * as API_PROFILE from '@/views/profile/services/api'

class ApiApp {
  onApiLoginAccount = async (args) => {
    return await AxiosInstance({
      method: 'POST',
      url: 'auth/login',
      data: args
    })
  }

  onApiRegisterAccount = async (args) => {
    return await AxiosInstance({
      method: 'POST',
      url: 'auth/register',
      data: args
    })
  }
}

export const API_APP = new ApiApp()

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:3100/api/v1",
  baseURL: 'http://14.225.255.173:3100/api/v1'
})

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete AxiosInstance.defaults.headers.common['Authorization']
  }
}

updateAuthorizationHeader(accessToken?.value)

AxiosInstance.interceptors.request.use((config) => {
  return config
})

AxiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (
      [
        'LOGIN_REQUEST',
        'LOGIN_EXPIRED',
        'AUTH_FAILED',
        'ACCOUNT_IS_LOCKED',
        'ACCOUNT_REQUIRED',
        'ACCESS_IS_NOT_ALLOWED'
      ].includes(error?.response?.data?.statusCode)
    ) {
      onDeleteAppLocalStorage()
    }

    window.scrollTo(0, 0)

    return Promise.reject(error)
  }
)

export { AxiosInstance, updateAuthorizationHeader }
