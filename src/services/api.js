import axios from 'axios'

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
  baseURL: 'http://localhost:3000/api/v1'
})

export { AxiosInstance }
