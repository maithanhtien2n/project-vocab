<script setup>
import { ref, onMounted } from 'vue'
import menuList from '@/components/menuList.vue'

const lessonId = ref(1)

const lessons = ref([
  {
    id: 0,
    title: 'Lesson 1: Introduction',
    translateTitle: 'Giới thiệu',
    isTranslate: true,
    isExample: true,
    vocab: [
      {
        idVocab: 0,
        word: 'Work Experience',
        translate: 'Kinh nghiệm làm việc',
        example: 'I have 2 years work experience in the IT field',
        translateWord: 'Tôi có 2 năm kinh nghiệm làm việc trong lĩnh vực CNTT',
        isFavorite: false
      },
      {
        idVocab: 1,
        word: 'Studied',
        translate: 'Đã học',
        example: 'I studied Software Engineer at Phu Yen University for 4 years',
        translateWord: 'Tôi đã học Kỹ sư phần mềm tại Đại học Phú Yên được 4 năm',
        isFavorite: true
      },
      {
        idVocab: 2,
        word: 'Studied222',
        translate: 'Đã học222',
        example: 'I studied Software Engineer at Phu Yen University for 4 years',
        translateWord: 'Tôi đã học Kỹ sư phần mềm tại Đại học Phú Yên được 4 năm',
        isFavorite: true
      },
      {
        idVocab: 3,
        word: 'Studied333',
        translate: 'Đã học333',
        example: 'I studied Software Engineer at Phu Yen University for 4 years',
        translateWord: 'Tôi đã học Kỹ sư phần mềm tại Đại học Phú Yên được 4 năm',
        isFavorite: true
      }
    ]
  },
  {
    id: 2,
    title: 'Lesson 2: Brands',
    translateTitle: 'Thương hiệu',
    isTranslate: true,
    isExample: true,
    vocab: [
      {
        word: 'Brands',
        translate: 'Thương hiệu',
        example:
          'Consumers often make purchasing decisions based on the reputation and quality of brands',
        translateWord:
          'Người tiêu dùng thường đưa ra quyết định mua hàng dựa trên uy tín, chất lượng của thương hiệu',
        isFavorite: false
      },
      {
        idVocab: 3,
        word: 'Studied333',
        translate: 'Đã học333',
        example: 'I studied Software Engineer at Phu Yen University for 4 years',
        translateWord: 'Tôi đã học Kỹ sư phần mềm tại Đại học Phú Yên được 4 năm',
        isFavorite: true
      }
    ]
  },
  {
    id: 3,
    title: 'Lesson 3: Classroom',
    translateTitle: 'Lớp học',
    isTranslate: true,
    isExample: true,
    vocab: [
      {
        word: 'pencil sharpener',
        translate: 'cái gọt bút chì',
        example: 'Laura, can I please borrow your pencil sharpener?',
        translateWord: 'Laura, cho tôi mượn cái gọt bút chì của bạn được không?',
        isFavorite: false
      },
      {
        word: 'protractor',
        translate: 'Thước đo góc',
        example: 'Use a protractor to set the fully extended blade at 10 degrees off vertical.',
        translateWord:
          'Sử dụng thước đo góc để đặt lưỡi dao đã mở rộng hoàn toàn lệch 10 độ theo chiều dọc.',
        isFavorite: false
      }
    ]
  }
])

const isTranslate = ref(true)
const isListen = ref(true)
const currentLessonMenu = ref(0)
const currentLessonIndex = ref(0)
const currentVocabIndex = ref(0)
const currentLesson = ref(lessons.value[currentLessonIndex.value])
const currentStep = ref('lessonTitle')
const score = ref(0)
const answer = ref('')

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

  const lessonIndex = lessons.value.findIndex((lesson) => lesson.id === lessonId)

  if (lessonIndex !== -1) {
    currentLessonIndex.value = lessonIndex
    currentVocabIndex.value = 0
    currentLesson.value = lessons.value[currentLessonIndex.value]
    currentStep.value = 'lessonTitle'
  }
}

const move = () => {
  console.log('run')
  if (currentVocabIndex.value >= currentLesson.value.vocab.length) {
    currentVocabIndex.value = 0
    currentLessonIndex.value += 1
    if (currentLessonIndex.value >= lessons.value.length) {
      currentStep.value = 'finish'
    } else {
      currentLesson.value = lessons.value[currentLessonIndex.value]
      currentStep.value = 'lessonTitle'
      currentLessonMenu.value = currentLesson.value.id
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
const err = ref(null)

const nextVocabStep = () => {
  if (
    answer.value.toLowerCase() ===
    currentLesson.value.vocab[currentVocabIndex.value].word.toLowerCase()
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

            <div>
              <span>score: {{ score }}</span>
            </div>
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
                v-if="currentVocabIndex < currentLesson.vocab.length"
                class="flex flex-column gap-5"
              >
                <span v-if="isTranslate" class="font-bold text-3xl">
                  {{ currentLesson.vocab[currentVocabIndex].translate }}
                </span>

                <div v-if="!err || err <= 3">
                  <InputText v-model="answer" class="text-center" />
                </div>

                <div v-if="err === 4">
                  <span>câu trả lời: {{ currentLesson.vocab[currentVocabIndex].word }}</span>
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
