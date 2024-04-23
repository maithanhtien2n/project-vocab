import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import router from '@/services/router'
import { StoreApp } from '@/services/stores'

const appLocalStorage = useStorage(
  'AppLocalStorage',
  {
    userData: {
      _id: '',
      avatar: null,
      fullName: '',
      phoneNumber: null,
      gender: null,
      dayOfBirth: '',
      address: null,
      email: '',
      role: ''
    },
    accessToken: ''
  },
  localStorage,
  { mergeDefaults: true }
)

const userData = computed(() => appLocalStorage.value.userData)
const accessToken = computed(() => appLocalStorage.value.accessToken)

const onDeleteAppLocalStorage = () => {
  StoreApp().onActionLoadingActive(true)
  localStorage.removeItem('AppLocalStorage')

  appLocalStorage.value = {
    userData: {},
    accessToken: ''
  }

  router.replace({ name: 'Login' })

  setTimeout(() => {
    StoreApp().onActionLoadingActive(false)
  }, 1000)
}

const isEmpty = (value) => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && !value.length) ||
    (!!value && value.constructor === Object && Object.keys(value).length === 0)
  )
}

const isValidEmail = (email) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

const onValidPassword = (password) => {
  const regex = /^.{6,}$/
  return regex.test(password)
}

export {
  appLocalStorage,
  userData,
  accessToken,
  onDeleteAppLocalStorage,
  isEmpty,
  isValidEmail,
  onValidPassword
}
