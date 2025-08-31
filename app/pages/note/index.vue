<template>
  <div>
    <div class="flex w-full items-center flex-col md:flex-row px-4">
      <div class="flex items-center justify-left">
        <NuxtLink to="/note/create">
          <Icon name="mdi:plus-circle" class="text-gray-400 cursor-pointer" />
        </NuxtLink>
        <div class="relative">
          <Icon
            name="mdi:magnify"
            class="absolute top-4 left-4 w-20 h-20 text-gray-400"
          />
          <input
            type="text"
            v-model="query"
            placeholder="Search Notes..."
            class="px-8 rounded-xl border border-gray-300 p-2 m-2"
            @input="fetchNotes"
          />
        </div>
      </div>
      <div class="w-40 flex items-center">
        <select
          v-model="sortBy"
          @change="fetchNotes"
          class="flex w-full border border-gray-300 p-2 rounded-xl px-2"
        >
          <option value="">Sort By</option>
          <option value="Title">Title</option>
          <option value="CreatedAt">Date</option>
        </select>
        <Icon
          :name="descending ? 'mdi:sort-descending' : 'mdi:sort-ascending'"
          class="text-gray-400 cursor-pointer ms-2"
          @click="sort"
        />
      </div>
    </div>
    <table
      v-if="noteList.length"
      class="w-full table-auto border-collapse mt-2 text-gray-700"
    >
      <thead
        class="bg-gray-300 sm:table-header-group hidden sm:table-header-group"
      >
        <tr>
          <th class="text-left p-2">Title</th>
          <th class="text-left p-2">Content</th>
          <th class="text-left p-2">Created At</th>
          <th class="text-left p-2">Update At</th>
          <th></th>
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
            <span class="font-bold sm:hidden">Created At:</span>
            {{ dateFormatter(note.createdAt) }}
          </td>
          <td class="p-2 sm:table-cell block">
            <span class="font-bold sm:hidden">Updated At:</span>
            {{ note.updatedAt ? dateFormatter(note.updatedAt) : "" }}
          </td>
          <td class="flex gap-2">
            <NuxtLink
              :to="`note/${note.id}`"
              class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-2 rounded flex items-center justify-center"
            >
              <Icon name="mdi:pencil" class="text-white cursor-pointer" />Edit
            </NuxtLink>
            <button
              @click="confirmDeletion(note.id)"
              class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-2 rounded flex items-center justify-center"
            >
              <Icon name="mdi:delete" class="text-white cursor-pointer" />Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-else
      class="text-gray-500 flex items-center justify-center w-full h-full"
    >
      <span>No Notes to show</span>
    </div>
    <div
      v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center bg-opacity->10 z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-72">
        <p class="text-gray-800 mb-4">
          Are you sure you want to delete this note?
        </p>
        <div class="flex justify-end gap-3">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="cancel">
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded"
            @click="confirm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <Snackbar v-if="snackbar.show" :message="snackbar.message" />
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "protected",
});
const authStore = useAuthStore();
const snackbar = useSnackbarStore();
const loginUser = authStore.user;
const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const noteList = ref([]);
const token = useCookie("auth-token").value;
const showConfirm = ref(false);
const updatingId = ref("");

const query = ref("");
const sortBy = ref("");
const descending = ref(false);
const fetchNotes = async () => {
  noteList.value = await fetchWithAuth(`${baseUrl}/api/notes`, {
    params: {
      query: query.value,
      sortBy: sortBy.value,
      descending: descending.value,
    },
    method: "GET",
  });
};

const sort = () => {
  descending.value = !descending.value;
  fetchNotes();
};

onMounted(async () => {
  try {
    noteList.value = await fetchWithAuth(`${baseUrl}/api/note`, {
      method: "GET",
    });
    console.log(noteList.value);
  } catch (error) {
    console.error("Error fetching notes", error);
  }
});

const confirmDeletion = (id) => {
  showConfirm.value = true;
  updatingId.value = id;
};

const confirm = () => {
  deleteNote();
};

const cancel = () => {
  showConfirm.value = false;
};

const deleteNote = async () => {
  try {
    noteList.value = await $fetch(`${baseUrl}/api/note/${updatingId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showConfirm.value = false;
    snackbar.trigger("Delete note successful!");
  } catch (error) {
    console.error("Error fetching notes", error);
  }
};
</script>
