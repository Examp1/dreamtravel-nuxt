// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxt/fonts", "@pinia/nuxt", "@nuxtjs/i18n"],
    plugins: ["./plugins/apiAdapter.ts"],
    runtimeConfig: {
        public: {
            apiUrl: "https://ohmydream.club",
        },
    },
    build: {
        transpile: ["@vuepic/vue-datepicker"],
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                    additionalData: `@use "~/assets/sass/variables.scss" as *;`,
                },
            },
        },
    },
    i18n: {
        locales: [
            { code: "uk", name: "Ukrainian", file: "uk.json" },
            { code: "en", name: "ruglish", file: "en.json" },
        ],
        defaultLocale: "en",
    },
});
