<script setup>
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

const route = useRoute()
const modules = [Navigation];

defineProps({
    tabList: {
        type: [Array, Object],
        required: true,
        default: () => [],
    },
    // currentLangForLink: {
    //     type: String,
    //     required: true,
    // },
});
</script>

<template>
    <div class="tabs-container">
        <swiper
            :modules="modules"
            :slides-per-view="'auto'"
            :centered-slides="false"
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }"
            class="tabs-swiper"
        >
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <swiper-slide v-for="(item, idx) in tabList" :key="idx">
                <NuxtLink v-if="item.type === 'info'" :to="`${route.path}/${item.slug}`">{{
                    item.tab_name || item.name
                }}</NuxtLink>
                <NuxtLink v-else-if="item.type === 'country'" :to="`${route.path}`">{{
                    item.tab_name || item.name
                }}</NuxtLink>
                <NuxtLink v-else :to="`${route.path}/${item.type}`">{{
                    item.tab_name || item.name
                }}</NuxtLink>
               
            </swiper-slide>
        </swiper>
    </div>
</template>

<style lang="scss">
.tabs-container {
    margin-top: 45px;
    position: relative;
}

.swiper-button-prev,
.swiper-button-next {
    margin-top: 0 !important;
    top: 0 !important;
    padding: 0;
    background-color: #2a4651;
    transform: unset;
    border-radius: 0;
    width: 40px;
    height: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: $c-btn;
    box-shadow: 0 0 0 1px inset $c-btn;

    &::after {
        content: "";
        width: 15px;
        height: 12px;
        background: currentColor;
        mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z'/%3E%3C/svg%3E");
        mask-repeat: no-repeat;
        mask-position: center;
    }

    &.swiper-button-disabled {
        opacity: 0;
    }
}

.swiper-button-prev {
    left: 0;
}

.swiper-button-next {
    right: 0;
    &::after {
        transform: rotate(180deg);
    }
}
.tabs-swiper {
    padding: 0 40px; // Для кнопок навигации

    .swiper-slide {
        width: auto !important; // Для slides-per-view: 'auto'
    }

    a {
        padding: 12px 20px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 100%;
        color: $c-btn;
        box-shadow: 0 0 0 1px inset $c-btn;
        transition: 0.3s;
        display: inline-block;
        white-space: nowrap;

        &:hover {
            background-color: #2a4651;
            color: #fff;
        }

        &.router-link-exact-active,
        &.router-link-active,
        &.active {
            color: #17171d;
            font-weight: 600;
            background-color: #4aa7bc;
        }
    }
}
</style>
