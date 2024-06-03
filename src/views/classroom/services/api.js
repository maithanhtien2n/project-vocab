import { AxiosInstance } from "@/services/api";

class ApiClassRoom {
  getClassRoom = async ({ data, noLoading }) => {
    return await AxiosInstance({
      method: "GET",
      url: `class-rooms/my-class-room`,
      params: data,
      noLoading,
    });
  };

  saveClassRoom = async (data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `class-rooms?classRoomId=${data?._id || null}`,
      data: data,
    });
  };

  getDetailClassRoom = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `class-rooms/${id}`,
    });
  };

  deleteClassRoom = async (id) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `class-rooms/${id}`,
    });
  };

  joinClassRoom = async ({ accountId, classRoomId, password }) => {
    return await AxiosInstance({
      method: "PUT",
      url: `class-rooms/join`,
      params: { accountId, classRoomId, password },
    });
  };

  isPassword = async ({ classRoomId }) => {
    return await AxiosInstance({
      method: "PUT",
      url: `class-rooms/is-password`,
      params: { classRoomId },
    });
  };

  getDetailVocabulary = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `vocab/${id}`,
    });
  };

  saveVocabulary = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `vocab`,
      data: args,
    });
  };

  updateVocabulary = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `vocab/${args.id}`,
      data: args,
    });
  };

  getVocabularyList = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `vocab`,
      params,
    });
  };

  deleteVocabularyItem = async (params) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `vocab`,
      data: { ids: [params] },
    });
  };

  getMemberList = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `class-rooms/${params}/get-member`,
    });
  };

  updateRoleMember = async (data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `class-rooms/set-role`,
      data,
    });
  };

  leaveMember = async (id, data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `class-rooms/${id}/remove-member`,
      params: {
        typeRemove: data.typeRemove,
        memberInRoomId: data.memberInRoomId,
      },
    });
  };
}

export const API_CLASS_ROOM = new ApiClassRoom();
