<template>
    <section class="container seoContainer">
        <div
            ref="contentZone"
            class="contentWrapper seoText"
            v-html="propsData"
        ></div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import redactorAccordion from "@/composables/redactorAccordion";

const props = defineProps({
    propsData: {
        type: String,
        default: "",
    },
});

const contentZone = ref(null);
const { initToggleSlideBtn } = redactorAccordion(contentZone);

onMounted(() => {
    setTimeout(() => {
        initToggleSlideBtn(contentZone.value, false);
    }, 500);
});
</script>
