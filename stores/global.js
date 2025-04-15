import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { usePreloaderStore } from "@/stores/preloader";
export const useGlobalStore = defineStore("global", {
    state: () => ({
        globalSetting: {},
        headerMenu: null,
        footerMenu: null,
    }),
    actions: {
        async fetchGlobalSettings(lang = "en") {
            const { $httpService } = useNuxtApp();
            const { data } = await $httpService.post(`/api/settings/all`, {
                lang,
            });
            this.globalSetting = data.data;
        },
        async fetchMenus(lang = "en", ids = [1, 2]) {
            const preloaderStore = usePreloaderStore();
            const { $httpService } = useNuxtApp();

            preloaderStore.lockUi();

            try {
                const { data } = await $httpService.post(
                    `/api/menu/get-by-ids`,
                    {
                        lang,
                        ids,
                    },
                );

                Object.values(data.data.items).forEach((el) => {
                    if (el.name === "Main") {
                        this.headerMenu = el.items;
                    } else if (el.name === "Footer") {
                        this.footerMenu = el.items;
                    }
                });
            } finally {
                preloaderStore.unlockUi();
            }
        },
    },
});
