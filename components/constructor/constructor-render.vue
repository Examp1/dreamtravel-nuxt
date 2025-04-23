<script setup>
import { defineAsyncComponent } from "vue";

defineProps({
    constructor: {
        type: Object,
        default: () => ({}),
        required: true,
    },
    widgets: {
        type: Object,
        default: () => ({}),
    },
});

const asyncComponents = {
    "image-and-text": defineAsyncComponent(
        () => import("~/components/constructor/image-and-text.vue"),
    ),
    "blocks": defineAsyncComponent(
        () => import("~/components/constructor/app-blocks.vue"),
    ),
    "selected": defineAsyncComponent(
        () => import("~/components/constructor/app-showCase.vue"),
    ),
    "calendar": defineAsyncComponent(
        () => import("~/components/constructor/app-calendar.vue"),
    ),
    "full-width-image": defineAsyncComponent(
        () => import("~/components/constructor/app-full-size-img.vue"),
    ),
    "news": defineAsyncComponent(
        () => import("~/components/constructor/app-news.vue"),
    ),
    "simple-text": defineAsyncComponent(
        () => import("~/components/constructor/app-simple-text.vue"),
    ),
    "form1": defineAsyncComponent(
        () => import("~/components/constructor/app-request-form.vue"),
    ),
    "tabs": defineAsyncComponent(
        () => import("~/components/constructor/app-text-tabs.vue"),
    ),
    "items-tabs": defineAsyncComponent(
        () => import("~/components/constructor/app-hotel-rooms.vue"),
    ),
    "countries": defineAsyncComponent(
        () => import("~/components/constructor/app-countries.vue"),
    ),
};
</script>

<template>
    <div  class="constructor-container">
        <!-- <section
            v-for="({ component, visible, content }, idx) in constructor"
            :key="`${component}-${idx}`"
            :class="`mt-${content.top_separator} mb-${content.bottom_separator} ${content.preset} block-${component} section-separator-${content.separator_section}`"
        > -->
        <component
            v-for="({ component, content }, idx) in constructor"
            :key="`${component}-${idx}`"
            :is="asyncComponents[component]"
            :propsData="content"
        ></component>
        <component
            v-for="({ component, content }, idx) in widgets"
            :key="`${component}-${idx}-w`"
            :is="asyncComponents[component]"
            :propsData="content"
        ></component>
        <!-- </section> -->
    </div>
</template>

<style lang="scss" scoped></style>
