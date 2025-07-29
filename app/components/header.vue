<template>
  <header class="p-4 bg-gray-100">
    <nav class="flex gap-4">
      <div v-if="!authStore.isAuthenticated">
          <NuxtLink to="/login">
            Login
          </NuxtLink>
          <NuxtLink to="/signup">
            Signup
          </NuxtLink>
      </div>
      <div v-else>
          <NuxtLink to="/user" class="text-blue-500 hover:text-blue-600">
            User
          </NuxtLink>
          <NuxtLink to="/note" class="text-blue-500 hover:text-blue-600">
            Note
          </NuxtLink>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
console.log(authStore.isAuthenticated);
</script>
