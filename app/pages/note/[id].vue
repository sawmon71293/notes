<template>
  <div>
    <Form :id="id" />
  </div>
</template>
<script setup>
const route = useRoute();
const authStore = useAuthStore();
const id = route.params.id;
onMounted(async () => {
  const token = useCookie("auth-token").value;
  const ok = await authStore.checkAuth();
  if (!token || !ok) {
    return navigateTo("/login");
  }
});
</script>
