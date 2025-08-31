<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-4 h-screen flex flex-col gap-2"
    >
      <div class="w-full">
        <label class="block mb-2">Title</label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div class="w-full">
        <label class="block mb-2">Content</label>
        <textarea
          v-model="content"
          type="text"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 mt-2 bg-blue-500 text-white rounded"
        :disabled="loading"
      >
        {{ !loading ? (updatingId.id ? "Update" : "Create") : "Loading..." }}
      </button>
      <p v-if="error" class="mt-4 text-red-500">
        {{ error }}
      </p>
    </form>
    <Snackbar v-if="snackbar.show" :message="snackbar.message" />
  </div>
</template>
<script setup>
const router = useRouter();
const snackbar = useSnackbarStore();
const title = ref("");
const content = ref("");
const loading = ref(false);
const error = ref("");
const updatingId = defineProps(["id"]);
const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;
async function handleSubmit() {
  loading.value = true;
  error.value = "";

  if (!updatingId.id) {
    try {
      await fetchWithAuth(`${baseUrl}/api/note`, {
        method: "POST",
        body: {
          title: title.value,
          content: content.value,
        },
      });
      loading.value = false;
      snackbar.trigger("Create note successful!");
      router.push("/note");
      clear();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await fetchWithAuth(`${baseUrl}/api/note/${updatingId.id}`, {
        method: "PUT",
        body: {
          title: title.value,
          content: content.value,
        },
      });
      loading.value = false;
      snackbar.trigger("Update note successful!");
      router.push("/note");
      clear();
    } catch (error) {
      console.log(error);
    }
  }
}

onMounted(async () => {
  if (updatingId.id) {
    const updatingNote = await fetchWithAuth(
      `${baseUrl}/api/note/${updatingId.id}`,
      {
        method: "GET",
      }
    );
    if (updatingNote) {
      title.value = updatingNote.title;
      content.value = updatingNote.content;
    }
  }
});

const clear = () => {
  title.value = "";
  content.value = "";
};
</script>
