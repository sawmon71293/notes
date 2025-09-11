export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();

  if (!authStore.isAuthenticated && to.path !== "/") {
    return navigateTo("/");
  }

  if (authStore.isAuthenticated && to.path === "/") {
    return navigateTo("/note");
  }
});
