<script setup>
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();

const modules = [Navigation, Thumbs];

const props = defineProps({
    galleryData: {
        type: [Object, Array],
        required: true,
    },
});

const isLightboxOpen = ref(false);
const thumbsSwiper = ref(null);
const mainSwiper = ref(null);
const currentSlide = ref(0);

const galleryListSorted = computed(() => {
    if (!props.galleryData?.list) return [];
    return Object.values(props.galleryData.list)
        .map((item) => ({
            image: item.image,
            image_title: item.image_title,
            sort: item.sort,
        }))
        .sort((a, b) => +a.sort - +b.sort);
});

// const openLightbox = (idx) => {
//     isLightboxOpen.value = true;
//     // Здесь можно добавить логику для открытия конкретного слайда в лайтбоксе
// };

// const closeLightbox = () => {
//     isLightboxOpen.value = false;
// };

// const goToSlide = (idx) => {
//     if (mainSwiper.value) {
//         mainSwiper.value.swiper.slideTo(idx);
//     }
// };

// const slideNext = () => {
//     if (thumbsSwiper.value) {
//         thumbsSwiper.value.swiper.slideNext();
//     }
// };

// const slidePrev = () => {
//     if (thumbsSwiper.value) {
//         thumbsSwiper.value.swiper.slidePrev();
//     }
// };

// const onMainSlideChange = (swiper) => {
//     currentSlide.value = swiper.activeIndex;
//     if (thumbsSwiper.value) {
//         thumbsSwiper.value.swiper.slideTo(swiper.activeIndex);
//     }
// };

// const onThumbsSlideChange = (swiper) => {
//     currentSlide.value = swiper.activeIndex;
//     if (mainSwiper.value) {
//         mainSwiper.value.swiper.slideTo(swiper.activeIndex);
//     }
// };

// const onImageLoad = () => {
//     if (mainSwiper.value) {
//         mainSwiper.value.swiper.update();
//     }
// };
</script>

<template>
    <div class="swiper-wrapper">
        <div class="swiper-inner container">
            <!-- Main Slider -->
            <swiper
                ref="mainSwiper"
                :modules="modules"
                :space-between="20"
                :navigation="{
                    nextEl: '.main-next',
                    prevEl: '.main-prev',
                }"
                :thumbs="{ swiper: thumbsSwiper }"
                class="main-swiper"
                @slide-change="onMainSlideChange"
            >
                <swiper-slide
                    v-for="(slide, idx) in galleryListSorted"
                    :key="'main-' + idx"
                    @click="openLightbox(idx)"
                >
                    <img
                        @load="onImageLoad"
                        :src="getMediaPath(slide.image)"
                        :alt="slide.image_title || ''"
                        class="main-slide-img"
                    />
                </swiper-slide>
            </swiper>

            <!-- Thumbnail Slider -->
            <div class="nav-swiper-wrapper">
                <swiper
                    ref="thumbsSwiper"
                    :modules="modules"
                    :space-between="10"
                    :slides-per-view="'auto'"
                    :watch-slides-progress="true"
                    :centered-slides="true"
                    class="nav-swiper"
                    >
                    <!-- @slide-change="onThumbsSlideChange" -->
                <!-- @click="goToSlide(idx)" -->
                    <swiper-slide
                        v-for="(item, idx) in galleryListSorted"
                        :key="'thumb-' + idx"
                        class="thumb-slide"
                    >
                        <div class="img-wrapper">
                            <img :src="getMediaPath(item.image)" alt="" />
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- <button class="slider-btn prev-btn" @click="slidePrev">
                    <i class="ic-arrow-drop"></i>
                </button>
                <button class="slider-btn next-btn" @click="slideNext">
                    <i class="ic-arrow-drop"></i>
                </button> -->
            </div>
        </div>

        <!-- <app-carousell-lightbox
            v-if="isLightboxOpen"
            @close="closeLightbox"
        ></app-carousell-lightbox> -->
    </div>
</template>

<style lang="scss" scoped>
.swiper-wrapper {
    overflow-x: hidden;
}

.main-swiper {
    margin-bottom: 20px;

    .main-slide-img {
        width: 100%;
        height: auto;
        transition: 0.3s ease;
        cursor: pointer;
    }
}

.nav-swiper-wrapper {
    position: relative;

    @media (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
}

.nav-swiper {
    padding: 0 50px;

    .thumb-slide {
        width: auto;
        opacity: 0.5;
        transition: opacity 0.3s;
        cursor: pointer;

        &.swiper-slide-thumb-active {
            opacity: 1;
        }

        .img-wrapper {
            width: 100px;
            height: 60px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: 0.3s ease;
            }
        }
    }
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    z-index: 10;
    cursor: pointer;

    i {
        color: $c-btn;
        font-size: 27px;
    }

    &.prev-btn {
        left: 0;
        transform: translateY(-50%) rotate(180deg);

        @media (max-width: 768px) {
            left: -35px;
        }

        @media (max-width: 576px) {
            left: -25px;
        }
    }

    &.next-btn {
        right: 0;

        @media (max-width: 768px) {
            right: -35px;
        }

        @media (max-width: 576px) {
            right: -25px;
        }
    }
}
</style>
