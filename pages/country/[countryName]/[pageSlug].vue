<script setup>
import { useNuxtApp } from "#app";
import appTabs from "~/components/navigation/app-tabs.vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import appAnkerList from "~/components/navigation/app-anker-list.vue";
import theMainText from "~/components/common/the-main-text.vue";
import appSeeAlso from "~/components/constructor/app-see-also.vue";
const { $httpService } = useNuxtApp();

const { locale } = useI18n();
const route = useRoute();

const {
    data: { data },
    status,
} = await $httpService.post("/api/info/get-by-slug", {
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

// import { mapActions, mapGetters } from "vuex";
// import AppTabs from "../components/common/app-tabs.vue";
// import TheMainText from "../components/common/the-main-text.vue";
// import AppForm from "../components/country/app-form.vue";
// import accordionMixin from "@/textAccordion";
// import AppImgPreview from "../components/country/app-imgPreview.vue";
// import AppSeeAlso from "../components/country/app-see-also.vue";
// import AnkerList from "../components/navigation/anker-list.vue";
// import AppListing from "../components/text-components/app-listing.vue";
// import AppSimpleText from "../components/text-components/app-simple-text.vue";
// import RequestForm from "../components/common/RequestForm.vue";
// export default {
//     components: {
//         AppTabs,
//         AppSeeAlso,
//         AppListing,
//         "simple-text": AppSimpleText,
//         AppForm,
//         "image-and-text": AppImgPreview,
//         TheMainText,
//         AnkerList,
//         form1: RequestForm,
//     },
//     mixins: [accordionMixin],
//     data() {
//         return {
//             countryInfo: null,
//             tabsList: null,
//             constructorData: null,
//             widgetList: null,
//             ankerList: null,
//             currentH2Idx: 1,
//         };
//     },
//     methods: {
//         ...mapActions(["lockUi", "unlockUi"]),
//         setAnkerList(ankerList) {
//             this.ankerList = ankerList;
//         },
//     },
//     computed: {
//         ...mapGetters(["isUiLocked"]),
//         constructorFiltered() {
//             const temp = [];
//             this.constructorData.forEach((el) => {
//                 if (el.top != 1) {
//                     temp.push(el);
//                 }
//             });
//             return temp;
//         },
//         firstScreen() {
//             const temp = [];
//             this.constructorData.forEach((el) => {
//                 if (el.top == 1) {
//                     temp.push(el);
//                 }
//             });
//             return temp;
//         },
//     },
//     async created() {
//         this.lockUi();
//         const res = await this.axios.post("/api/info/get-by-slug", {
//             lang: this.currentLang,
//             slug: this.$route.params.infoPageSlug,
//         });
//         this.tabsList = res.data.data.tabs;
//         this.countryInfo = res.data.data.translate;
//         this.constructorData = res.data.data.constructor;
//         this.widgetList = res.data.data.widgets;
//         document.title =
//             res.data.data.translate.meta_title ||
//             res.data.data.translate.name ||
//             "Dream Travel";
//         setTimeout(() => {
//             this.initToggleSlideBtn(this.$refs.contentZone, false); // from mixin
//         }, 500);
//         this.unlockUi();
//     },
// };
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
