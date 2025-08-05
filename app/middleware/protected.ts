import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  // If user is not authenticated and trying to access a protected route
  if (authStore.token) {
    const ok = await authStore.checkAuth();
    if (!ok) {
      return navigateTo("/");
    }
  } else {
    return navigateTo("/");
  }
});
