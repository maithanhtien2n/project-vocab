<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { lessonEng } from './services/data.js'
import menuList from '@/components/menuList.vue'
import vocabularyItem from './components/vocabularyItem.vue'

const lesson = ref(lessonEng)

const currentLesson = ref(0)

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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="flex gap-2">
    <div class="relative w-2rem md:w-5rem">
      <menuList :item="lesson" @onClickItemMenu="scrollToLesson" :currentLesson="currentLesson" />
    </div>

    <div class="mt-4 md:mt-7 py-4 md:pt-2 flex-1 pl-2" style="margin-inline: auto">
      <div class="flex flex-column gap-3 mx-0 md:mx-8" style="margin-inline: auto">
        <div class="flex gap-2 align-items-center">
          <i
            @click="onClickIsAll('isTranslate')"
            class="pi pi-language cursor-pointer hover:text-purple-500 transition-duration-100 can-not-copy"
            :class="isAllTranslate ? 'text-purple-700' : ''"
            style="min-width: 8.2rem"
          >
            {{ isAllTranslate ? ' Tắt tất cả dịch' : ' Mở tất cả dịch' }}
          </i>

          <span class="text-color-secondary" style="cursor: default">|</span>

          <i
            @click="onClickIsAll('isExample')"
            class="pi pi-book cursor-pointer hover:text-purple-500 transition-duration-100 can-not-copy"
            :class="isAllExample ? 'text-purple-700' : ''"
          >
            {{ isAllExample ? ' Tắt tất cả ví dụ' : ' Mở tất cả ví dụ' }}
          </i>
        </div>

        <vocabularyItem :lesson="lesson" />
      </div>
    </div>
  </div>
</template>
