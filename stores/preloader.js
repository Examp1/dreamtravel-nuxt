import { defineStore } from "pinia";

export const usePreloaderStore = defineStore("preloader", {
    state: () => ({
        lockingPool: 0,
    }),

    getters: {
        isUiLocked: (state) => state.lockingPool > 0,
    },

    actions: {
        lockUi() {
            this.lockingPool++;
        },

        unlockUi() {
            if (this.lockingPool > 0) {
                this.lockingPool--;
            }
        },
    },
});
