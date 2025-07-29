<template>
    <div>
    <div>
      <i class="mdi mdi-magnify w-20 h-20"></i>
      <input type="text" placeholder="Search Note" class="ps-2 sm:w-full md:w-[60%] lg:w-[30%] rounded-xl border border-gray-300 p-2 m-2">
    </div>
    <table class="w-full table-auto border-collapse mt-2">
      <thead
        class="bg-gray-300 sm:table-header-group hidden sm:table-header-group"
      >
        <tr>
          <th class="text-left p-2">Title</th>
          <th class="text-left p-2">Content</th>
          <th class="text-left p-2">Update At</th>
          <th class="text-left p-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="note in noteList"
          :key="note.id"
          class="block sm:table-row border-b even:bg-gray-100 even:text-black border-gray-200 sm:border-0 p-2 sm:p-0"
        >
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Title:</span> {{ note.title }}
          </td>
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Content:</span> {{ note.content }}
          </td>
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Updated At:</span> {{ note.title }}
          </td>
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Created At:</span> {{ note.content }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const loginUser = authStore.user;
const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;
const noteList = ref([]);
onMounted(async () => {
  const token = useCookie("auth-token").value;
  const ok = await authStore.checkAuth();
  if (!token || !ok) {
    return navigateTo("/login");
  }
  try {
    noteList.value = await $fetch(`${baseUrl}/api/note`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log (noteList.value)
  } catch (error) {
    console.error("Error fetching notes", error);
  }
});</script>

