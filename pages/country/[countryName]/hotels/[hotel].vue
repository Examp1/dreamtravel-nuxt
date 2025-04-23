<script setup>
import { useNuxtApp } from "#app";
import { computed } from "vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import appBreadcrumbs from "~/components/navigation/app-breadcrumbs.vue";
import theMainText from "~/components/common/the-main-text.vue";
import appMainCarousell from "~/components/country/app-main-carousell.vue";
import appAnkerList from "~/components/navigation/app-anker-list.vue";
import appSeeAlso from "~/components/constructor/app-see-also.vue";

const { $httpService } = useNuxtApp();
const { locale } = useI18n();
const route = useRoute();
const {
    data: { data },
    status,
} = await $httpService.post("/api/hotel/get-by-slug", {
    lang: locale.value,
    slug: route.params.hotel,
});

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

const attributeFiltered = computed(() => {
    let temp = [],
        keys = [];
    // data.model.hotel_attributes
    data.model.hotel_attributes.forEach((el) => {
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
</script>

<template>
    <div class="country">
        <div class="container textContainer">
            <appBreadcrumbs :breadcrumbs="data.breadcrumbs"></appBreadcrumbs>
            <theMainText
                :title="data.translate.name"
                :descr="data.translate.description"
            ></theMainText>
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
                        {{ $t("hotelText1") }}
                    </a>
                </li>
                <li @click="scrollReqForm">{{ $t("tourText2") }}</li>
            </ul>
        </div>
        <appMainCarousell
            v-if="filteredConstructor.gallery.content.list"
            :galleryData="filteredConstructor.gallery.content"
        ></appMainCarousell>
        <div class="container infoZone" v-if="filteredConstructor.otherBlocks">
            <appAnkerList :title="$t('countryAnkerListTitle')"></appAnkerList>
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

<style lang="scss" scoped>
h1,
h1 + .descr {
    margin-bottom: 17px;
}

.hotelListWrp {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    // @include sectionPadding;
    // @media (max-width: 830px) {
    //   padding: 100px 0px;
    // }
}

.hotelList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 28px;
    flex-wrap: wrap;
    margin-top: 77px;

    @media (max-width: 1024px) {
        justify-content: center;
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 830px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        flex-direction: column;
        grid-template-columns: repeat(1, 1fr);
        margin-top: 0px;
    }
}

.attrWrp {
    margin-top: 18px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;

    @media (max-width: 576px) {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        text-align: center;

        .attrItem {
            margin-left: 0px;
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
        cursor: pointer;
        font-size: 18px;
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

.btn i {
    font-size: 12px;
    margin-left: 12px;
}
</style>
