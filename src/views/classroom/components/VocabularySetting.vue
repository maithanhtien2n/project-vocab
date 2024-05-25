<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { STORE_CLASS_ROOM } from '@/services/stores'

const router = useRouter()
const route = useRoute()

const { onActionGetDetailVocabulary, onActionSaveVocabulary, onActionUpdateVocabulary } =
  STORE_CLASS_ROOM.StoreClassRoom()

const vocabItem = {
  word: '',
  translateWord: '',
  example: '',
  translateExample: ''
}
const vocabulary = ref({
  title: '',
  translateTitle: '',
  isTranslate: true,
  isExample: true,
  vocabItems: []
})

const data = reactive({
  tabIndex: 0,
  body: {
    pagination: {
      first: 0,
      rows: 5,
      sort: null
    },
    keySearch: ''
  }
})

const onClickAddItem = () => {
  vocabulary.value.vocabItems.push(vocabItem)
}

const onClickRemoveItem = (index) => {
  vocabulary.value.vocabItems.splice(index, 1)
}

const onCellEditComplete = (event) => {
  vocabulary.value.vocabItems[event.index] = event.newData
}

const onClickSave = () => {
  if (route.query.setting === 'create') {
    console.log('tạo')
    onActionSaveVocabulary({
      classRoomId: route.params.id,
      ...vocabulary.value
    })
  } else {
    onActionUpdateVocabulary({
      id: route.query.setting,
      classRoomId: route.params.id,
      ...vocabulary.value
    })
  }
}

onMounted(() => {
  if (route.query.setting !== 'create') {
    onActionGetDetailVocabulary(route.query.setting).then((res) => {
      if (res.success) {
        vocabulary.value = res.data
      }
    })
  }
})
</script>

<template>
  <div class="p-5 flex flex-column gap-3">
    <div class="flex align-items-center gap-3">
      <Button label="Trở lại" icon="pi pi-angle-left" @click="router.back()" />
      <span class="text-2xl">Thêm mới chủ đề</span>
    </div>

    <div class="flex justify-content-between">
      <div class="flex flex-column gap-3">
        <div class="flex gap-6">
          <label class="flex flex-column gap-2">
            <span>Title</span>
            <InputText type="text" v-model="vocabulary.title" />
          </label>

          <label class="flex flex-column gap-2">
            <span>Translate title</span>
            <InputText type="text" v-model="vocabulary.translateTitle" />
          </label>
        </div>

        <div class="flex gap-6">
          <label class="flex flex-column gap-2">
            <span>Is translate</span>
            <InputSwitch v-model="vocabulary.isTranslate" />
          </label>

          <label class="flex flex-column gap-2">
            <span>Is example</span>
            <InputSwitch v-model="vocabulary.isExample" />
          </label>
        </div>
      </div>

      <div>
        <Button
          label="Lưu"
          @click="onClickSave"
          :disabled="!vocabulary.title || !vocabulary.translateTitle"
        />
      </div>
    </div>

    <DataTable
      :paginator="true"
      :value="vocabulary.vocabItems"
      :first="data.body.pagination.first"
      :rows="data.body.pagination.rows"
      :rowsPerPageOptions="[5, 10, 15, 20]"
      :removableSort="true"
      editMode="cell"
      style="border: 1px solid rgb(5 150 105 / 43%)"
      class="p-3 border-round-2xl"
      @cell-edit-complete="onCellEditComplete"
      paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Hiển thị {first} - {last} / tổng {totalRecords} dòng"
    >
      <template #header>
        <span>Danh sách từ vựng {{ `(${vocabulary.vocabItems?.length || 0})` }}</span>
      </template>

      <Column
        field="word"
        header="Word"
        class="white-space-nowrap"
        body-class="h-4rem"
        style="width: 7rem"
      >
        <template #body="{ data }">
          <span>{{ data?.word }}</span>
        </template>
        <template #editor="{ data }">
          <InputText v-model="data.word" autofocus class="w-full" />
        </template>
      </Column>

      <Column
        field="translateWord"
        header="Translate word"
        class="white-space-nowrap"
        body-class="h-4rem"
        style="width: 7rem"
      >
        <template #body="{ data }">
          <span>{{ data?.translateWord }}</span>
        </template>
        <template #editor="{ data }">
          <InputText v-model="data.translateWord" autofocus class="w-full" />
        </template>
      </Column>

      <Column
        field="example"
        header="Example"
        class="white-space-nowrap"
        body-class="h-4rem"
        style="width: 7rem"
      >
        <template #body="{ data }">
          <span>{{ data?.example }}</span>
        </template>
        <template #editor="{ data }">
          <InputText v-model="data.example" autofocus class="w-full" />
        </template>
      </Column>

      <Column
        field="translateExample"
        header="Translate example"
        class="white-space-nowrap"
        body-class="h-4rem"
        style="width: 7rem"
      >
        <template #body="{ data }">
          <span>{{ data?.translateExample }}</span>
        </template>
        <template #editor="{ data }">
          <InputText v-model="data.translateExample" autofocus class="w-full" />
        </template>
      </Column>

      <Column class="white-space-nowrap" headerClass="text-center h-4rem" style="width: 3rem">
        <template #header>
          <i class="pi pi-plus-circle on-click" style="color: #059669" @click="onClickAddItem" />
        </template>

        <template #body="{ index }">
          <i class="pi pi-trash on-click p-error" @click="onClickRemoveItem(index)" />
        </template>
      </Column>

      <template #empty>
        <div class="flex justify-content-center">Chưa có vocab.</div>
      </template>
    </DataTable>
  </div>
</template>
