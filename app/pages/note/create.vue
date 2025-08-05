<template>
  <div class="w-full lg:w-[40%] flex items-start">
    <Form class="w-full" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const snackbar = useSnackbarStore();

definePageMeta({
  middleware: "protected",
});
</script>
