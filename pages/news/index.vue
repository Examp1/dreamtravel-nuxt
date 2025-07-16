<script setup>
import { computed } from "vue";
import { useNuxtApp } from "#app";
import appNewsItem from "~/components/news/app-news-item.vue";
import appTabs from "~/components/navigation/app-tabs.vue";
import appPagination from "~/components/navigation/app-pagination.vue";
import theSubscribeForm from "~/components/common/the-subscribe-form.vue";
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = storeToRefs(useGlobalStore());
const { $httpService } = useNuxtApp();
const { locale } = useI18n();
import { useMetaHead } from "~/composables/useMetaHead.js";
const route = useRoute();
const currentPage = ref(route.query.page || 1);

const { data, status } = await $httpService.post("/api/blog/articles/all", {
    lang: locale.value,
    page: currentPage.value,
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

const tabListM = computed(() => {
    const temp = {
        name: "All news",
        type: "news",
    };

    return [temp, ...data.categories_list];
});

const pagiData = computed(() => {
    const last_page = Math.ceil(
        data.items.paginate.total / data.items.paginate.per_page,
    );

    const links = [];

    links.push({
        label: "&laquo; Previous",
    });

    for (let i = 1; i <= last_page; i++) {
        links.push({
            label: i.toString(),
            active: i == currentPage.value,
        });
    }

    links.push({
        label: "Next &raquo;",
    });

    return {
        current_page: currentPage.value,
        last_page,
        links,
    };
});
</script>

<template>
    <div class="blog">
        <div class="container textContainer">
            <h1 class="sectionTitle bef">
                <!-- {{ countryInfo.name }} -->
                {{ globalSetting.blog_title }}
            </h1>
            <div class="descr" v-html="globalSetting.blog_description"></div>
            <appTabs :tabList="tabListM"></appTabs>
            <section>
                <div class="newsWrapper">
                    <template v-if="data.items.models">
                        <appNewsItem
                            v-for="(item, index) in data.items.models"
                            :key="index"
                            :data="item.translate"
                            :link="item.model.url"
                        ></appNewsItem>
                    </template>
                    <div v-else>no items</div>
                </div>
            </section>
            <appPagination
                v-if="pagiData?.last_page > 1"
                :pagination="pagiData"
            ></appPagination>
        </div>
        <div class="container-full">
            <theSubscribeForm />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.newsWrapper {
    // margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    text-align: left;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}
</style>
