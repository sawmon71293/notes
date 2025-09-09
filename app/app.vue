<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import useAuth from "./composables/auth-init";

const { initializeAuth } = useAuth();
onMounted(async () => {
  await initializeAuth();
});
</script>
