<script setup>
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();

const modules = [Navigation];

const props = defineProps({
    galleryData: {
        type: [Object, Array],
        required: true,
    },
});

const navSwiperInstance = ref(null);
const mainSwiperInstance = ref(null);
const currentSlide = ref(0);

function mainSwiperInit(swiper) {
    mainSwiperInstance.value = swiper;
}
function navSwiperInit(swiper) {
    navSwiperInstance.value = swiper;
}

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

function goNext() {
    mainSwiperInstance.value?.slideNext();
    navSwiperInstance.value?.slideNext();
}
function goPrev() {
    mainSwiperInstance.value?.slidePrev();
    navSwiperInstance.value?.slidePrev();
}

function goToSlide(index) {
    // index — нулевой-based номер слайда
    mainSwiperInstance.value?.slideTo(index);
    navSwiperInstance.value?.slideTo(index);
    currentSlide.value = index;
}

function onMainSlideChange(swiper) {
    // обновляем индекс
    currentSlide.value = swiper.activeIndex;
    navSwiperInstance.value?.slideTo(swiper.activeIndex);
}
</script>

<template>
    <!-- TODO внешний вид -->
    <div class="swiper-wrapper">
        <div class="swiper-inner container">
            <swiper
                @swiper="mainSwiperInit"
                :modules="modules"
                :space-between="20"
                :centered-slides="true"
                :slides-per-view="1.4"
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
            <div class="nav-swiper-wrapper">
                <swiper
                    @swiper="navSwiperInit"
                    :modules="modules"
                    :space-between="10"
                    :slides-per-view="'auto'"
                    class="nav-swiper"
                >
                    <swiper-slide
                        v-for="(item, idx) in galleryListSorted"
                        :key="'thumb-' + idx"
                        class="thumb-slide"
                        :class="{ 'slide-active': currentSlide === idx }"
                        @click="goToSlide(idx)"
                    >
                        <div class="img-wrapper">
                            <img :src="getMediaPath(item.image)" alt="" />
                        </div>
                    </swiper-slide>
                </swiper>

                <button class="slider-btn prev-btn" @click="goPrev">
                    <i class="ic-arrow-drop"></i>
                </button>
                <button class="slider-btn next-btn" @click="goNext">
                    <i class="ic-arrow-drop"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.swiper-wrapper {
    overflow-x: hidden;
}
:deep(.swiper-inner) {
    .main-swiper {
        overflow: visible;
    }
}

.main-swiper {
    margin-top: 45px;
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

:deep(.nav-swiper) {
    padding: 0 50px;
    .swiper-wrapper {
        gap: 10px;
        justify-content: center;
    }
    .thumb-slide {
        width: auto;
        opacity: 0.5;
        transition: opacity 0.3s;
        cursor: pointer;

        &.slide-active {
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
