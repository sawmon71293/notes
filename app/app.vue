<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const { checkAuth } = useAuthStore();
onMounted(async () => {
  await checkAuth();
});
</script>
