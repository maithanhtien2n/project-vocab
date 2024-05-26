<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import menuList from '@/components/menuList.vue'
import vocabularyItem from './components/vocabularyItem.vue'
import VocabularySetting from './components/VocabularySetting.vue'
import { useRoute, useRouter } from 'vue-router'
import { STORE_CLASS_ROOM } from '@/services/stores'
import DialogUser from './DialogUser.vue'

const router = useRouter()
const route = useRoute()

const { onGetterVocabList, onActionGetVocabularyList } = STORE_CLASS_ROOM.StoreClassRoom()

const lesson = computed(() => onGetterVocabList.value)

const currentLesson = ref(0)
const isOpenDialog = ref(false)

const isAllTranslate = computed(() => {
  return lesson.value?.every((lesson) => lesson.isTranslate)
})

const isAllExample = computed(() => {
  return lesson.value?.every((lesson) => lesson.isExample)
})

const onClickIsAll = (type) => {
  const newValue = type === 'isExample' ? !isAllExample.value : !isAllTranslate.value
  lesson.value?.forEach((lesson) => {
    lesson[type] = newValue
  })
}

const scrollToLesson = (lessonId) => {
  const element = document.getElementById('lesson-' + lessonId)
  if (element) {
    const yOffset = -75
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  currentLesson.value = lessonId
}

const handleScroll = () => {
  const lessonIds = lesson.value.map((lesson) => ({
    id: lesson.id,
    top: document.getElementById('lesson-' + lesson.id)?.getBoundingClientRect().top
  }))

  const visibleLesson = lessonIds.find(
    (lesson) => lesson.top >= 50 && lesson.top <= window.innerHeight
  )

  if (visibleLesson) {
    currentLesson.value = visibleLesson.id
  } else {
    currentLesson.value = 0
  }
}

const onClickCreateVocab = () => {
  router.push({ query: { setting: 'create' } })
}

const getVocabularyList = () => {
  onActionGetVocabularyList({ classRoomId: route.params.id })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  getVocabularyList()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <VocabularySetting v-if="route.query.setting" />

  <div v-else class="flex gap-2 relative">
    <Button
      label="Tạo mới"
      icon="pi pi-plus"
      class="fixed"
      style="bottom: 3rem; right: 3rem; z-index: 99999"
      @click="onClickCreateVocab"
    />

    <div class="relative w-2rem md:w-5rem">
      <menuList :item="lesson" @onClickItemMenu="scrollToLesson" :currentLesson="currentLesson" />
    </div>

    <div class="mt-4 md:mt-7 py-4 md:pt-2 flex-1 pl-2" style="margin-inline: auto">
      <div class="flex flex-column gap-3 mx-0 md:mx-8" style="margin-inline: auto">
        <div class="flex justify-content-between">
          <div class="font-semibold text-xl">Danh sách Từ vựng</div>

          <div
            class="flex gap-2 align-items-center hover:text-green-600 cursor-pointer"
            @click="isOpenDialog = true"
          >
            <i class="pi pi-users"></i>
            <div>Thành viên</div>
          </div>
        </div>

        <div class="flex gap-2 align-items-center">
          <i
            @click="onClickIsAll('isTranslate')"
            class="pi pi-language cursor-pointer hover:text-green-500 transition-duration-100 can-not-copy"
            :class="isAllTranslate ? 'text-green-700' : ''"
            style="min-width: 8.2rem"
          >
            {{ isAllTranslate ? ' Tắt tất cả dịch' : ' Mở tất cả dịch' }}
          </i>

          <span class="text-color-secondary" style="cursor: default">|</span>

          <i
            @click="onClickIsAll('isExample')"
            class="pi pi-book cursor-pointer hover:text-green-500 transition-duration-100 can-not-copy"
            :class="isAllExample ? 'text-green-700' : ''"
          >
            {{ isAllExample ? ' Tắt tất cả ví dụ' : ' Mở tất cả ví dụ' }}
          </i>
        </div>

        <vocabularyItem :lesson="lesson" @onDeleted="getVocabularyList" />
      </div>
    </div>
  </div>

  <DialogUser :visible="isOpenDialog" @cancel="isOpenDialog = false" />
</template>
