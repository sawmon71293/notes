export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  // If user is not authenticated and trying to access a protected route
  if (!token) {
    return navigateTo("/");
  }
});
