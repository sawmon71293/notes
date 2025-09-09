export default function useAuth() {
  async function initializeAuth() {
    try {
      const res = await $fetch("http://localhost:5006/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      console.log({ res });
      // authStore.setToken(res.accessToken);
      // authStore.setUser(res.user);
    } catch (err) {
      console.log("auth fetched failed", err);
    }
  }
  return { initializeAuth };
}
