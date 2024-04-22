import { isEmpty } from '@/utils'
import { ToastService } from '@/utils/toast'
import { StoreApp } from '@/services/stores'

export const Utils = () => {
  const TOAST = ToastService()

  const onResponse = async (value, showToast = false, messageToast) => {
    StoreApp().onActionLoadingActive(true)
    let results = []
    if (!isEmpty(value)) {
      await value
        .then(({ data: res }) => {
          if (res.success) {
            if (!showToast) {
              results = res
            } else {
              results = res
              TOAST.success(messageToast ? messageToast : res.statusValue)
            }
          } else {
            TOAST.error(res.statusValue)
            results = res
          }
        })
        .catch((error) => {
          if (error?.response?.data) {
            results = error?.response?.data
            if (!['ERROR_BALANCE'].includes(error?.response?.data?.statusCode)) {
              TOAST.error(error?.response?.data?.statusValue)
            }
          } else {
            TOAST.error(error)
          }
        })
        .finally(() => {
          StoreApp().onActionLoadingActive(false)
        })
    }
    return results
  }

  return {
    TOAST,
    onResponse
  }
}
