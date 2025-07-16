<script setup>
import { useNuxtApp } from "#app";
import theSubscribeForm from "~/components/common/the-subscribe-form.vue";
import appNews from "~/components/constructor/app-news.vue";
import useUtils from "@/composables/useUtils.js";
import theShareBar from "~/components/common/the-share-bar.vue";
import theArticleTags from "~/components/common/the-article-tags.vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { getMediaPath } = useUtils();
const { $httpService } = useNuxtApp();
const route = useRoute();
const { locale } = useI18n();
const { data, status } = await $httpService.post(
    "/api/blog/articles/get-by-slug",
    {
        lang: locale.value,
        slug: route.params.article,
    },
);

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
    <div :class="{ textPage: route.params.article !== 'contacts' }">
        <section class="container mb article" ref="contentZone">
            <theShareBar :date="data.model.public_date" />
            <h1>{{ data.translate.name }}</h1>
            <img
                v-if="data.translate.image"
                class="mainImg"
                :src="getMediaPath(data.translate.image)"
                :alt="getMediaPath(data.translate.image)"
            />
            <constructorRender
                :constructor="data.constructor"
                :widgets="data.widgets"
            >
            </constructorRender>
        </section>
        <theArticleTags
            v-if="data.tags?.length"
            :propsData="data.tags"
        ></theArticleTags>
        <appNews :propsData="data.similar_articles"></appNews>
        <div class="container-full">
            <theSubscribeForm />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mb {
    // margin-bottom: $section-offset
    @media (max-width: 830px) {
        margin-bottom: 100px;
    }
    @media (max-width: 576px) {
        margin-bottom: 0px;
    }
}
.mainImg {
    margin-bottom: 37px;
}
</style>
