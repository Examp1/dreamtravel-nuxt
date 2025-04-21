<script setup>
import { computed } from "vue";
const props = defineProps({
    propsData: [Array, Object],
});
const tourAttrs = computed(() => {
    if (props.propsData) {
        const result = [];
        const keys = [];
        props.propsData.tour_attributes.forEach((item) => {
            let found = false;
            keys.forEach((key) => {
                if (key == item.attr_slug) found = true;
            });
            if (!found) {
                keys.push(item.attr_slug);
                result.push(item);
            }
        });
        return result.slice(0, 4);
    } else return null;
});

</script>

<template>
    <!-- TODO :to="{
            name: 'TourInfo',
            params: {
                slug: propsData.slug,
                locale: $i18n.locale == 'en' ? null : $i18n.locale,
            },
        }" -->
    <NuxtLink :to="propsData" class="tourItem">
        <div class="l">
            <div class="imgWrp">
                <img :src="path(propsData.image)" alt="" />
            </div>
        </div>
        <div class="r">
            <p class="title">{{ propsData.name }}</p>
            <div class="infoText">
                <p class="country" v-for="(item, idx) in tourAttrs" :key="idx">
                    <i :class="item.attr_icon"></i>
                    {{ item.value }}
                </p>
            </div>
            <p class="desc">
                {{ propsData.description }}
            </p>
            <NuxtLink
                :to="{ name: 'TourInfo', params: { slug: propsData.slug } }"
                class="routeIcon"
                ><i class="icon ic-arrow"></i
            ></NuxtLink>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.tourItem {
    display: flex;
    justify-content: space-between;
    background-color: $c-gray;
    transition: 0.3s;
    max-height: 283px;

    @media (max-width: 576px) {
        max-height: unset;
        padding: 8px;
    }

    img {
        transition: 0.3s;
    }

    a {
        display: block;
        width: 100%;
        height: 100%;
    }

    .imgWrp {
        // max-height: 286px;
        height: 100%;
        overflow: hidden;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    &:hover {
        background-color: $c-black;

        img {
            transform: scale(1.2);
        }
    }

    @media (max-width: 1024px) {
        & + .tourItem {
            margin-top: 28px;
        }
    }

    @media (max-width: 576px) {
        flex-direction: column;

        .l,
        .r {
            width: 100% !important;
            max-width: unset !important;
            margin-right: 0 !important;
        }

        .r {
            padding: 8px;
        }
    }

    .l,
    .r {
        width: 50%;

        img {
            width: 100%;
        }
    }

    .l {
        max-width: 283px;
        margin-right: 20px;
    }

    .r {
        padding: 9px 20px 15px 0;
        position: relative;

        @media (max-width: 1024px) {
            width: calc(100% - 283px);
            padding: 20px 20px 20px 0;
        }

        .title {
            font-weight: 600;
            font-size: 16px;
            line-height: 130%;
            color: #ffffff;
            margin-bottom: 28px;
            min-height: 41px;

            @media (max-width: 1024px) {
                margin-bottom: 15px;
                min-height: unset;
            }

            @media (max-width: 576px) {
                margin-bottom: 39px;
            }
        }

        .infoText {
            font-weight: 300;
            font-size: 14px;
            line-height: 100%;
            color: $t-gray;

            @media (max-width: 1024px) {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                p {
                    margin-bottom: 0;

                    &:not(:last-of-type) {
                        margin-right: 25px;
                    }
                }

                @media (max-width: 576px) {
                    flex-direction: column;
                    align-items: flex-start;
                }
            }

            i {
                margin-right: 10px;
                font-size: 20px;
                width: 20px;
                display: inline-block;
            }

            p {
                display: flex;
                align-items: center;

                &:not(:last-of-type) {
                    margin-bottom: 11px;
                }
            }
        }

        .desc {
            font-weight: 300;
            font-size: 14px;
            line-height: 140%;
            color: #ffffff;
            margin-top: 23px;
            max-width: 217px;
            max-height: 6rem;
            overflow: hidden;
            display: block;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;

            @media (max-width: 1024px) {
                max-width: unset;
            }
        }
    }

    .routeIcon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 48px;
        height: 40px;
        background-color: $c-btn;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            color: #82ccdc;
        }

        @media (max-width: 576px) {
            position: relative;
            bottom: -26px;
            right: -26px;
            margin-left: auto;
        }
    }
}
</style>
