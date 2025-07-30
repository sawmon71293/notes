<template>
  <div>
    <table class="w-full table-auto border-collapse mt-2">
      <thead
        class="bg-gray-300 sm:table-header-group hidden sm:table-header-group"
      >
        <tr>
          <th class="text-left p-2">Name</th>
          <th class="text-left p-2">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in userList"
          :key="user.id"
          class="block sm:table-row border-b even:bg-gray-100 even:text-black border-gray-200 sm:border-0 p-2 sm:p-0"
        >
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Name:</span> {{ user.name }}
          </td>
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Email:</span> {{ user.email }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const loginUser = authStore.user;
const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;
const userList = ref([]);
onMounted(async () => {
  const token = useCookie("auth-token").value;
  const ok = await authStore.checkAuth();
  if (!token || !ok) {
    return navigateTo("/login");
  }
  try {
    userList.value = await $fetch(`${baseUrl}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching notes", error);
  }
});
</script>
