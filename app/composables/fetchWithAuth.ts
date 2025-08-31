export default async function fetchWithAuth(url: string, options = {}) {
  const authStore = useAuthStore();
  let token = authStore.token;
  console.log("token in the fetch with auth", token);
  console.log("options header in the fetch with auth", { ...options });
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
      "https://localhost:5006/api/auth/refresh-token",
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
