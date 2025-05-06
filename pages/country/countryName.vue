<script setup>
import { useNuxtApp } from "#app";
import { computed } from "vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import appBreadcrumbs from "~/components/navigation/app-breadcrumbs.vue";
import theMainText from "~/components/common/the-main-text.vue";
import appTabs from "~/components/navigation/app-tabs.vue";
import appMainCarousell from "~/components/country/app-main-carousell.vue";
import appAnkerList from "~/components/navigation/app-anker-list.vue";
import appSeeAlso from "~/components/constructor/app-see-also.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { $httpService } = useNuxtApp();
const { locale } = useI18n();
const route = useRoute();
const {
    data: { data },
    status,
} = await $httpService.post("/api/country/get-by-slug", {
    lang: locale.value,
    slug: route.params.countryName,
});

if (data.meta) {
  useMetaHead(data.meta)
}

if (status !== 200) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true,
    });
}

const filteredConstructor = computed(() => {
    if (!data.constructor) return;
    const mapedConstrctor = {
        gallery: null,
        otherBlocks: [],
    };
    data.constructor.forEach((el) => {
        if (el.component === "gallery") {
            mapedConstrctor.gallery = el;
        } else {
            mapedConstrctor.otherBlocks.push(el);
        }
    });
    return mapedConstrctor;
});
</script>

<template>
    <div class="country">
        <div class="container textContainer">
            <appBreadcrumbs :breadcrumbs="data.breadcrumbs"></appBreadcrumbs>
            <theMainText
                :title="data.translate.name"
                :descr="data.translate.description"
            ></theMainText>
            <appTabs class="mt" :tabList="data.tabs"></appTabs>
        </div>
        <appMainCarousell
            v-if="filteredConstructor.gallery.content.list"
            :galleryData="filteredConstructor.gallery.content"
        ></appMainCarousell>
        <div class="container infoZone" v-if="filteredConstructor.otherBlocks">
            <appAnkerList
                :title="$t('countryAnkerListTitle')"
                @click="onAnkerClick"
            ></appAnkerList>
            <div class="contentZone" ref="contentZone">
                <constructorRender
                    :constructor="filteredConstructor.otherBlocks"
                    :widgets="data.widgets"
                />
            </div>
        </div>
        <appSeeAlso
            :morfTitle="data.translate.morf"
            :tabList="data.tabs"
        ></appSeeAlso>
    </div>
</template>

<!-- <script>
  import AppTabs from "../components/common/app-tabs.vue";
  //
  import AppCountryCalendar from "../components/country/app-country-calendar.vue";
  import AppSeeAlso from "../components/country/app-see-also.vue";
  import AppListing from "../components/text-components/app-listing.vue";
  import SimpleText from "../components/text-components/app-simple-text.vue";
  import { mapActions, mapGetters } from "vuex";
  import AppMainCarousell from "../components/common/app-MainCarousell.vue";
  
  import accordionMixin from "@/textAccordion";
  import TheMainText from "../components/common/the-main-text.vue";
  import AnkerList from "../components/navigation/anker-list.vue";
  import AppBreadcrumbs from "../components/common/app-breadcrumbs.vue";
  
  export default {
    // mixins: [accordionMixin],
    data() {
      return {
        countryInfo: null,
        constructorData: null,
        tabsList: null,
        widgetList: null,
        ankerList: null,
        breadcrumbsList: null
      };
    },
    methods: {
      ...mapActions(["lockUi", "unlockUi"]),
      setAnkerList(ankerList) {
        this.ankerList = ankerList;
      }
    },
    computed: {
      ...mapGetters(["isUiLocked"]),
      galleryData() {
        return this.constructorData[0];
      },
      constructorFiltered() {
        const temp = [];
        this.constructorData.forEach((el) => {
          if (el.top != 1) {
            temp.push(el);
          }
        });
        return temp;
      }
    },
    async created() {
      this.lockUi();
      const res = await this.axios.post("/api/country/get-by-slug", {
        slug: this.$route.params.countryName,
        lang: this.currentLang
      });
      this.tabsList = res.data.data.tabs;
      this.countryInfo = res.data.data.translate;
      this.constructorData = res.data.data.constructor;
      this.widgetList = res.data.data.widgets;
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
  };
  </script> -->

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
</style>
