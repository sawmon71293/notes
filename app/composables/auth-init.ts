export default function useAuth() {
  const authStore = useAuthStore();
  async function initializeAuth() {
    try {
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;
      const res = await $fetch(`${baseUrl}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      authStore.setToken(res.accessToken);
    } catch (err) {
      authStore.logout();
    }
  }
  return { initializeAuth };
}
