import axios from 'axios'
import { accessToken } from '@/utils'

export * as API_CLASS_ROOM from '@/views/classroom/services/api'

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
  baseURL: 'http://localhost:3100/api/v1'
})

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete AxiosInstance.defaults.headers.common['Authorization']
  }
}

updateAuthorizationHeader(accessToken?.value)

export { AxiosInstance, updateAuthorizationHeader }
