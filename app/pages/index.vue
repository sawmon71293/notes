<template>
  <div>

  </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
// Check authentication status on app mount
onMounted(() => {
  authStore.checkAuth()
})
</script>
