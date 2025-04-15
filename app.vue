<script setup>
import appHeader from "./components/navigation/app-header.vue";
import appFooter from "./components/navigation/app-footer.vue";
import appCookieModal from "./components/ui/app-cookie-modal.vue";

import { useI18n } from "vue-i18n";
const { locale } = useI18n();

import { useGlobalStore } from "@/stores/global";
const { fetchGlobalSettings, fetchMenus } = useGlobalStore();

import { getWindowSize } from "@/stores/windowSize";
const { initWindowSizeTracking } = getWindowSize();

initWindowSizeTracking();
fetchGlobalSettings(locale.value);
fetchMenus(locale.value);
</script>
<template>
    <div>
        <appHeader />
        <NuxtRouteAnnouncer />
        <NuxtPage />
        <appFooter />
        <appCookieModal />
    </div>
</template>

<style lang="scss">
@use "./assets/sass/global.scss";
</style>
