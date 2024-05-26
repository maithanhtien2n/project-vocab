<script setup>
import { ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'

const props = defineProps({
  overlayStyle: {
    type: Object,
    default: null
  },
  overlayClass: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showOverlay: {
    type: Boolean,
    default: true
  }
})

const isOpenOverlay = ref(false)

const onOpenOverlay = () => {
  if (props.disabled) return

  isOpenOverlay.value = true
}

const onCloseOverlay = () => {
  isOpenOverlay.value = false
}
</script>

<template>
  <OnClickOutside
    @trigger="onCloseOverlay"
    class="w-max p-0 overlay"
    :class="{ 'select-none disabled': disabled }"
  >
    <slot name="button" :showOverlay="onOpenOverlay" />

    <!-- Overlay -->
    <div
      v-if="showOverlay"
      class="w-max absolute bg-white shadow-4 border-round-2xl py-3 scalein overlay-menu"
      :class="[isOpenOverlay ? 'block' : 'hidden', overlayClass]"
      :style="{
        ...overlayStyle,
        'transform-origin': 'center top'
      }"
    >
      <div class="arrow"></div>

      <slot name="options" :hideOverlay="onCloseOverlay" />
    </div>
  </OnClickOutside>
</template>

<style lang="scss" scoped>
.overlay {
  border-radius: 50%;
  padding: 0.2rem;

  &:focus-visible,
  a:focus-visible {
    border-radius: 0.2rem !important;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  .overlay-menu {
    background-color: white;
    min-width: 7.75rem;
    padding-block: 0.5rem;
    border-radius: 1rem;
    right: -1rem;
    top: 1.5rem;
    z-index: 9999;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0rem;
      left: 0;
      width: 100%;
      height: 0rem;
      background-color: transparent;
    }
  }
}

.arrow {
  position: absolute;
  z-index: 5;
  margin-top: 0.25em;
  width: 10px;
  height: 10px;
  left: 12.7rem;
  top: -0.2rem;
  line-height: 0;
  transform: rotate(135deg);
  transform-origin: 0 0;
  border-color: transparent;
  border-style: solid;
  border-top-color: transparent;
  border-width: 0 0.4rem 0.5rem;
  border-color: rgb(255, 255, 255);
  box-shadow: -2px 1px 3px 0px rgba(0, 0, 0, 0.01);
}
</style>
