<script setup>
import AppChooseUs from "~/components/constructor/blocks/app-chooseUs.vue";
import AppShowCase from "~/components/constructor/blocks/app-showCase.vue";
import AppTours from "~/components/constructor/blocks/app-tours.vue";

defineProps({
    propsData: [Object, Array],
});
</script>
<template>
    {{ propsData.template }}
    <AppTours v-if="propsData.template === 'grid'" :propsData="propsData" />
    <AppChooseUs
        v-else-if="propsData.template === 'custom'"
        :propsData="propsData"
    />
    <AppShowCase v-else :propsData="propsData" />
</template>
