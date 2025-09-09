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
    const refreshRes = await $fetch(
      "https://localhost:7055/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      authStore.setToken(data.accessToken);

      res = await $fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorizaton: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });
    }
  }
  console.log("res in the fetch with auth,", { res });
  return res;
}
