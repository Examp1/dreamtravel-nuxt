<script setup>
import { ref, computed } from "vue";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const modules = [Navigation];
const currentSlide = ref(0);
const navSwiperInstance = ref(null);
const mainSwiperInstance = ref(null);

const props = defineProps({
    roomInfo: [Object, Array],
});
const emit = defineEmits(["close"]);

const galleryData = computed(() => {
    return props.roomInfo.constructor.find((el) => el.component === "gallery");
});
const gelleryFiltered = computed(() => {
    const temp = [];
    for (let el in galleryData.value.content.list) {
        temp.push(galleryData.value.content.list[el]);
    }
    return temp.sort((a, b) => (a.sort > b.sort ? 1 : -1));
});

function mainSwiperInit(swiper) {
    mainSwiperInstance.value = swiper;
}
function navSwiperInit(swiper) {
    navSwiperInstance.value = swiper;
}
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

function close() {
    document.querySelector("html").style.overflow = "";
    emit("close");
}
</script>
<!-- <script>

export default {
   
    mounted() {
        this.$refs.navSlider.on("change", (idx) => {
            this.currentNavSlide = idx;
        });
        this.$refs.mainSlider.on("change", (idx) => {
            this.$refs.navSlider.select(idx);
        });

        const leftEl = document.querySelector(".roomInformation");
        // const leftWr = leftEl.querySelector(".text-wrapper");
        const rightEl = document.body;
        // const rightWr = rightEl.querySelector(".text-wrapper");

        leftEl.addEventListener("scroll", () => {
            //соотношение прокруток будет равно соотношению высот внутренних элементов
            //за вычетом высоты родителя
            //отсюда получаем формулу расчета прокрутки правого блока в зависимости от левого
            rightEl.scrollTop =
                (leftEl.scrollTop * rightEl.clientHeight) / leftEl.clientHeight;
        });
    },
};
</script> -->

<template>
    <div class="overflow" @click.self="close">
        <div class="w1">
            <span class="close" @click="close">&times;</span>
            <div class="roomInformation">
                <template v-if="gelleryFiltered">
                    <swiper
                        @swiper="mainSwiperInit"
                        :modules="modules"
                        :space-between="20"
                        :centered-slides="true"
                        :slides-per-view="1"
                        class="main-swiper"
                        @slide-change="onMainSlideChange"
                    >
                        <swiper-slide
                            :key="'main-' + idx"
                            v-for="(slide, idx) in gelleryFiltered"
                            class="slide"
                        >
                            <img
                                @load="loaded"
                                :src="getMediaPath(slide.image)"
                                :alt="getMediaPath(slide.image)"
                            />
                        </swiper-slide>
                    </swiper>
                </template>
                <div class="navSliderWrapper" v-if="gelleryFiltered">
                    <swiper
                        @swiper="navSwiperInit"
                        :modules="modules"
                        :space-between="10"
                        :slides-per-view="'auto'"
                        :centerInsufficientSlides="true"
                        class="nav-swiper previewNavSlider"
                    >
                        <swiper-slide
                            class="slide nav-slide"
                            v-for="(item, idx) in gelleryFiltered"
                            :key="idx"
                            :class="{ 'slide-active': currentSlide === idx }"
                            @click="goToSlide(idx)"
                        >
                            <img :src="getMediaPath(item.image)" alt="" />
                        </swiper-slide>
                    </swiper>
                    <button class="slider-btn prev-btn" @click="goPrev">
                        <i class="ic-arrow-drop"></i>
                    </button>
                    <button class="slider-btn next-btn" @click="goNext">
                        <i class="ic-arrow-drop"></i>
                    </button>
                </div>
                <p class="title">
                    {{ roomInfo.translate.name }}
                </p>
                <p class="desc">{{ roomInfo.translate.description }}</p>
                <ul class="roomOption">
                    <li
                        class="roomAttr"
                        v-for="(item, idx) in roomInfo.model.room_options"
                        :key="idx"
                    >
                        <div class="liTitle">
                            <i class="icon" :class="item.icon"></i>
                            {{ item.name }}
                        </div>
                        <ul class="optionList">
                            <li
                                v-for="(option, idx) in item.options"
                                :key="idx"
                            >
                                <p>
                                    {{ option.value }}
                                </p>
                                <span>{{ option.description }}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overflow {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.85);
    top: 0;
    left: 0;
    z-index: 10000;
    overflow: auto;
    width: 100%;
    height: 100%;
}

.w1 {
    width: 100%;
    max-width: 717px;
    position: relative;
    margin: 106px auto;

    @media (max-width: 576px) {
        margin: 45px 20px;
        width: calc(100% - 40px);

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 85px;
            z-index: 10;
            background: linear-gradient(
                0deg,
                $c-gray 25%,
                rgba($c-gray, 0) 100%
            );
        }
    }
}

.roomInformation {
    background-color: $c-gray;
    padding: 0 38px 96px;
    color: #fff;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    z-index: 5;

    @media (max-width: 576px) {
        padding: 0 21px 30px;

        .title {
            font-style: normal;
            font-weight: 500;
            font-size: 25px;
            line-height: 140%;
            margin-bottom: 15px;
        }

        .desc {
            font-weight: 300;
            font-size: 17px;
            line-height: 150%;
        }

        .roomOption {
            margin-top: 42px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            @media (max-width: 576px) {
                grid-template-columns: 1fr;

                li {
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 130%;

                    .liTitle {
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;

                        .icon {
                            margin-right: 14px;
                            font-size: 36px;
                            color: $c-btn;
                        }

                        .desc {
                            font-weight: 300;
                            font-size: 13px;
                            line-height: 130%;
                            color: #cacaca;
                        }
                    }
                }
            }
        }
    }
}

.navSliderWrapper {
    position: relative;

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
}

.roomAttr {
    margin-bottom: 60px;
}

.optionList {
    li {
        position: relative;
        padding-left: 15px;
        margin-bottom: 10px;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 13px;
            transform: translateY(-50%);
            width: 8px;
            height: 1px;
            background-color: $c-btn;
        }

        p {
            font-weight: 300;
            font-size: 17px;
            line-height: 150%;
            margin-bottom: 10px;

            span {
                font-weight: 300;
                font-size: 13px;
                line-height: 130%;
                color: #cacaca;
                display: block;
            }
        }
    }
}

.close {
    cursor: pointer;
    position: absolute;
    top: -50px;
    right: -50px;
    color: #cacaca;
    font-size: 60px;
    line-height: 30px;

    @media (max-width: 1024px) {
        top: -40px;
        right: 0;

        @media (max-width: 576px) {
            right: 0;
        }
    }
}
</style>

<style lang="scss" scoped>
.hiddenOpacity {
    opacity: 0;
}

.previewNavSlider {
    transition: 0.3s ease;
    margin-top: 15px;
    margin-bottom: 60px;
    outline: none;

    * {
        outline: none;

        img {
            object-fit: cover;
        }

        .slide {
            width: 69px;
            height: 41px;
            margin-right: 14px;
        }
    }
}

.previewMainSlider {
    transition: 0.3s ease;
    outline: none;

    * {
        outline: none;

        img {
            height: 370px;
            object-fit: cover;

            @media (max-width: 576px) {
                height: unset;
            }
        }

        .flickity-viewport {
            overflow: visible;
        }
    }
}
.nav-slide {
    opacity: 0.5;
    transition: opacity 0.3s;
    cursor: pointer;
    &.slide-active {
        opacity: 1;
    }
}
</style>
