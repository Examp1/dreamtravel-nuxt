<script setup>
import appHeader from "./components/navigation/app-header.vue";
import { useGlobalStore } from "@/stores/global";
const { fetchGlobalSettings, fetchMenus } = useGlobalStore();
import { getWindowSize } from "@/stores/windowSize";
const { initWindowSizeTracking } = getWindowSize();

initWindowSizeTracking();
fetchGlobalSettings();
fetchMenus();
</script>
<template>
    {{ getSize }}
    <div>
        <appHeader />
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
</template>

<style lang="scss">
@use "./assets/sass/global.scss";
</style>
