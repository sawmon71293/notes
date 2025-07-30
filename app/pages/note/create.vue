<template>
  <div class="w-full lg:w-[40%] flex items-start">
    <Form class="w-full" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const snackbar = useSnackbarStore();

onMounted(async () => {
  const token = useCookie("auth-token").value;
  const ok = await authStore.checkAuth();
  if (!token || !ok) {
    return navigateTo("/login");
  }
});
</script>
