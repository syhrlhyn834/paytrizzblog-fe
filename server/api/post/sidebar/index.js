// server/api/menu.js
export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig();

    // Sertakan parameter halaman dalam request ke backend
    const response = await $fetch(`${config.public.API_BASE_URL}api/web/postHomepage`);

    return response; // Kembalikan response dari backend
});