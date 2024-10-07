export default defineNuxtConfig({
    ssr: true,
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    typescript: false,
    app: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap' },
            { rel: 'stylesheet', type: 'text/css', href: '/css/main.css' }

        ],
    },
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', 'vuetify-nuxt-module', '@sidebase/nuxt-auth', '@nuxt/icon'],
    auth: {
        baseURL: process.env.API_BASE_URL,
        provider: {
            type: 'local',
            endpoints: {
                signIn: { path: '/api/admin/login', method: 'post' },
                signOut: { path: '/api/admin/logout', method: 'post' },
                getSession: { path: '/api/admin/user', method: 'get' },
            },
        },
        globalAppMiddleware: {
            isEnabled: false
        }
    },
    css: ['vuetify/lib/styles/main.sass', '@/assets/css/main.css'],
    app: {
        pageTransition: {
            name: 'page', // Nama kelas CSS yang akan digunakan untuk transisi
            mode: 'out-in' // Mode transisi: out-in menunggu halaman keluar sebelum masuk
        }
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL, // Menggunakan API_BASE_URL dari .env
        },
    },
});