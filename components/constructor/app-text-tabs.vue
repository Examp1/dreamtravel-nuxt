<script setup>
import { ref } from "vue"
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

const modules = [Navigation];
const props = defineProps({
    propsData: [Object, Array],
});

const currentIdx = ref(Object.keys(props.propsData.list)[0] || 1)

</script>

<template>
    <div class="contentWrapper">
        <h2>{{ propsData.title }}</h2>
        <swiper
            v-if="propsData"
            class="tabs2"
            :modules="modules"
            :slides-per-view="'auto'"
            :centered-slides="false"
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }"
        >
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <swiper-slide v-for="(item, key, idx) in propsData.list" :key="idx">
                <div
                    @click="currentIdx = key"
                    :class="{ active: key == currentIdx }"
                    class="item"
                >
                    {{ item.title }}
                </div>
            </swiper-slide>
        </swiper>
        <div v-html="propsData.list[currentIdx]?.text"></div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.tabs2) {
    margin-bottom: 20px;
    .swiper-slide{
        width: fit-content;
    }
}

.item {
    cursor: pointer;
    padding: 12px 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    color: $c-btn;
    box-shadow: 0 0 0px 1px inset $c-btn;

    &.router-link-exact-active.router-link-active,
    &.active {
        color: #17171d;
        font-weight: 600;
        background-color: #4aa7bc;
    }
}

.contentWrapper::v-deep {
    .table > td {
        text-align: unset;
    }
}
</style>
