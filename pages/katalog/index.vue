<script setup>
import { useNuxtApp } from "#app";
import theMainText from "~/components/common/the-main-text.vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { $httpService } = useNuxtApp();
const { locale } = useI18n();

const { data, status } = await $httpService.post("/api/page/get-by-slug", {
    lang: locale.value,
    slug: "katalog",
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
<!-- <script>
export default {
    components: {
        "image-and-text": AppListItem,
        news: AppNews,
        appDataGrid,
        AppTabsFilter,
        countries: AppCountries,
        TheMainText,
    },
    data() {
        return {
            widgetList: null,
            countryInfo: null,
        };
    },
    computed: {
        ...mapGetters(["isUiLocked"]),
        fetchOption() {
            let temp = {
                slug: "katalog",
                lang: this.currentLang,
            };
            if (this.$route.name == "CatalogChild") {
                temp.month = this.$route.params.month;
                temp.type = this.$route.params.slug;
            }
            return temp;
        },
    },
    methods: {
        ...mapActions(["lockUi", "unlockUi"]),
    },
    async created() {
        this.lockUi();
        const res = await this.axios.post(
            "/api/page/get-by-slug",
            this.fetchOption,
        );
        this.countryInfo = res.data.data.translate;
        this.widgetList = res.data.data.widgets;
        this.constructorList = res.data.data.constructor;
        document.title =
            res.data.data.translate.meta_title ||
            res.data.data.translate.title ||
            "Dream Travel";
        this.unlockUi();
    },
};
</script> -->

<template>
    <div class="chooseCountry">
        <div class="container textContainer">
            <theMainText
                :title="data.translate.title"
                :descr="data.translate.description"
            ></theMainText>
        </div>
        <constructorRender :widgets="data.widgets" />
        <constructorRender :constructor="data.constructor" />
    </div>
</template>

<style lang="scss" scoped>
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
    @media (max-width: 576px) {
        margin-top: 50px;
    }
}
</style>
