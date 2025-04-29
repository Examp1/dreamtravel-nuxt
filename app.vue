<script setup>
import appHeader from "./components/navigation/app-header.vue";
import appFooter from "./components/navigation/app-footer.vue";
import appCookieModal from "./components/ui/app-cookie-modal.vue";
import pagePreloader from "./components/common/page-preloader.vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
import { usePreloaderStore } from "~/stores/preloader";
const { isUiLocked } = storeToRefs(usePreloaderStore());

import { useGlobalStore } from "@/stores/global";
const { fetchGlobalSettings, fetchMenus } = useGlobalStore();

import { getWindowSize } from "@/stores/windowSize";
const { initWindowSizeTracking } = getWindowSize();

const route = useRoute();

initWindowSizeTracking();
fetchGlobalSettings(locale.value);
fetchMenus(locale.value);
</script>
<template>
    <div>
        <NuxtRouteAnnouncer />
        <appHeader />
        <NuxtRouteAnnouncer />
        <NuxtPage :key="route.fullPath" />
        <appFooter />
        <appCookieModal />
        <transition name="fade" mode="out-in">
            <pagePreloader v-if="isUiLocked" />
        </transition>
    </div>
</template>

<style lang="scss">
@use "./assets/sass/global.scss";
</style>
