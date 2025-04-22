<script setup>
import { computed } from "vue";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();
const route = useRoute();
defineProps({
    propsData: [Object, Array],
});
const basePath = computed(() => `/country/${route.params.countryName}/hotels`);
</script>

<template>
    <div class="hotelItem">
        <NuxtLink :to="`${basePath}/${propsData.slug}`">
            <!-- <NuxtLink :to="propsData.link"> -->
            <div class="imgWrp">
                <img :src="getMediaPath(propsData.image)" alt="" />
            </div>
            <div class="infoBlock">
                <div class="star">
                    {{ propsData.stars }}<i class="ic-star"></i>
                </div>
                <p class="title">{{ propsData.name || propsData.title }}</p>
            </div>
            <div class="infoText">
                <p class="like" v-if="propsData.recommend">
                    <i class="icon ic-like"></i>{{ $t("rec") }}
                </p>
                <p
                    class="description"
                    :class="{ noIcon: !propsData.recommend }"
                >
                    {{ propsData.description || propsData.excerpt }}
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<style lang="scss">
.hotelItem {
    .description {
        overflow: hidden;
        -webkit-line-clamp: 4;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        white-space: normal;
        height: 5rem;

        &.noIcon {
            -webkit-line-clamp: 6;
            height: 7rem;
            margin-top: 40px;
        }
    }
}
</style>

<style lang="scss" scoped>
.hotelItem {
    display: flex;
    flex-direction: column;
    background-color: $c-gray;
    color: #fff;
    transition: 0.3s;

    img {
        transition: 0.3s;
        width: 100%;
    }

    a {
        display: block;
        width: 100%;
        height: 100%;
    }

    .imgWrp {
        max-height: 186px;
        overflow: hidden;

        @media (max-width: 1024px) {
            max-height: 390px;
        }
    }

    &:hover {
        background-color: $c-black;

        img {
            transform: scale(1.2);
        }
    }

    .infoText,
    .infoBlock {
        padding: 0px 12px;
    }

    .infoBlock {
        display: flex;
        align-items: center;
        margin: 21px 0px 17px 0px;

        .star {
            font-weight: 600;
            font-size: 16px;
            line-height: 130%;
            color: #ffc107;
            margin-right: 20px;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                top: -5px;
                left: 35px;
                width: 1px;
                height: 35px;
                background-color: $t-gray;
            }
        }

        .title {
            font-weight: 600;
            font-size: 16px;
            line-height: 130%;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
            height: 2.5rem;
            overflow: hidden;
        }
    }

    .infoText {
        font-weight: 300;
        font-size: 14px;
        line-height: 100%;
        padding-bottom: 22px;

        i {
            margin-right: 10px;
            font-size: 20px;
            width: 20px;
            display: inline-block;
        }

        p {
            display: flex;
            align-items: center;
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 140%;
            color: #ffffff;
        }

        .like {
            font-style: normal;
            margin-top: 23px;
            margin-bottom: 23px;
            font-weight: 600;
            font-size: 14px;
            line-height: 100%;
            color: #82ccdc;
        }
    }
}
</style>
