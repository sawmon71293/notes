<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-4 right-10 bg-gray-800 text-white px-4 py-1 rounded shadow z-50"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: String,
  duration: { type: Number, default: 3000 },
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
