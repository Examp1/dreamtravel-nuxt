<script setup>
import { useNuxtApp } from "#app";
import { ref } from "vue";
import appBreadcrumbs from "~/components/navigation/app-breadcrumbs.vue";
import theMainText from "~/components/common/the-main-text.vue";
import appTabs from "~/components/navigation/app-tabs.vue";
import appSeeAlso from "~/components/constructor/app-see-also.vue";
import appTourItem from "~/components/tour/app-tour-item.vue";
import appTourFilter from "~/components/tour/app-tour-filter.vue";
import appSeoText from "~/components/constructor/app-seo-text.vue";
import appPagination from "~/components/navigation/app-pagination.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { $httpService } = useNuxtApp();
const { locale } = useI18n();
const route = useRoute();
const currentPage = ref(route.query.page || 0);

const { data, status } = await $httpService.post("/api/country/get-by-slug", {
    lang: locale.value,
    tours: {},
    slug: route.params.countryName,
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
</script>

<template>
    <div class="hotels">
        <div class="container textContainer">
            <appBreadcrumbs :breadcrumbs="data.breadcrumbs"></appBreadcrumbs>
            <theMainText
                :title="data.translate.name"
                :descr="data.translate.description"
            ></theMainText>
            <appTabs class="mt" :tabList="data.tabs"></appTabs>
        </div>
        <div class="darkBg">
            <div class="container">
                <appTourFilter
                    :data="data.filter"
                    @change="onFilterChange"
                ></appTourFilter>
                <div
                    class="hotelList"
                    :class="{ 'pb-60': data?.hotels?.last_page == 1 }"
                >
                    <appTourItem
                        v-for="(hotel, idx) in data.tours.data"
                        :key="idx"
                        :propsData="hotel"
                    ></appTourItem>
                </div>
                <appPagination
                    v-if="data?.tours?.last_page > 1"
                    :pagination="data.tours"
                ></appPagination>
            </div>
        </div>
        <appSeeAlso
            :morfTitle="data.translate.morf"
            :tabList="data.tabs"
        ></appSeeAlso>
        <appSeoText
            v-if="data.translate.hotels_seo_text"
            :propsData="data.translate.hotels_seo_text"
        >
        </appSeoText>
    </div>
</template>
<style lang="scss" scoped>
.hotelList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 28px;
    flex-wrap: wrap;
    padding-top: 25px;
    // padding-bottom: 60px;

    @media (max-width: 1024px) {
        justify-content: center;
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 830px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}

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
    margin: 0 auto;
    margin-bottom: 70px;
}

.textContainer {
    text-align: center;
    padding-top: 70px;
}
.pb-60 {
    padding-bottom: 60px;
}
</style>
