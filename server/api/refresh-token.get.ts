export default defineEventHandler(async (event) => {
  // Forward the request to your backend
  const config = useRuntimeConfig();
  const baseUrl = config.apiBase;
  try {
    const res = await $fetch(`http://localhost:5006/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    return res; // return backend response to frontend
  } catch (err) {
    console.log("error >>>>", { err });
  }
});
