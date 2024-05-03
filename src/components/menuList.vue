<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  item: {
    type: Array,
    default: null
  },
  currentLesson: {
    type: Number,
    default: null
  }
})

const currentLessons = computed(() => props.currentLesson)

const emits = defineEmits(['onClickItemMenu'])

const onClickItemMenu = (id) => {
  emits('onClickItemMenu', id)
}
</script>

<template>
  <!--         style="box-shadow: 5px 0 10px -5px rgba(248, 159, 91)" -->
  <div
    class="w-3rem md:w-7rem border-right-1 border-green-500 can-not-copy"
    style="box-shadow: 5px 0 10px -5px rgba(163, 25, 255, 0.75); position: fixed; top: 0; bottom: 0"
  >
    <div class="mx-2">
      <div class="flex flex-column mt-7">
        <div
          @click="router.back()"
          class="flex gap-1 py-2 align-items-center justify-content-center cursor-pointer hover:bg-green-100 hover:text-green-700 transition-duration-200"
        >
          <i class="pi pi-arrow-circle-left text-sm"></i>
          <span class="hidden md:flex">Back</span>
        </div>
      </div>

      <hr class="w-11" />

      <div v-for="(lesson, index) in item" :key="lesson.id" class="flex flex-column">
        <span
          @click="onClickItemMenu(lesson.id)"
          class="hidden md:flex text-sm cursor-pointer hover:text-green-700 transition-duration-200 text-center"
          :class="{
            'font-bold text-green-700': lesson?.id === currentLessons
          }"
        >
          {{ lesson.title }}
        </span>

        <span
          @click="onClickItemMenu(lesson.id)"
          class="flex-inline md:hidden text-sm cursor-pointer hover:text-green-700 transition-duration-200 text-center"
          :class="{
            'font-bold text-green-700 text-base': lesson.id === currentLessons
          }"
          v-tooltip.right="lesson.title"
        >
          {{ index + 1 }}
        </span>

        <hr v-if="index !== item.length - 1" class="w-11" />
      </div>
    </div>
  </div>
</template>
