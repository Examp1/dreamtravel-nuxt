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
    blocks: defineAsyncComponent(
        () => import("~/components/constructor/app-blocks.vue"),
    ),
    selected: defineAsyncComponent(
        () => import("~/components/constructor/app-showCase.vue"),
    ),
    calendar: defineAsyncComponent(
        () => import("~/components/constructor/app-calendar.vue"),
    ),
    "full-width-image": defineAsyncComponent(
        () => import("~/components/constructor/app-full-size-img.vue"),
    ),
    news: defineAsyncComponent(
        () => import("~/components/constructor/app-news.vue"),
    ),
    "simple-text": defineAsyncComponent(
        () => import("~/components/constructor/app-simple-text.vue"),
    ),
    form1: defineAsyncComponent(
        () => import("~/components/constructor/app-request-form.vue"),
    ),
    tabs: defineAsyncComponent(
        () => import("~/components/constructor/app-text-tabs.vue"),
    ),
    "items-tabs": defineAsyncComponent(
        () => import("~/components/constructor/app-hotel-rooms.vue"),
    ),
    countries: defineAsyncComponent(
        () => import("~/components/constructor/app-countries.vue"),
    ),
    quotes: defineAsyncComponent(
        () => import("~/components/constructor/app-quotes.vue"),
    ),
    gallery: defineAsyncComponent(
        () => import("~/components/constructor/app-gallery-with-lightbox.vue"),
    ),
    sform: defineAsyncComponent(
        () => import("~/components/constructor/app-dinamic-form.vue"),
    ),
};
</script>

<template>
    <section class="constructor-container">
        <template
            v-for="(component, idx) in constructor"
            :key="`${component.component}-${idx}`"
        >
            <component
                v-if="!!+component.visibility"
                :is="asyncComponents[component.component]"
                :propsData="component.content"
            ></component>
        </template>
        <template
            v-for="(component, idx) in widgets"
            :key="`${component.component}-${idx}-w`"
        >
            <component
                v-if="!!+component.visibility"
                :is="asyncComponents[component.component]"
                :propsData="component.content"
            ></component>
        </template>
        <!-- </section> -->
    </section>
</template>

<style lang="scss" scoped></style>
