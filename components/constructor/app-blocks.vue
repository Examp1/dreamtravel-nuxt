<script setup>
import AppChooseUs from "~/components/constructor/app-chooseUs.vue";
import AppShowCase from "~/components/constructor/app-showCase.vue";
import AppTours from "~/components/constructor/app-tours.vue";

defineProps({
    propsData: [Object, Array],
});
</script>
<template>
    <AppTours v-if="propsData.template === 'grid'" :propsData="propsData" />
    <AppChooseUs
        v-else-if="propsData.template === 'custom'"
        :propsData="propsData"
    />
    <AppShowCase v-else :propsData="propsData" />
</template>
