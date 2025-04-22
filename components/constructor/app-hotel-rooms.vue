<script setup>
import { ref, computed } from "vue";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

const modules = [Navigation];
const props = defineProps({
    propsData: [Object, Array],
});

const currentHotelIdx = ref(Object.keys(props.propsData.list)[0] || 1);

const currentRooms = computed(() => {
    const temp = this.propsData.list[this.currentHotelIdx];
    return temp;
});

// import Flickity from "vue-flickity";
// import hotelRoomItem from "./hotel-rooms-item.vue";
// export default {
//     components: { hotelRoomItem, Flickity },
//     props: {
//         propsData: {
//             type: [Array, Object],
//         },
//     },
//     data() {
//         return {
//             currentHotelIdx: 1,
//             flickityOptions: {
//                 // prevNextButtons: false,
//                 pageDots: false,
//                 contain: true,
//                 cellAlign: "left",
//                 groupCells: true,
//             },
//         };
//     },
//     computed: {
//         currentRooms() {
//             const temp = this.propsData.list[this.currentHotelIdx];
//             return temp;
//         },
//     },
// };
</script>

<template>
    <div class="contentWrapper">
        <!-- {{ propsData }} -->
        <h2>{{ propsData.title }}</h2>
        <swiper
            v-if="propsData"
            class="tabs3"
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
            <swiper-slide v-for="(item, idx) in propsData.list" :key="idx">
                <div
                    @click="currentHotelIdx = idx"
                    :class="{ active: currentHotelIdx == idx }"
                    class="item"
                >
                    {{ item.title }}
                </div>
            </swiper-slide>
        </swiper>
        <div class="hotelRoomWrapper">
            <hotel-room-item
                v-for="(item, idx) in currentRooms.items"
                :key="idx"
                :roomInfo="item"
            ></hotel-room-item>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tabs3 {
    margin-bottom: 40px;

    .item {
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
}

.hotelRoomWrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 28px;
    margin-bottom: 50px;

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}
</style>
