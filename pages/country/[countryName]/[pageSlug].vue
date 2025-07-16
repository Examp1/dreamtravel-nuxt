<script setup>
import { useNuxtApp } from "#app";
import appTabs from "~/components/navigation/app-tabs.vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import appAnkerList from "~/components/navigation/app-anker-list.vue";
import theMainText from "~/components/common/the-main-text.vue";
import appSeeAlso from "~/components/constructor/app-see-also.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { $httpService } = useNuxtApp();

const { locale } = useI18n();
const route = useRoute();

const { data, status } = await $httpService.post("/api/info/get-by-slug", {
    lang: locale.value,
    slug: route.params.pageSlug,
});

if (status !== 200) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true,
    });
}

if (data.meta) {
    useMetaHead(data.meta);
}
</script>

<template>
    <!-- v-if="!isUiLocked" -->
    <div class="rental airplane darkBg">
        <div class="container textContainer">
            <theMainText
                :title="data.translate.name"
                :descr="data.translate.description"
            ></theMainText>
            <appTabs class="mt" :tabList="data.tabs"></appTabs>

            <!-- <component
                v-for="(item, idx) in firstScreen"
                :key="idx"
                :is="item.component"
                :propsData="item.content"
            >
            </component> -->
        </div>
        <div class="container infoZone" v-if="data.constructor.length">
            <appAnkerList :title="$t('serviceAnkerListTitle')"></appAnkerList>
            <div
                class="contentZone"
                v-if="data.constructor.length"
                ref="contentZone"
            >
                <constructorRender :constructor="data.constructor" />
            </div>
        </div>
        <constructorRender v-if="data.widgets.length" :widgets="data.widgets" />
        <!-- <app-form></app-form> -->
        <appSeeAlso
            :morfTitle="data.translate.morf"
            :tabList="data.tabs"
        ></appSeeAlso>
    </div>
</template>

<style lang="scss" scoped>
.darkBg {
    padding-top: 30px;
}

.descr {
    font-weight: 300;
    font-size: 17px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    max-width: 586px;
    margin: 0 auto 70px;
}

.textContainer {
    text-align: center;
    padding-top: 70px;
}

.tourList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 28px;
}
</style>
