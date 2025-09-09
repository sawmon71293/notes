<template>
  <div class="w-full lg:w-[40%] mx-auto">
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-4 h-screen flex flex-col items-center justify-center gap-2"
    >
      <div class="w-full">
        <label class="block mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div class="w-full">
        <label class="block mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 mt-2 bg-blue-500 text-white rounded"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Login" }}
      </button>
      <p v-if="error" class="mt-4 text-red-500">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function handleSubmit() {
  loading.value = true;
  error.value = "";

  try {
    const success = await authStore.login(email.value, password.value);
    console.log("Login success", success);
    if (success) {
      router.push("/note");
    } else {
      error.value = "Invalid credentials";
    }
  } catch (e) {
    console.log(e);
    error.value = "An error occurred";
  } finally {
    loading.value = false;
  }
}
</script>
