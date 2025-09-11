export default async function fetchWithAuth(url: string, options = {}) {
  const authStore = useAuthStore();
  let token = authStore.token;
  let res = await $fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  if (res.status === 401) {
    await authStore.checkAuth();

    if (refreshRes.ok) {
      res = await $fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorizaton: `Bearer ${authStore.token}`,
        },
        credentials: "include",
      });
    }
  }
  console.log("res in the fetch with auth,", { res });
  return res;
}
