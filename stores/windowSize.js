// stores/ui.js
import { defineStore } from "pinia";
import { useWindowSize, tryOnMounted } from "@vueuse/core";

export const getWindowSize = defineStore("window-size", {
    state: () => ({
        windowSize: null,
    }),

    actions: {
        updateWindowSize() {
            const { width } = useWindowSize();
            if (width.value >= 1200) {
                this.windowSize = "desktop";
            } else if (width.value >= 768) {
                this.windowSize = "tablet";
            } else {
                this.windowSize = "mobile";
            }
        },

        initWindowSizeTracking() {
            const { width } = useWindowSize();

            // Обновляем размер при монтировании
            this.updateWindowSize();

            // Следим за изменениями размера
            tryOnMounted(() => {
                watch(width, () => {
                    this.updateWindowSize();
                });
            });
        },
    },

    getters: {
        getSize: (state) => state.windowSize,
    },
});
