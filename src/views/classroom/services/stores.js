import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_CLASS_ROOM } from "@/services/api";

export const StoreClassRoom = defineStore("StoreClassRoom", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_CLASS_ROOM.API_CLASS_ROOM;

  // State
  const classRooms = ref([]);
  const vocabList = ref();
  const memberList = ref();

  // Getter
  const onGetterClassRooms = computed(() => classRooms);
  const onGetterVocabList = computed(() => vocabList);
  const onGetterMemberList = computed(() => memberList);

  // Action
  const onActionGetClassRoom = async ({ data, noLoading = false }) => {
    const res = await onResponse(API.getClassRoom({ data, noLoading }));
    classRooms.value = res.data;
    return res;
  };

  const onActionGetDetailClassRoom = async (id) => {
    const res = await onResponse(API.getDetailClassRoom(id));
    return res;
  };

  const onActionSaveClassRoom = async (data) => {
    const res = await onResponse(API.saveClassRoom(data), true);
    return res;
  };

  const onActionDeleteClassRoom = async (id) => {
    const res = await onResponse(API.deleteClassRoom(id), true);
    return res;
  };

  const onActionJoinClassRoom = async (data) => {
    const res = await onResponse(API.joinClassRoom(data), true);
    return res;
  };

  // Check có id phòng và password ko
  const onActionIsPassword = async (data) => {
    const res = await onResponse(API.isPassword(data));
    return res;
  };

  const onActionGetDetailVocabulary = async (id) => {
    const res = await onResponse(API.getDetailVocabulary(id));
    return res;
  };

  const onActionSaveVocabulary = async (args) => {
    const res = await onResponse(API.saveVocabulary(args), true);
    return res;
  };

  const onActionUpdateVocabulary = async (args) => {
    const res = await onResponse(API.updateVocabulary(args), true);
    return res;
  };

  const onActionGetVocabularyList = async (params) => {
    const res = await onResponse(API.getVocabularyList(params));
    vocabList.value = res.data;

    return res;
  };

  const onActionDeleteVocabularyItem = async (params) => {
    const res = await onResponse(API.deleteVocabularyItem(params));

    return res;
  };

  const onActionGetMemberList = async (params) => {
    const res = await onResponse(API.getMemberList(params));
    memberList.value = res.data;

    return res;
  };

  const onActionUpdateRoleMember = async (data) => {
    const res = await onResponse(API.updateRoleMember(data));

    return res;
  };

  const onActionLeaveMember = async (params, data) => {
    const res = await onResponse(API.leaveMember(params, data));

    return res;
  };

  return {
    // Getter
    onGetterClassRooms,
    onGetterVocabList,
    onGetterMemberList,

    // Action
    onActionGetClassRoom,
    onActionGetDetailClassRoom,
    onActionSaveClassRoom,
    onActionDeleteClassRoom,
    onActionJoinClassRoom,
    onActionIsPassword,
    onActionGetDetailVocabulary,
    onActionSaveVocabulary,
    onActionUpdateVocabulary,
    onActionGetVocabularyList,
    onActionDeleteVocabularyItem,
    onActionGetMemberList,
    onActionUpdateRoleMember,
    onActionLeaveMember,
  };
});
