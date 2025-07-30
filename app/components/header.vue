<template>
  <header class="p-4 bg-gray-100">
    <nav class="flex gap-4 justify-between">
      <div>
        <div v-if="authStore.isAuthenticated">
          <NuxtLink to="/user" class="text-blue-500 hover:text-blue-600 me-4">
            Users
          </NuxtLink>
          <NuxtLink to="/note" class="text-blue-500 hover:text-blue-600">
            Notes
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600 me-4">
            Login
          </NuxtLink>
          <NuxtLink to="/signup" class="text-blue-500 hover:text-blue-600">
            Signup
          </NuxtLink>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="flex items-center">
          <Icon name="mdi:account" />
          <span>{{ authStore.user ? authStore.user.name : "" }}</span>
        </div>
        <Icon
          name="mdi:logout"
          v-if="authStore.isAuthenticated"
          @click="authStore.logout()"
          class="text-blue-500 hover:text-blue-600 mx-2 cursor-pointer"
        />
      </div>
    </nav>
  </header>
</template>
<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
console.log(authStore.isAuthenticated);
</script>
