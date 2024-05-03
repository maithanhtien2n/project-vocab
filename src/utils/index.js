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

const resizeImage = (file, maxSizeInBytes, callback) => {
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Tính toán kích thước mới dựa trên tỷ lệ giữa chiều rộng và chiều cao ban đầu
      let scale = 1
      if (img.width > img.height) {
        scale = maxSizeInBytes / (img.width * img.height)
      } else {
        scale = maxSizeInBytes / (img.height * img.width)
      }
      const newWidth = img.width * Math.sqrt(scale)
      const newHeight = img.height * Math.sqrt(scale)

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      canvas.toBlob(
        function (blob) {
          callback(blob)
        },
        'image/jpeg',
        0.9
      ) // Chỉ số chất lượng có thể điều chỉnh tùy thuộc vào nhu cầu
    }
    img.src = event.target.result
  }

  reader.readAsDataURL(file)
}

const onCopyText = (text) => {
  // Tạo một vùng chứa (textarea) ẩn để chứa văn bản cần sao chép
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea) // Thêm textarea vào body

  // Chọn văn bản trong textarea và sao chép vào clipboard
  textarea.select()
  document.execCommand('copy')

  // Loại bỏ textarea đã tạo ra khỏi DOM
  document.body.removeChild(textarea)
}

const formatDateToDDMMYY = (timestamp) => {
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Lưu ý rằng tháng bắt đầu từ 0
  const year = String(date.getFullYear())

  return `${day}/${month}/${year}`
}

export {
  appLocalStorage,
  userData,
  accessToken,
  onDeleteAppLocalStorage,
  isEmpty,
  isValidEmail,
  onValidPassword,
  resizeImage,
  onCopyText,
  formatDateToDDMMYY
}
