<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { object } from 'yup'

const router = useRouter()

const props = defineProps({
  item: {
    type: Array,
    default: null
  },
  currentLesson: {
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
    class="w-3rem md:w-7rem border-right-1 can-not-copy surface-border"
    style="position: fixed; top: 0; bottom: 0"
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

      <div v-for="(lesson, index) in item" :key="lesson._id" class="flex flex-column">
        <span
          @click="onClickItemMenu(lesson._id)"
          class="hidden md:flex text-sm cursor-pointer hover:text-green-700 transition-duration-200 text-center"
          :class="{
            'font-bold text-green-700': lesson?._id === currentLessons
          }"
        >
          {{ lesson.title }}
        </span>

        <span
          @click="onClickItemMenu(lesson._id)"
          class="flex-inline md:hidden text-sm cursor-pointer hover:text-green-700 transition-duration-200 text-center"
          :class="{
            'font-bold text-green-700 text-base': lesson._id === currentLessons
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
