<script setup>
import { ref, onMounted } from 'vue'
import menuList from '@/components/menuList.vue'
import { useRoute } from 'vue-router'
import { STORE_CLASS_ROOM } from '@/services/stores'

const { onGetterVocabList: lessons } = STORE_CLASS_ROOM.StoreClassRoom()

const route = useRoute()

const lessonId = ref(route.params?.id)

const isTranslate = ref(true)
const isListen = ref(true)
const currentLessonMenu = ref(0)
const currentLessonIndex = ref(0)
const currentVocabIndex = ref(0)
const currentLesson = ref(lessons.value[currentLessonIndex.value])
const currentStep = ref('lessonTitle')
const score = ref(0)
const answer = ref('')
const err = ref(null)

// const shuffle = (arr) => {
//   return [...arr].sort(() => Math.random() - 0.5);
// };

// const shuffleArray = () => {
//   lessons.value = lessons.value.map((item) => {
//     return { ...item, vocab: shuffle(item.vocab) };
//   });
// };

const scrollToLesson = (lessonId) => {
  currentLessonMenu.value = lessonId

  const lessonIndex = lessons.value.findIndex((lesson) => lesson._id === lessonId)

  if (lessonIndex !== -1) {
    currentLessonIndex.value = lessonIndex
    currentVocabIndex.value = 0
    currentLesson.value = lessons.value[currentLessonIndex.value]
    currentStep.value = 'lessonTitle'
  }
}

const move = () => {
  console.log('run')
  if (currentVocabIndex.value >= currentLesson.value?.vocabItems?.length) {
    currentVocabIndex.value = 0
    currentLessonIndex.value += 1
    if (currentLessonIndex.value >= lessons.value.length) {
      currentStep.value = 'finish'
    } else {
      currentLesson.value = lessons.value[currentLessonIndex.value]
      currentStep.value = 'lessonTitle'
      currentLessonMenu.value = currentLesson.value?._id
    }
  }
}

const nextStep = () => {
  if (currentStep.value === 'lessonTitle') {
    currentStep.value = 'vocab'
  } else {
    currentVocabIndex.value = 0
    currentVocabIndex.value += 1
    move()
  }
}

const nextVocabStep = () => {
  if (
    answer.value.toLowerCase() ===
    currentLesson.value?.vocabItems[currentVocabIndex.value].word.toLowerCase()
  ) {
    if (isTranslate.value) {
      score.value += 2
    } else if (isListen.value) {
      score.value += 3
    } else {
      score.value += 2
    }
    currentVocabIndex.value += 1
    move()
    answer.value = ''
  } else {
    score.value -= 1

    err.value += 1
    if (err.value > 4) {
      err.value = null

      currentVocabIndex.value += 1
      move()
      answer.value = ''
    }
  }

  // currentVocabIndex.value += 1;
  // move();
}

// watch(currentLessonMenu.value, () => {
//   shuffleArray();
// });

onMounted(() => {
  scrollToLesson(lessonId.value)

  // shuffleArray();
})
</script>

<template>
  <div class="flex gap-4">
    <div class="relative w-2rem md:w-5rem flex-0">
      <menuList
        :item="lessons"
        @onClickItemMenu="scrollToLesson"
        :currentLesson="currentLessonMenu"
      />
    </div>

    <div class="mt-8 py-4 md:pt-2 flex-1" style="margin-inline: auto">
      <div class="gap-3 mx-0 md:mx-8" style="margin-inline: auto">
        <div class="shadow-custom border-round-md mx-0 md:mx-8 text-center p-4 flex flex-column">
          <div class="flex justify-content-between mx-0 md:mx-8">
            <div class="flex gap-2">
              <i
                @click="isTranslate = !isTranslate"
                v-tooltip.top="isTranslate ? 'Tắt dịch' : 'Mở dịch'"
                class="pi pi-language text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
                :style="!isTranslate ? 'opacity: 0.3' : ''"
              ></i>

              <span class="text-color-secondary" style="cursor: default">|</span>

              <i
                @click="isListen = !isListen"
                v-tooltip.top="isListen ? 'Tắt đọc' : 'Mở đọc'"
                class="pi pi-volume-up text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
                :style="!isListen ? 'opacity: 0.3' : ''"
              ></i>
            </div>

            <!-- <div>
              <span>score: {{ score }}</span>
            </div> -->
          </div>

          <hr class="w-10" />

          <div class="flex flex-column h-20rem justify-content-center">
            <div v-if="currentStep === 'lessonTitle'" class="flex flex-column gap-2">
              <span class="text-3xl font-semibold">
                {{ currentLesson.title }}
              </span>

              <span class="text-sm"> {{ currentLesson.translateTitle }}</span>

              <div class="mt-5">
                <Button @click="nextStep">Bắt đầu</Button>
              </div>
            </div>

            <div v-else-if="currentStep === 'vocab'">
              <div
                v-if="currentVocabIndex < currentLesson.vocabItems.length"
                class="flex flex-column gap-5"
              >
                <span v-if="isTranslate" class="font-bold text-3xl">
                  {{ currentLesson.vocabItems[currentVocabIndex].translateWord }}
                </span>

                <div v-if="!err || err <= 3">
                  <InputText v-model="answer" class="text-center" />
                </div>

                <div v-if="err === 4">
                  <span>câu trả lời: {{ currentLesson.vocabItems[currentVocabIndex].word }}</span>
                </div>

                <span v-if="(err !== null) & (err <= 3)">Sai lần {{ err }}</span>

                <div>
                  <Button @click="nextVocabStep">Tiếp tục</Button>
                </div>
              </div>
              <div v-else>
                <Button @click="nextStep">Tiếp tục</Button>
              </div>
            </div>

            <div v-else>
              <h2>Finish</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-custom {
  box-shadow:
    0px 3px 5px rgba(162, 0, 255, 0.466),
    0px 0px 2px rgba(161, 5, 223, 0.05),
    0px 1px 4px rgba(213, 26, 250, 0.08);
}
</style>
