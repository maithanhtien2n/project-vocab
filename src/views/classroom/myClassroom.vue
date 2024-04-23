<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const classlist = ref([
  {
    _id: 1,
    image: '/public/images/picture1.avif',
    name: 'English Vocab',
    description: "Let's learn together!",
    author: 'Guava writer'
  },
  {
    _id: 2,
    image: '/public/images/background2.jpg',
    name: 'Japanese Vocab',
    description: "Let's travel in anime world!",
    author: 'Guava writer'
  }
])

const visible = ref(false)
const checked = ref(false)
const value = ref(null)
</script>

<template>
  <div class="p-4">
    <span class="text-2xl font-bold">MY CLASSROOM</span>
    <div class="mt-3 flex gap-6 flex-wrap">
      <div
        v-for="(item, index) in classlist"
        :key="index"
        class="flex gap-5"
        style="min-width: 20rem"
      >
        <div class="relative">
          <img :src="item?.image" class="w-13rem h-13rem border-round-2xl" alt="Lỗi ảnh" />
          <h3 style="top: 0.5rem; left: 1rem; color: #fff; max-width: 6rem" class="absolute">
            {{ item?.name }}
          </h3>
        </div>

        <div class="flex flex-column gap-5">
          <div class="flex flex-column gap-3">
            <span
              style="cursor: pointer"
              class="font-bold"
              @click="
                router.push({
                  name: 'Vocabulary',
                  params: { id: item?._id },
                  query: { type: route.query.type }
                })
              "
            >
              {{ item?.name }}
            </span>
            <span>{{ item?.description }}</span>
          </div>

          <div class="flex flex-column gap-3">
            <span class="font-bold">Author</span>
            <span>{{ item?.author }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Dialog -->
    <div class="card flex justify-content-center bottom-right absolute">
      <Button
        v-if="route.query.type === 'myClassRoom'"
        style="bottom: 5rem; right: 7rem"
        class="fixed"
        icon="pi pi-plus"
        rounded
        aria-label="Filter"
        @click="visible = true"
      />
      <Dialog v-model:visible="visible" modal header="Create Room" :style="{ width: '27rem' }">
        <span class="p-text-secondary block mb-5">Fill in the details to create a new room.</span>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="username" class="font-semibold w-6rem">Room Name</label>
          <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label class="font-semibold w-6rem">Description</label>
          <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label class="font-semibold w-6rem">Author</label>
          <InputText id="email" class="flex-auto p-disabled" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-4">
          <label class="font-semibold w-6rem">Number of Users</label>
          <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center mb-3">
          <Checkbox v-model="checked" :binary="true" />
          <label for="private" class="ml-2"> Make as Private </label>
        </div>
        <div v-if="checked" class="flex align-items-center gap-3 mb-5">
          <label class="font-semibold w-6rem">Password</label>
          <InputOtp v-model="value" />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="visible = false" />
          <Button type="button" label="Create" @click="visible = false" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
