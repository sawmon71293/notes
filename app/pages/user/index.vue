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
import fetchWithAuth from "~/composables/fetchWithAuth";
definePageMeta({
  middleware: "protected",
});
const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;
interface User {
  id: number;
  name: string;
  email: string;
}

const userList = ref<User[]>([]);
onMounted(async () => {
  try {
    const res = await fetchWithAuth(`${baseUrl}/api/user`, {
      method: "GET",
    });
    userList.value = res as User[];
  } catch (error) {
    console.error("Error fetching user", error);
  }
});
</script>
