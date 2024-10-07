// server/api/menu.js
export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig();

    // Use the API_BASE_URL from runtime config to fetch menus
    const response = await $fetch(`${config.public.API_BASE_URL}api/web/categories`);

    return response; // Return the response from the backend
});