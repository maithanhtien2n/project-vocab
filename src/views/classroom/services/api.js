import { AxiosInstance } from '@/services/api'

class ApiClassRoom {
  getClassRoom = async ({ data, noLoading }) => {
    return await AxiosInstance({
      method: 'GET',
      url: `class-rooms/my-class-room`,
      params: data,
      noLoading
    })
  }

  saveClassRoom = async (data) => {
    return await AxiosInstance({
      method: 'PUT',
      url: `class-rooms?classRoomId=${data?._id || null}`,
      data: data
    })
  }

  getDetailClassRoom = async (id) => {
    return await AxiosInstance({
      method: 'GET',
      url: `class-rooms/${id}`
    })
  }

  deleteClassRoom = async (id) => {
    return await AxiosInstance({
      method: 'DELETE',
      url: `class-rooms/${id}`
    })
  }

  joinClassRoom = async ({ accountId, classRoomId, password }) => {
    return await AxiosInstance({
      method: 'PUT',
      url: `class-rooms/join`,
      params: { accountId, classRoomId, password }
    })
  }
}

export const API_CLASS_ROOM = new ApiClassRoom()
