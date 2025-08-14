export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    const auth = useAuthStore();
    const user = useState(
      "authUser",
      () => nuxtApp.ssrContext?.event.context.authUser ?? null
    );

    if (user.value) {
      auth.setUser(user.value);
      auth.isAuthenticated = true;
    }
    auth.loading = false;
  }
});
