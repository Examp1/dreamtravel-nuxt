<!-- <script>
import { mapGetters, mapActions } from "vuex";
import appMainCarousell from "../components/common/app-MainCarousell.vue";
import AppTextTabs from "../components/common/app-text-tabs.vue";
import SimpleText from "../components/text-components/app-simple-text.vue";
import accordionMixin from "@/textAccordion";
import AppTourItem from "../components/common/app-tour-item.vue";
import TheMainText from "../components/common/the-main-text.vue";
import AnkerList from "../components/navigation/anker-list.vue";
import RequestForm from "../components/common/RequestForm.vue";
import AppBreadcrumbs from "../components/common/app-breadcrumbs.vue";
import AppNews from "../components/app-news.vue";
export default {
    components: {
        appMainCarousell,
        SimpleText,
        tabs: AppTextTabs,
        AppTourItem,
        TheMainText,
        AnkerList,
        form1: RequestForm,
        AppBreadcrumbs,
        news: AppNews,
    },
    mixins: [accordionMixin],
    data() {
        return {
            tourInfo: null,
            constructorData: null,
            widgetList: null,
            tourAttribute: null,
            alternateTour: null,
            ankerList: null,
            breadcrumbsList: null,
            currency: null,
        };
    },
    methods: {
        ...mapActions(["lockUi", "unlockUi"]),
        setAnkerList(ankerList) {
            this.ankerList = ankerList;
        },
        scrollReqForm() {
            const form = document.querySelector("#requestForm").offsetTop;
            window.scrollTo(0, form - 120);
        },
    },
    async created() {
        this.lockUi();
        const res = await this.axios.post("/api/tour/get-by-slug", {
            slug: this.$route.params.slug,
            lang: this.currentLang,
        });
        this.tourInfo = res.data.data.translate;
        this.currency = res.data.data.model.currency;
        this.tourAttribute = res.data.data.model.tour_attributes;
        this.constructorData = res.data.data.constructor;
        this.widgetList = res.data.data.widgets;
        this.alternateTour = res.data.data.alternative_tours;
        this.breadcrumbsList = res.data.data.breadcrumbs;
        document.title =
            res.data.data.translate.meta_title ||
            res.data.data.translate.name ||
            "Dream Travel";
        setTimeout(() => {
            this.initToggleSlideBtn(this.$refs.contentZone, false); // from mixin
        }, 500);
        this.unlockUi();
    },
    computed: {
        ...mapGetters(["isUiLocked"]),
        galleryData() {
            let temp = null;
            this.constructorData.forEach((item) => {
                if (item.component == "gallery") {
                    temp = item;
                }
            });
            return temp;
        },
        constructorData_m() {
            let temp = [];
            this.constructorData.forEach((item) => {
                if (item.component != "gallery") {
                    temp.push(item);
                }
            });
            return temp;
        },
        attributeFiltered() {
            let temp = [],
                keys = [];
            this.tourAttribute.forEach((el) => {
                let found = false;
                keys.forEach((key) => {
                    if (el.attribute_id == key) found = true;
                });
                if (!found) {
                    temp.push(el);
                    keys.push(el.attribute_id);
                }
            });
            return temp;
        },
    },
};
</script> -->

