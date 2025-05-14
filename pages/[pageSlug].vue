<script setup>
import { computed } from "vue";
import { useNuxtApp } from "#app";
import constructorRender from "~/components/constructor/constructor-render.vue";
import theMainText from "~/components/common/the-main-text.vue";
import theSubscribeForm from "~/components/common/the-subscribe-form.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { $httpService } = useNuxtApp();
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = useGlobalStore();
import contactsMap from "~/components/common/contacts-map.vue";
const route = useRoute();
const { locale } = useI18n();

const {
    data: { data },
    status,
} = await $httpService.post("/api/page/get-by-slug", {
    lang: locale.value,
    slug: route.params.pageSlug,
});

if (data.meta) {
    useMetaHead(data.meta);
}

if (status !== 200) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true,
    });
}
const pageCheck = computed(() => {
    return route.fullPath.includes("contacts");
});
</script>
<template>
    <div
        :class="{
            textPage:
                route.params.pageSlug !== 'contacts' &&
                route.params.pageSlug !== 'licenzii',
        }"
    >
        <section :class="route.params.pageSlug" class="mb" ref="contentZone">
            <div class="textContainer">
                <theMainText
                    :title="data.translate.title"
                    :descr="data.translate.description"
                ></theMainText>
            </div>
            <app-seo-text
                v-if="route.params.pageSlug == 'licenzii'"
                :propsData="data.model.seo_text"
            ></app-seo-text>
            <div class="container">
                <constructorRender :constructor="data.constructor" />
                <template v-if="pageCheck">
                    <contactsMap
                        v-for="(item, idx) in globalSetting.offices"
                        :key="`${idx}_map`"
                        :propsData="item"
                    />
                </template>
            </div>
            <!-- <template v-if="route.path.includes('contacts')">
                <location-map
                    v-for="(item, idx) in globalSetting?.offices"
                    :key="`${idx}_map`"
                    :propsData="item"
                ></location-map>
            </template> -->
            <constructorRender :constructor="data.widget" />
        </section>
        <div class="container-full" v-if="!pageCheck">
            <theSubscribeForm />
        </div>
    </div>
</template>

<!-- <script>
export default {
    components: {
        "simple-text": appSimpleText,
        "image-and-text": AppTextAndImage,
        news: AppNews,
        blocks: AppBlock,
        TheMainText,
        "location-map": TheMap,
        quotes: AppQuote,
        form1: RequestForm,
        AppSubscribeForm,
        gallery: AppImgPreview,
        AppSeoText,
    },
    mixins: [accordionMixin],
    data() {
        return {
            textPageData: null,
            constructorList: null,
            widgetList: null,
        };
    },
    methods: {
        ...mapActions(["lockUi", "unlockUi"]),
    },
    computed: {
        ...mapGetters(["isUiLocked", "globalSetting"]),
        
        mapAppirience() {
            return (
                this.route.name == "TextPage" &&
                this.route.params.pageSlug == "contacts"
            );
        },
    },
    async created() {
        try {
            this.lockUi();
            const res = await this.axios.post("/api/page/get-by-slug", {
                lang: this.currentLang,
                slug: this.route.params.pageSlug,
            });
            this.textPageData = res.data.data;
            this.constructorList = res.data.data.constructor;
            this.widgetList = res.data.data.widgets;
            document.title =
                res.data.data.translate.meta_title ||
                res.data.data.translate.title ||
                "Dream Travel";
            this.unlockUi();
        } catch (err) {
            if (err.response.status == "404") {
                this.router.push({
                    name: "NotFound",
                    params: {
                        locale:
                            this.$i18n.locale == "en"
                                ? null
                                : this.$i18n.locale,
                    },
                });
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.initToggleSlideBtn(this.$refs.contentZone, false); // from mixin
        }, 600);
    },
};
</script> -->

<style lang="scss" scoped>
.uiElements {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;

    .date {
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        color: #777777;
    }

    ul {
        display: flex;

        li {
            &:first-of-type {
                margin-right: 20px !important;

                a {
                    width: 107px;
                }
            }

            &:not(:last-of-type) {
                margin-right: 10px;
            }

            a {
                border: 1px solid $c-btn;
                height: 41px;
                min-width: 41px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $c-btn;
            }
        }
    }
}

.contacts.mb {
    margin-bottom: 0px;
}

.mb {
    // margin-bottom: $section-offset;
    @media (max-width: 830px) {
        margin-bottom: 100px;
    }
}

.textContainer {
    @media (max-width: 576px) {
        padding-left: 25px;
        padding-right: 25px;
    }
}

.contacts {
    .specContainer {
        padding-bottom: 0px;
    }
}
</style>
