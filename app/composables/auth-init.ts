export default function useAuth() {
  async function initializeAuth() {
    try {
      const res = await $fetch("https://localhost:7055/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        withCredentials: true
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