<script setup>
import theMainText from "~/components/common/the-main-text.vue";
import appMainCarousell from "~/components/country/app-main-carousell.vue";
import appAnkerList from "~/components/navigation/app-anker-list.vue";
import { computed } from "vue";
import ConstructorRender from "~/components/constructor/constructor-render.vue";
const { $httpService } = useNuxtApp();
const localePath = useLocalePath();
import { useMetaHead } from "~/composables/useMetaHead.js";
import AppTourItem from "~/components/tour/app-tour-item.vue";
const route = useRoute();
const { locale } = useI18n();
const ankerList = ref(null);
const { data, status } = await $httpService.post("/api/tour/get-by-slug", {
    lang: locale.value,
    slug: route.params.tour,
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

const galleryData = computed(() => {
    return (
        data.value?.constructor.value.find(
            (item) => item.component === "gallery",
        ) || null
    );
});

const constructorData_m = computed(() => {
    return data.value?.constructor.value.filter(
        (item) => item.component !== "gallery",
    );
});
const basePath = computed(() => `/country/${route.params.countryName}/tours`);

const attributeFiltered = computed(() => {
    let temp = [],
        keys = [];
    data.value?.model.tour_attributes.forEach((el) => {
        let found = false;
        keys.forEach((key) => {
            if (el.attribute_id == key) found = true;
        });
        if (!found) {
            temp.push(el);
            keys.push(el.attribute_id);
        }
    });
    return temp;
});

const scrollReqForm = () => {
    const form = document.querySelector("#requestForm").offsetTop;
    window.scrollTo(0, form - 120);
};
</script>

<template v-if="status === 'seucces'">
    <div class="country">
        <div class="container textContainer">
            <app-breadcrumbs :breadcrumbs="data.breadcrumbs"></app-breadcrumbs>
            <the-main-text
                class="smallmb"
                :title="data.translate.name"
                :descr="data.translate.description"
            ></the-main-text>
            <ul class="attrWrp">
                <li
                    class="attrItem"
                    v-for="(item, idx) in attributeFiltered"
                    :key="idx"
                >
                    <i class="icon" :class="item.attr_icon"></i>
                    {{ item.value }}
                </li>
            </ul>
            <ul class="btnWrp">
                <li>
                    <a :href="`${$route.path}/pdf`" target="_blank">
                        {{ $t("tourText1") }}
                    </a>
                </li>
                <li @click="scrollReqForm">{{ $t("tourText2") }}</li>
            </ul>
        </div>
        <app-main-carousell
            v-if="galleryData"
            :galleryData="galleryData.content"
        ></app-main-carousell>
        <div class="container infoZone">
            <appAnkerList :title="$t('tourAnkerListTitle')"></appAnkerList>
            <div class="contentZone" ref="contentZone">
                <ConstructorRender :constructor="constructorData_m" />
            </div>
        </div>
        <ConstructorRender :constructor="data.widget" />
        <section v-if="data.alternative_tours.length" class="tourListWrp">
            <div>
                <h2 class="sectionTitle bef">{{ $t("alternate") }}</h2>
                <div class="tourList container">
                    <AppTourItem
                        v-for="(tour, idx) in data.alternative_tours"
                        :key="idx"
                        :propsData="tour"
                    ></AppTourItem>
                </div>
                <nuxt-link :to="localePath(`${basePath}`)" class="btn btn-mb">
                    {{ $t("seeOtherTours") }}
                    <i class="icon ic-arrow"></i>
                </nuxt-link>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
h1,
h1 + .descr {
    margin-bottom: 17px;
}

.attrWrp {
    margin-top: 18px;
    margin-bottom: 30px;
    display: flex;

    @media (max-width: 576px) {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        text-align: center;

        .attrItem {
            margin-left: 0px;

            i {
                margin-left: 0px;
            }
        }
    }
}

.attrItem {
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    margin-left: 30px;

    i {
        margin-left: 11px;
        color: inherit;
    }
}

.attrWrp {
    display: flex;
}

.btnWrp {
    display: flex;
    justify-content: center;

    @media (max-width: 576px) {
        flex-direction: column;

        li {
            margin-left: 0px !important;
            margin-top: 10px;
            text-align: center !important;
        }
    }

    li {
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
        line-height: 120%;
        text-align: right;
        color: $c-btn;
        padding: 20px;
        border: 1px solid $c-btn;

        &:last-of-type {
            margin-left: 25px;
            color: #fff;
            background-color: $c-btn;
        }
    }
}

.tourListWrp {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    // @include sectionPadding;
    // @media (max-width: 830px) {
    //   padding: 100px 0px;
    // }
}

.tourList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 28px;
    margin-top: 77px;

    @media (max-width: 830px) {
        margin-top: 53px;
    }

    @media (max-width: 1024px) {
        display: block;
    }
}

.btn i {
    font-size: 12px;
    margin-left: 12px;
}

.btn-mb {
    margin-bottom: 70px;

    @media (max-width: 830px) {
        margin-bottom: 50px;
    }
}
</style>
